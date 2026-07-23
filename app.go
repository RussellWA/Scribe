package main

import (
	"scribe/internal/model"
	"scribe/internal/service"
)

type App struct{}

func NewApp() *App {
	return &App{}
}

func (a *App) GetNormalization() (model.Dictionary, error) {
	return service.LoadNormalization()
}

func (a *App) SaveNormalization(dict model.Dictionary) error {
	return service.SaveNormalization(dict)
}

func (a *App) GetGlossary() (model.Dictionary, error) {
	return service.LoadGlossary()
}

func (a *App) SaveGlossary(dict model.Dictionary) error {
	return service.SaveGlossary(dict)
}
