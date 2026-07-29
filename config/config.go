package config

import (
	"embed"
	"fmt"
	"os"
	"path/filepath"
)

type Config struct {
	PromptFiles   []string `json:"promptFiles"`
	Normalization string   `json:"normalization"`
	Glossary      string   `json:"glossary"`
	Failure       string   `json:"failure"`
}

// Embed the default starting templates.
// Ensure your folder structure is config/defaults/glossary.json, etc.
//
//go:embed defaults/*
var defaultsFS embed.FS

const AppName = "Scribe"

// GetAppDataDir returns the safe, OS-approved folder for user data.
// Windows: C:\Users\Name\AppData\Roaming\Scribe
// macOS: ~/Library/Application Support/Scribe
// Linux: ~/.config/Scribe
func GetAppDataDir() (string, error) {
	configDir, err := os.UserConfigDir()
	if err != nil {
		return "", fmt.Errorf("could not find OS config directory: %w", err)
	}
	return filepath.Join(configDir, AppName), nil
}

// EnsureUserFilesExist checks if the user's files exist in AppData,
// and if not, creates them using the embedded defaults.
func EnsureUserFilesExist() error {
	appDataDir, err := GetAppDataDir()
	if err != nil {
		return err
	}

	// 1. Create the Scribe directory in AppData if it doesn't exist
	if err := os.MkdirAll(appDataDir, 0755); err != nil {
		return fmt.Errorf("failed to create AppData directory: %w", err)
	}

	// 2. Define the files we want to seed
	filesToSeed := []string{"glossary.json", "failure.json", "normalization.json"}

	for _, fileName := range filesToSeed {
		userFilePath := filepath.Join(appDataDir, fileName)

		// 3. If the file does NOT exist, create it from defaults
		if _, err := os.Stat(userFilePath); os.IsNotExist(err) {

			// Read the default from the compiled .exe memory
			defaultData, err := defaultsFS.ReadFile("defaults/" + fileName)
			if err != nil {
				return fmt.Errorf("failed to read default %s: %w", fileName, err)
			}

			// Write it safely to the AppData folder
			if err := os.WriteFile(userFilePath, defaultData, 0644); err != nil {
				return fmt.Errorf("failed to write user file %s: %w", fileName, err)
			}
		}
	}
	return nil
}

// GetUserFilePath is a helper you can call from anywhere in your app
// to get the absolute path to a specific user file.
func GetUserFilePath(fileName string) (string, error) {
	appDataDir, err := GetAppDataDir()
	if err != nil {
		return "", err
	}
	return filepath.Join(appDataDir, fileName), nil
}
