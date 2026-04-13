package main

import (
	"log"

	"github.com/kvolynsk/codexion-visualizer/server/internal/api"
)

func main() {
	router := api.NewRouter()

	log.Println("Starting server on :3000...")
	if err := router.Run(":3000"); err != nil {
		log.Fatalf("Failed to run server: %v", err)
	}
}
