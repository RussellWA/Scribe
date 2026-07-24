package files

import (
	"Scribe/config"
	"os"
	"path/filepath"
)

func ReadInput(cfg *config.Config, filename string) (string, error) {
	path := filepath.Join(cfg.InputDirectory, filename)

	bytes, err := os.ReadFile(path)
	if err != nil {
		return "", err
	}

	return string(bytes), nil
}

func SaveOutput(cfg *config.Config, filename string, content string) error {
	path := filepath.Join(cfg.OutputDirectory, filename)

	return os.WriteFile(path, []byte(content), 0644)
}
