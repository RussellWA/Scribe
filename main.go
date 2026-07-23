package main

import (
	"context"
	"fmt"
	"log"
	"os"
	"path/filepath"
	"scribe/config"
	"scribe/internal/files"
	"scribe/internal/parser"
	"scribe/internal/prompt"
	"scribe/internal/stats"
	"scribe/internal/validator"
	"time"

	"github.com/ollama/ollama/api"
)

func main() {
	app := NewApp()

	dict, err := app.GetNormalization()
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println(dict)

	if len(os.Args) < 2 {
		log.Fatal("Usage: go run . <input-file>")
	}

	fileName := os.Args[1]

	promptStart := time.Now()

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

	input, err := files.ReadInput(cfg, fileName)
	if err != nil {
		log.Fatal(err)
	}

	err = validator.ValidateInput(input)
	if err != nil {
		log.Fatal(err)
	}

	meeting, err := parser.Parse(input)
	if err != nil {
		log.Fatal(err)
	}

	structuredInput := parser.BuildStructuredInput(meeting)

	fullPrompt := prompt.BuildRequest(systemPrompt, structuredInput)

	promptElapsed := time.Since(promptStart)

	fmt.Println("Processing with AI... please wait.")

	client, err := api.ClientFromEnvironment()
	if err != nil {
		log.Fatal("Failed to connect to Ollama:", err)
	}

	aiStart := time.Now()

	stream := false

	// Comment this when deploying for mac
	keepAlive := &api.Duration{Duration: 0} // immediately unload the model

	options := map[string]interface{}{
		"temperature": 0.1,
	}

	// for model 8b
	think := api.ThinkValue{
		Value: false,
	}

	request := &api.GenerateRequest{
		Model: "qwen3:8b",
		// Model:     "qwen3:4b-instruct",
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

	aiElapsed := time.Since(aiStart)

	statistics := stats.Statistics{
		Model:       "qwen3:8b",
		Temperature: 0.2,
		InputLines:  stats.CountLines(input),
		OutputLines: stats.CountLines(finalOutput),
		// NormalizationCount:    normalizationCount,
		MeetingNotesCount:     len(meeting.MeetingNotes),
		NeedConfirmationCount: len(meeting.NeedConfirmation),
		OutstandingCount:      len(meeting.OutstandingActions),
		PromptTime:            promptElapsed,
		GenerationTime:        aiElapsed,
	}

	statistics.Print()

	outputPath := filepath.Join(cfg.OutputDirectory, fileName)

	err = os.WriteFile(outputPath, []byte(finalOutput), 0644)
	if err != nil {
		log.Fatal("Failed to save output file:", err)
	}

	fmt.Println("Generated prompt:")
	fmt.Println(fullPrompt)
}
