package api

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/kvolynsk/codexion-visualizer/server/pkg/config"
)

type API struct {
	cfg *config.Config
}

func NewRouter(cfg *config.Config) *gin.Engine {
	r := gin.Default()

	api := &API{cfg: cfg}

	// CORS configuration
	corsConfig := cors.DefaultConfig()
	corsConfig.AllowOrigins = []string{cfg.Server.ClientHost}
	corsConfig.AllowMethods = []string{"GET", "POST", "PUT", "OPTIONS"}
	corsConfig.AllowHeaders = []string{"Content-Type"}
	r.Use(cors.New(corsConfig))

	// WebSocket endpoint
	r.GET("/api/ws/simulate", api.HandleWS)

	return r
}
