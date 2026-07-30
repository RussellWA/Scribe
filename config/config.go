package config

import (
	"embed"
	"fmt"
	"os"
	"path/filepath"
)

type Config struct {
	PromptFiles []string `json:"promptFiles"`
}

//go:embed defaults/*
var defaultsFS embed.FS

const AppName = "Scribe"

func GetAppDataDir() (string, error) {
	configDir, err := os.UserConfigDir()
	if err != nil {
		return "", fmt.Errorf("could not find OS config directory: %w", err)
	}
	return filepath.Join(configDir, AppName), nil
}

func EnsureUserFilesExist() error {
	appDataDir, err := GetAppDataDir()
	if err != nil {
		return err
	}

	if err := os.MkdirAll(appDataDir, 0755); err != nil {
		return fmt.Errorf("failed to create AppData directory: %w", err)
	}

	filesToSeed := []string{"glossary.json", "failure.json", "normalization.json"}

	for _, fileName := range filesToSeed {
		userFilePath := filepath.Join(appDataDir, fileName)

		if _, err := os.Stat(userFilePath); os.IsNotExist(err) {
			defaultData, err := defaultsFS.ReadFile("defaults/" + fileName)
			if err != nil {
				return fmt.Errorf("failed to read default %s: %w", fileName, err)
			}

			if err := os.WriteFile(userFilePath, defaultData, 0644); err != nil {
				return fmt.Errorf("failed to write user file %s: %w", fileName, err)
			}
		}
	}
	return nil
}

func GetUserFilePath(fileName string) (string, error) {
	appDataDir, err := GetAppDataDir()
	if err != nil {
		return "", err
	}
	return filepath.Join(appDataDir, fileName), nil
}
