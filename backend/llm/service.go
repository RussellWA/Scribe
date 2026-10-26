package llm

import (
	"context"
	_ "embed"
	"fmt"
	"net/http"
	"net/url"
	"strings"
	"sync"

	"github.com/ollama/ollama/api"
)

//go:embed system_prompt.txt
var systemPrompt string

type LLMService struct {
	client *api.Client
	mu     sync.Mutex
}

func NewLLMService() (*LLMService, error) {
	u, err := url.Parse("http://127.0.0.1:11434")
	if err != nil {
		return nil, err
	}
	return &LLMService{client: api.NewClient(u, http.DefaultClient)}, nil
}

func (s *LLMService) generate(notes string) (string, error) {
	fmt.Println("start")

	ctx := context.Background()

	stream := false
	keepAlive := &api.Duration{Duration: 0}
	options := map[string]interface{}{
		"temperature": 0.1,
	}
	think := api.ThinkValue{
		Value: false,
	}

	req := &api.GenerateRequest{
		Model:     "qwen3:4b-instruct",
		System:    systemPrompt,
		Prompt:    "<catatan>\n" + notes + "\n</catatan>",
		Stream:    &stream,
		KeepAlive: keepAlive,
		Options:   options,
		Think:     &think,
	}

	fmt.Println("generate")
	var out string
	err := s.client.Generate(ctx, req, func(resp api.GenerateResponse) error {
		out += resp.Response
		return nil
	})
	if err != nil {
		return "", err
	}
	return strings.TrimSpace(out), nil
}

func (s *LLMService) Tidy(notes string) (string, error) {
	if !s.mu.TryLock() {
		return "", fmt.Errorf("Sedang memperoses, coba lagi sebentar")
	}
	defer s.mu.Unlock()

	notes = strings.TrimSpace(notes)
	if notes == "" {
		return "", fmt.Errorf("Catatan kosong")
	}

	var lastErr error
	for attempt := 0; attempt < 2; attempt++ {
		out, err := s.generate(notes)
		if err != nil {
			return "", err
		}
		if lastErr = validate(notes, out); lastErr == nil {
			return out, nil
		}
	}
	return "", fmt.Errorf("output tidak valid: %w", lastErr)
}

func validate(input, output string) error {
	inTitle := strings.TrimSpace(strings.SplitN(input, "\n", 2)[0])
	outTitle := strings.TrimSpace(strings.SplitN(output, "\n", 2)[0])
	if outTitle == "" || strings.EqualFold(inTitle, outTitle) == false {
		if !strings.Contains(strings.ToLower(output), strings.ToLower(inTitle[:min(len(inTitle), 10)])) {
			return fmt.Errorf("judul hilang atau berubah")
		}
	}
	for _, h := range []string{"Meeting Notes", "Need Confirmation", "Next Plan / Outstanding Action"} {
		if !strings.Contains(output, h) {
			return fmt.Errorf("section %q hilang", h)
		}
	}
	if strings.Contains(output, "**") || strings.Contains(output, "```") {
		return fmt.Errorf("output mengandung markdown")
	}
	return nil
}
