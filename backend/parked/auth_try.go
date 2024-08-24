package parked

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
)

var googleClientID = os.Getenv("GOOGLE_CLIENT_ID")
var googleClientSecret = os.Getenv("GOOGLE_CLIENT_SECRET")
var redirectURI = "http://localhost:3000/auth/callback"

type TokenResponse struct {
	AccessToken string `json:"access_token"`
	IDToken     string `json:"id_token"`
	ExpiresIn   int    `json:"expires_in"`
	TokenType   string `json:"token_type"`
}

func handleGoogleAuth(w http.ResponseWriter, r *http.Request) {
	var requestBody struct {
		Code string `json:"code"`
	}

	if err := json.NewDecoder(r.Body).Decode(&requestBody); err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}

	// Exchange the authorization code for a token
	tokenResponse, err := exchangeCodeForToken(requestBody.Code)
	if err != nil {
		http.Error(w, fmt.Sprintf("Failed to exchange code for token: %v", err), http.StatusInternalServerError)
		return
	}

	// Create a session or JWT (for simplicity, we'll just return the ID token as JWT)
	response := map[string]string{
		"token": tokenResponse.IDToken,
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func exchangeCodeForToken(code string) (*TokenResponse, error) {
	reqBody := fmt.Sprintf(
		"code=%s&client_id=%s&client_secret=%s&redirect_uri=%s&grant_type=authorization_code",
		code, googleClientID, googleClientSecret, redirectURI,
	)
	resp, err := http.Post(
		"https://oauth2.googleapis.com/token",
		"application/x-www-form-urlencoded",
		bytes.NewBuffer([]byte(reqBody)),
	)

	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	var tokenResponse TokenResponse
	if err := json.Unmarshal(body, &tokenResponse); err != nil {
		return nil, err
	}

	return &tokenResponse, nil
}

func main() {
	http.HandleFunc("/auth/google", handleGoogleAuth)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	fmt.Printf("Server is running on port %s\n", port)
	http.ListenAndServe(":"+port, nil)
}
