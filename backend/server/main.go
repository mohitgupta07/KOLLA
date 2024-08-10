package main

import (
	"context"
	"log"
	"net/http"
	"os"

	"github.com/dgrijalva/jwt-go"
	"github.com/gorilla/mux"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
)

var (
	jwtKey            = []byte("your_secret_key")
	googleOauthConfig = &oauth2.Config{
		RedirectURL:  "http://localhost:8080/callback",
		ClientID:     os.Getenv("GOOGLE_CLIENT_ID"),
		ClientSecret: os.Getenv("GOOGLE_CLIENT_SECRET"),
		Scopes:       []string{"profile", "email"},
		Endpoint:     google.Endpoint,
	}
	oauth2Token *oauth2.Token
)

type Claims struct {
	Email string `json:"email"`
	jwt.StandardClaims
}

func main() {
	router := mux.NewRouter()

	router.HandleFunc("/auth", handleAuth)
	router.HandleFunc("/callback", handleCallback)
	router.HandleFunc("/data", handleData).Methods("GET", "POST", "PUT")
	router.HandleFunc("/generate-pdf", handleGeneratePDF).Methods("POST")
	http.Handle("/", router)
	log.Println("Server started at :8080")
	http.ListenAndServe(":8080", router)
}

func handleAuth(w http.ResponseWriter, r *http.Request) {
	url := googleOauthConfig.AuthCodeURL("state-token", oauth2.AccessTypeOffline)
	http.Redirect(w, r, url, http.StatusTemporaryRedirect)
}

func handleCallback(w http.ResponseWriter, r *http.Request) {
	code := r.URL.Query().Get("code")
	token, err := googleOauthConfig.Exchange(context.Background(), code)
	if err != nil {
		log.Fatal(err)
	}
	oauth2Token = token
	http.Redirect(w, r, "/", http.StatusTemporaryRedirect)
}

// func handleGoogleLogin(w http.ResponseWriter, r *http.Request) {
// 	url := googleOauthConfig.AuthCodeURL("randomstate")
// 	http.Redirect(w, r, url, http.StatusTemporaryRedirect)
// }

// func handleGoogleCallback(w http.ResponseWriter, r *http.Request) {
// 	code := r.URL.Query().Get("code")
// 	token, err := googleOauthConfig.Exchange(context.Background(), code)
// 	if err != nil {
// 		http.Error(w, "Failed to exchange token", http.StatusInternalServerError)
// 		return
// 	}

// 	oauth2Service, err := oauth2.NewService(context.Background(), oauth2.TokenSource(token))
// 	if err != nil {
// 		http.Error(w, "Failed to create OAuth2 service", http.StatusInternalServerError)
// 		return
// 	}

// 	userInfo, err := oauth2Service.Userinfo.Get().Do()
// 	if err != nil {
// 		http.Error(w, "Failed to get user info", http.StatusInternalServerError)
// 		return
// 	}

// 	// Create JWT token
// 	expirationTime := time.Now().Add(24 * time.Hour)
// 	claims := &Claims{
// 		Email: userInfo.Email,
// 		StandardClaims: jwt.StandardClaims{
// 			ExpiresAt: expirationTime.Unix(),
// 		},
// 	}

// 	tokenString, err := jwt.NewWithClaims(jwt.SigningMethodHS256, claims).SignedString(jwtKey)
// 	if err != nil {
// 		http.Error(w, "Failed to create JWT", http.StatusInternalServerError)
// 		return
// 	}

// 	http.SetCookie(w, &http.Cookie{
// 		Name:    "token",
// 		Value:   tokenString,
// 		Expires: expirationTime,
// 	})

// 	http.Redirect(w, r, "/", http.StatusTemporaryRedirect)
// }

func handleData(w http.ResponseWriter, r *http.Request) {
	// Check JWT token
	cookie, err := r.Cookie("token")
	if err != nil {
		if err == http.ErrNoCookie {
			http.Error(w, "Unauthorized", http.StatusUnauthorized)
			return
		}
		http.Error(w, "Bad request", http.StatusBadRequest)
		return
	}

	tokenStr := cookie.Value
	claims := &Claims{}

	token, err := jwt.ParseWithClaims(tokenStr, claims, func(token *jwt.Token) (interface{}, error) {
		return jwtKey, nil
	})
	if err != nil {
		if err == jwt.ErrSignatureInvalid {
			http.Error(w, "Unauthorized", http.StatusUnauthorized)
			return
		}
		http.Error(w, "Bad request", http.StatusBadRequest)
		return
	}
	if !token.Valid {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	// Handle data operations
	// ...
}

func handleGeneratePDF(w http.ResponseWriter, r *http.Request) {
	// Check JWT token (similar to handleData)
	// Handle PDF generation
}
