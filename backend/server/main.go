package main

import (
	"context"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var client *mongo.Client

func main() {
	// MongoDB connection
	ctx := context.Background()
	clientOptions := options.Client().ApplyURI("mongodb://localhost:27017")
	client, err := mongo.Connect(ctx, clientOptions)
	if err != nil {
		log.Fatal(err)
	}

	// Router
	router := mux.NewRouter()

	// Routes
	router.HandleFunc("/login", handleGoogleLogin).Methods("POST")
	router.HandleFunc("/data", handleData).Methods("GET", "POST", "PUT")
	router.HandleFunc("/generate-pdf", handleGeneratePDF).Methods("POST")

	// Start server
	log.Println("Server started at :8080")
	http.ListenAndServe(":8080", router)
}

func handleGoogleLogin(w http.ResponseWriter, r *http.Request) {
	// Handle Google OAuth login
}

func handleData(w http.ResponseWriter, r *http.Request) {
	// Handle data insertion/upsertion and retrieval
}

func handleGeneratePDF(w http.ResponseWriter, r *http.Request) {
	// Handle PDF generation
}
