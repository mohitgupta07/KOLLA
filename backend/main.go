package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"time"

	"github.com/dgrijalva/jwt-go"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
)

var googleOauthConfig = &oauth2.Config{
	ClientID:     os.Getenv("GOOGLE_CLIENT_ID"),
	ClientSecret: os.Getenv("GOOGLE_CLIENT_SECRET"),
	RedirectURL:  "http://localhost:8080/auth/google/callback",
	Scopes: []string{
		"https://www.googleapis.com/auth/userinfo.email",
		"https://www.googleapis.com/auth/userinfo.profile",
	},
	Endpoint: google.Endpoint,
}

var jwtKey = []byte("your-secret-key")

type GoogleUserInfo struct {
	ID            string `json:"id"`
	Email         string `json:"email"`
	VerifiedEmail bool   `json:"verified_email"`
	Name          string `json:"name"`
	GivenName     string `json:"given_name"`
	FamilyName    string `json:"family_name"`
	Picture       string `json:"picture"`
	Locale        string `json:"locale"`
}

func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
	(*w).Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	(*w).Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
}

func corsMiddleware(handler http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Set headers
		w.Header().Set("Access-Control-Allow-Origin", r.Header.Get("Origin"))
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
		w.Header().Set("Access-Control-Allow-Credentials", "true")

		// If it's a preflight request, respond with 200
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		// Pass the request to the next middleware in chain
		handler.ServeHTTP(w, r)
	})
}
func main() {
	mux := http.NewServeMux()
	// enable CORS

	fmt.Println("Starting server...")
	fmt.Println("Google Client ID: ", googleOauthConfig.ClientID)
	mux.HandleFunc("/auth/google/login", handleGoogleLogin)
	mux.HandleFunc("/auth/google/callback", handleGoogleCallback)
	mux.HandleFunc("/dashboard", protectedEndpoint)
	mux.HandleFunc("/user", getUser)
	mux.HandleFunc("/logout", logout)

	fmt.Println("Server started at http://localhost:8080")
	handler := corsMiddleware(mux)
	http.ListenAndServe(":8080", handler)
}

func handleGoogleLogin(w http.ResponseWriter, r *http.Request) {
	// Redirect user to Google's consent page
	url := googleOauthConfig.AuthCodeURL("state-token", oauth2.AccessTypeOffline)
	http.Redirect(w, r, url, http.StatusTemporaryRedirect)
}

func handleGoogleCallback(w http.ResponseWriter, r *http.Request) {
	// Get the authorization code from the query parameters
	code := r.URL.Query().Get("code")

	// Exchange the authorization code for an access token
	token, err := googleOauthConfig.Exchange(oauth2.NoContext, code)
	if err != nil {
		http.Error(w, "Failed to exchange token: "+err.Error(), http.StatusInternalServerError)
		return
	}

	// Retrieve user information from Google
	userInfo, err := getUserInfo(token)
	if err != nil {
		http.Error(w, "Failed to get user info: "+err.Error(), http.StatusInternalServerError)
		return
	}

	// Generate JWT
	jwtToken, err := createJWT(userInfo.ID)
	if err != nil {
		http.Error(w, "Failed to create JWT: "+err.Error(), http.StatusInternalServerError)
		return
	}

	// Set JWT as an HTTP-only cookie
	http.SetCookie(w, &http.Cookie{
		Name:     "auth_token",
		Value:    jwtToken,
		Expires:  time.Now().Add(24 * time.Hour),
		HttpOnly: true,
		Secure:   false, // Set to true in production to ensure it's sent over HTTPS
		Path:     "/",
	})

	// Redirect back to the frontend
	http.Redirect(w, r, "http://localhost:3000/auth/callback", http.StatusSeeOther)
}

func getUserInfo(token *oauth2.Token) (*GoogleUserInfo, error) {
	// Google API endpoint to get user info
	response, err := http.Get("https://www.googleapis.com/oauth2/v2/userinfo?access_token=" + token.AccessToken)
	if err != nil {
		return nil, err
	}
	defer response.Body.Close()

	userInfo := &GoogleUserInfo{}
	err = json.NewDecoder(response.Body).Decode(userInfo)
	if err != nil {
		return nil, err
	}

	return userInfo, nil
}

func createJWT(userID string) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"user_id": userID,
		"exp":     time.Now().Add(time.Hour * 24).Unix(),
	})

	tokenString, err := token.SignedString(jwtKey)
	if err != nil {
		return "", err
	}

	return tokenString, nil
}

func protectedEndpoint(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Protected endpoint hit")
	// Get JWT from cookie
	cookie, err := r.Cookie("auth_token")
	if err != nil {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	// Verify JWT
	token, err := verifyJWT(cookie.Value)
	if err != nil || !token.Valid {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	// Respond with protected content
	w.Write([]byte("Welcome to your dashboard!"))
}

func verifyJWT(tokenString string) (*jwt.Token, error) {
	return jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
		}
		return jwtKey, nil
	})
}

func logout(w http.ResponseWriter, r *http.Request) {
	http.SetCookie(w, &http.Cookie{
		Name:     "auth_token",
		Value:    "",
		Expires:  time.Now().Add(-1 * time.Hour),
		HttpOnly: true,
		Secure:   false, // Set to true in production
		Path:     "/",
	})
	w.WriteHeader(http.StatusOK)
}

////////////////////////////////////////
// user endpoint authentication
////////////////////////////////////////

func getUser(w http.ResponseWriter, r *http.Request) {
	// Enable CORS
	// enableCors(&w)
	// Get JWT from cookie
	cookie, err := r.Cookie("auth_token")
	if err != nil {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	// Verify JWT
	token, err := verifyJWT(cookie.Value)
	if err != nil || !token.Valid {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	userID := claims["user_id"].(string)
	fmt.Println("User ID:", userID)

	// Retrieve user information from your database using the userID
	// For this example, let's assume you have a function getUserInfoFromDB that takes a userID and returns a User struct
	user, err := getUserInfoFromDB(userID)
	if err != nil {
		http.Error(w, "Failed to get user info: "+err.Error(), http.StatusInternalServerError)
		return
	}

	// Respond with user information
	json.NewEncoder(w).Encode(user)
	// update http response with 200 status code if encoding is successful
	w.WriteHeader(http.StatusOK)
}

func getUserInfoFromDB(userID string) (*User, error) {
	// This is a placeholder function that simulates fetching user information from a database
	// In a real application, you would query your database to retrieve the user information
	// For this example, we'll just return a hardcoded user
	return &User{
		ID:    userID,
		Name:  "John Doe",
		Email: "",
	}, nil
}

type User struct {
	ID    string `json:"id"`
	Name  string `json:"name"`
	Email string `json:"email"`
}
