package config

import (
	"embed"
	"encoding/json"
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
