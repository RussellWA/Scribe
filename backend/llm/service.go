package llm

import (
	"context"
	"fmt"
	"net/http"
	"net/url"

	"github.com/ollama/ollama/api"
)

type LLMService struct{}

func NewLLMService() *LLMService {
	return &LLMService{}
}

func (s *LLMService) CallLLM() {
	fmt.Println("start")
	ollamaURL, err := url.Parse("http://127.0.0.1:11434")
	if err != nil {
		fmt.Println(err)
	}
	client := api.NewClient(ollamaURL, http.DefaultClient)

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
		Prompt:    "What are the 6 continents?",
		Stream:    &stream,
		KeepAlive: keepAlive,
		Options:   options,
		Think:     &think,
	}

	fmt.Println("generate")

	err = client.Generate(ctx, req, func(resp api.GenerateResponse) error {
		fmt.Println(resp.Response)
		if resp.Done {
			fmt.Println("\n[Generation complete]")
		}
		return nil
	})
	if err != nil {
		panic(err)
	}
}
