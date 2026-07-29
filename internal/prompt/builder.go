package prompt

import (
	"Scribe/config"
	"embed"
	"encoding/json"
	"fmt"
	"strings"
)

//go:embed assets data
var embeddedFS embed.FS

type Glossary map[string]string
type Normalization map[string]string

func BuildSystemPrompt(cfg *config.Config) (string, error) {
	var builder strings.Builder

	// 1. Prompt files
	for _, file := range cfg.PromptFiles {
		// Read directly from embeddedFS
		content, err := embeddedFS.ReadFile(file)
		if err != nil {
			return "", fmt.Errorf("failed to read embedded prompt file %s: %w", file, err)
		}

		builder.WriteString(strings.TrimSpace(string(content)))
		builder.WriteString("\n\n")
	}

	// 2. Writing Dictionary
	if err := appendDictionary(
		&builder,
		"Writing Dictionary",
		cfg.Glossary,
		cfg.Normalization,
	); err != nil {
		return "", err
	}

	// 3. Known Failures
	if err := appendDictionary(
		&builder,
		"Known Failures",
		cfg.Failure,
	); err != nil {
		return "", err
	}

	builder.WriteString("Sekarang, format catatan mentah berikut:")
	return builder.String(), nil
}

func appendDictionary(builder *strings.Builder, title string, files ...string) error {
	// Count valid non-empty files
	var validFiles []string
	for _, f := range files {
		if strings.TrimSpace(f) != "" {
			validFiles = append(validFiles, f)
		}
	}

	if len(validFiles) == 0 {
		return nil
	}

	builder.WriteString("# ")
	builder.WriteString(title)
	builder.WriteString("\n\n")
	builder.WriteString("Gunakan daftar berikut sebagai referensi penulisan apabila maknanya jelas dari konteks.\n\n")

	for _, path := range validFiles {
		raw, err := embeddedFS.ReadFile(path)
		if err != nil {
			return fmt.Errorf("failed to read embedded dictionary %s: %w", path, err)
		}

		var dict map[string]string
		if err := json.Unmarshal(raw, &dict); err != nil {
			return fmt.Errorf("failed to unmarshal JSON from %s: %w", path, err)
		}

		for from, to := range dict {
			builder.WriteString(fmt.Sprintf("- %s → %s\n", from, to))
		}
	}

	builder.WriteString("\n")
	return nil
}
