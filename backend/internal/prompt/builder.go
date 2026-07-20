package prompt

import (
	"encoding/json"
	"fmt"
	"os"
	"scribe/config"
	"strings"
)

type Glossary map[string]string
type Normalization map[string]string

func readFile(path string) (string, error) {
	b, err := os.ReadFile(path)
	if err != nil {
		return "", err
	}

	return strings.TrimSpace(string(b)), nil
}

func BuildSystemPrompt(cfg *config.Config) (string, error) {
	var builder strings.Builder

	// Prompt files
	for _, file := range cfg.PromptFiles {
		content, err := readFile(file)
		if err != nil {
			return "", err
		}

		builder.WriteString(content)
		builder.WriteString("\n\n")
	}

	// Writing Dictionary
	if err := appendDictionary(
		&builder,
		"Writing Dictionary",
		cfg.Glossary,
		cfg.Normalization,
	); err != nil {
		return "", err
	}

	return builder.String(), nil
}

func appendDictionary(builder *strings.Builder, title string, files ...string) error {

	builder.WriteString("# ")
	builder.WriteString(title)
	builder.WriteString("\n\n")
	builder.WriteString("Gunakan daftar berikut sebagai referensi penulisan apabila maknanya jelas dari konteks.\n\n")

	for _, path := range files {

		raw, err := os.ReadFile(path)
		if err != nil {
			return err
		}

		var dict map[string]string

		if err := json.Unmarshal(raw, &dict); err != nil {
			return err
		}

		for from, to := range dict {
			builder.WriteString(fmt.Sprintf("- %s → %s\n", from, to))
		}
	}

	builder.WriteString("\n")
	return nil
}
