package config

type Config struct {
	Model           string   `json:"model"`
	PromptFiles     []string `json:"promptFiles"`
	Normalization   string   `json:"normalization"`
	Glossary        string   `json:"glossary"`
	Failure         string   `json:"failure"`
	GeneratedPrompt string   `json:"generatedPrompt"`
	InputDirectory  string   `json:"inputDirectory"`
	OutputDirectory string   `json:"outputDirectory"`
}
