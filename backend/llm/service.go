package llm

import (
	"context"
	_ "embed"
	"encoding/json"
	"fmt"
	"strings"

	"github.com/ollama/ollama/api"
)

//go:embed system_prompt.txt
var systemPrompt string

type LLMService struct{}

func (s *LLMService) Generate(notes string) (string, error) {
	fmt.Println("start")

	ctx := context.Background()

	client, err := api.ClientFromEnvironment()
	if err != nil {
		return "", fmt.Errorf("failed to initialize ollama client: %w", err)
	}

	stream := false
	keepAlive := &api.Duration{Duration: 0}
	options := map[string]interface{}{
		"temperature": 0.1,
	}

	req := &api.GenerateRequest{
		Model:  "qwen3:8b",
		System: systemPrompt,
		Prompt: "Input:\n" + notes,
		Format: json.RawMessage(`{
        "type": "object",
        "properties": {
            "title": {"type": "string"},
            "meeting_notes": {"type": "array", "items": {"type": "string"}},
            "need_confirmation": {"type": "array", "items": {"type": "string"}},
            "next_plan": {"type": "array", "items": {"type": "string"}}
        },
        "required": ["title", "meeting_notes", "need_confirmation", "next_plan"]
    }`),
		Options:   options,
		Stream:    &stream,
		KeepAlive: keepAlive,
	}

	fmt.Println("generate")
	var out string
	err = client.Generate(ctx, req, func(resp api.GenerateResponse) error {
		out += resp.Response
		return nil
	})
	if err != nil {
		return "", err
	}
	return strings.TrimSpace(out), nil
}
