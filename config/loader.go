package config

import (
	"embed"
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
)

//go:embed config.json
var configFS embed.FS

func LoadConfig() (*Config, error) {
	data, err := configFS.ReadFile("config.json")
	if err != nil {
		return nil, err
	}

	var cfg Config

	if err := json.Unmarshal(data, &cfg); err != nil {
		return nil, err
	}

	return &cfg, nil
}

//go:embed defaults/*
var defaultsFS embed.FS

// Call this function when your app starts up
func EnsureUserFilesExist() error {
	exePath, err := os.Executable()
	if err != nil {
		return err
	}
	exeDir := filepath.Dir(exePath)
	dataDir := filepath.Join(exeDir, "data")

	if err := os.MkdirAll(dataDir, 0755); err != nil {
		return err
	}

	filesToSeed := []string{"glossary.json", "failure.json", "normalization.json"}

	for _, fileName := range filesToSeed {
		userFilePath := filepath.Join(dataDir, fileName)

		if _, err := os.Stat(userFilePath); os.IsNotExist(err) {

			defaultData, err := defaultsFS.ReadFile("defaults/" + fileName)
			if err != nil {
				return fmt.Errorf("failed to read default %s: %w", fileName, err)
			}

			// 4. Write it to the user's hard drive so they can edit it
			err = os.WriteFile(userFilePath, defaultData, 0644)
			if err != nil {
				return fmt.Errorf("failed to write user file %s: %w", fileName, err)
			}
		}
	}
	return nil
}
