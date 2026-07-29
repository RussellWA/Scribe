package service

import (
	"Scribe/config"
	"Scribe/internal/parser"
	"Scribe/internal/prompt"
	"Scribe/internal/types"
	"Scribe/internal/validator"
	"context"
	"fmt"
	"net/http"
	"net/url"
	"os"
	"time"

	"github.com/ollama/ollama/api"
)

func Generate(
	req types.GenerateRequest,
) (
	types.GenerateResponse,
	error,
) {
	if req.Title == "" {
		return types.GenerateResponse{}, fmt.Errorf("Meeting title is missing")
	}

	if req.Notes == "" {
		return types.GenerateResponse{}, fmt.Errorf("Meeting notes areas missing")
	}

	cfg, err := config.LoadConfig("config/config.json")
	if err != nil {
		panic(err)
	}

	fmt.Println("Building System Prompt... please wait.")

	systemPrompt, err := prompt.BuildSystemPrompt(cfg)
	if err != nil {
		panic(err)
	}

	err = os.WriteFile(
		"generated/system_prompt.md",
		[]byte(systemPrompt),
		0644,
	)

	if err != nil {
		panic(err)
	}

	fmt.Println("Validating Input... please wait.")

	input := req.Notes

	err = validator.ValidateInput(input)
	if err != nil {
		return types.GenerateResponse{}, err
	}

	meeting, err := parser.Parse(input, req.Title)
	if err != nil {
		return types.GenerateResponse{}, err
	}

	structuredInput := parser.BuildStructuredInput(meeting)

	fullPrompt := prompt.BuildRequest(systemPrompt, structuredInput)

	fmt.Println("Processing with AI... please wait.")

	// Explicitly define the local URL
	ollamaURL, err := url.Parse("http://127.0.0.1:11434")
	if err != nil {
		return types.GenerateResponse{}, err
	}

	// Create a client that points directly to localhost, ignoring OS environments
	client := api.NewClient(ollamaURL, http.DefaultClient)
	if err != nil {
		return types.GenerateResponse{}, fmt.Errorf("failed to connect to Ollama: %w", err)
	}

	start := time.Now()

	stream := false

	keepAlive := &api.Duration{Duration: 0}

	options := map[string]interface{}{
		"temperature": 0.1,
	}

	think := api.ThinkValue{
		Value: false,
	}

	request := &api.GenerateRequest{
		Model:     "qwen3:8b",
		Prompt:    fullPrompt,
		Stream:    &stream,
		KeepAlive: keepAlive,
		Think:     &think,
		Options:   options,
	}

	var finalOutput string
	ctx := context.Background()

	err = client.Generate(ctx, request, func(resp api.GenerateResponse) error {
		// Because stream is false, this triggers once with the complete output
		finalOutput = resp.Response
		return nil
	})

	elapsed := time.Since(start)

	fmt.Println(structuredInput)

	return types.GenerateResponse{
		Output:    finalOutput,
		ElapsedMs: elapsed.Milliseconds(),
	}, nil
}
