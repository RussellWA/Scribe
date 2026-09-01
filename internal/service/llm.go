package service

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"
)

type OllamaService struct{}

func NewOllamaService() *OllamaService {
	return &OllamaService{}
}

type OllamaTagsResponse struct {
	Models []struct {
		Name string `json:"name"`
	} `json:"models"`
}

func (s *OllamaService) FetchInstalledModels() ([]string, error) {
	client := http.Client{
		Timeout: 2 * time.Second,
	}

	resp, err := client.Get("http://127.0.0.1:11434/api/tags")
	if err != nil {
		return nil, fmt.Errorf("could not connect to Ollama: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("ollama returned status: %d", resp.StatusCode)
	}

	var tagsResp OllamaTagsResponse
	if err := json.NewDecoder(resp.Body).Decode(&tagsResp); err != nil {
		return nil, fmt.Errorf("failed to decode response: %w", err)
	}

	var modelNames []string
	for _, m := range tagsResp.Models {
		modelNames = append(modelNames, m.Name)
	}

	return modelNames, nil
}
