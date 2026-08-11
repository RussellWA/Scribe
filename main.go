package main

import (
	"Scribe/config"
	"Scribe/internal/service"
	"embed"
	"log"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
)

//go:embed all:frontend/dist
var assets embed.FS

func main() {
	if err := config.EnsureUserFilesExist(); err != nil {
		log.Fatal("Failed to initialize user data: ", err)
	}

	// Create an instance of the app structure
	app := NewApp()
	ollamaSvc := service.NewOllamaService()

	// Create application with options
	err := wails.Run(&options.App{
		Title:            "Scribe",
		Width:            1024,
		Height:           768,
		WindowStartState: options.Maximised,
		AssetServer: &assetserver.Options{
			Assets: assets,
		},
		BackgroundColour: &options.RGBA{R: 27, G: 38, B: 54, A: 1},
		OnStartup:        app.startup,
		Bind: []interface{}{
			app,
			ollamaSvc,
		},
	})

	if err != nil {
		println("Error:", err.Error())
	}
}
