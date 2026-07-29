package config

type Config struct {
	PromptFiles   []string `json:"promptFiles"`
	Normalization string   `json:"normalization"`
	Glossary      string   `json:"glossary"`
	Failure       string   `json:"failure"`
}
