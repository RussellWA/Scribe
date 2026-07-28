package main

import (
	"Scribe/config"
	"Scribe/internal/service"
	"Scribe/internal/types"
	"context"
	"fmt"
)

// App struct
type App struct {
	ctx    context.Context
	Config config.Config
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

func (a *App) Generate(req types.GenerateRequest) (types.GenerateResponse, error) {
	return service.Generate(req)
}

func (a *App) GetGlossary() (map[string]string, error) {
	return service.LoadGlossary()
}

func (a *App) SaveGlossary(dict map[string]string) error {
	return service.SaveGlossary(dict)
}

func (a *App) GetNormalization() (map[string]string, error) {
	return service.LoadNormalization()
}

func (a *App) SaveNormalization(dict map[string]string) error {
	return service.SaveNormalization(dict)
}
