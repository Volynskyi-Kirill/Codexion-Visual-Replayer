package main

import (
	"fmt"
	"log"

	"github.com/kvolynsk/codexion-visualizer/server/internal/api"
	"github.com/kvolynsk/codexion-visualizer/server/pkg/config"
)

func main() {
	cfg := config.Load()
	router := api.NewRouter(cfg)

	addr := fmt.Sprintf(":%s", cfg.Server.Port)
	log.Printf("Starting server on %s...", addr)
	if err := router.Run(addr); err != nil {
		log.Fatalf("Failed to run server: %v", err)
	}
}
