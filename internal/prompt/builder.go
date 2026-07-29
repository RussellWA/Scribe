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

	for _, file := range cfg.PromptFiles {
		content, err := embeddedFS.ReadFile(file)
		if err != nil {
			return "", fmt.Errorf("failed to read embedded prompt file %s: %w", file, err)
		}

		builder.WriteString(strings.TrimSpace(string(content)))
		builder.WriteString("\n\n")
	}

	if err := appendDictionary(
		&builder,
		"Writing Dictionary",
		cfg.Glossary,
		cfg.Normalization,
	); err != nil {
		return "", err
	}

	if err := appendFailures(
		&builder,
		"Known Failures",
		cfg.Failure..., // Expand slice if cfg.Failure is []string
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

type FailureEntry struct {
	Wrong string `json:"wrong"`
	Right string `json:"right"`
}

func appendFailures(builder *strings.Builder, title string, files ...string) error {
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
	builder.WriteString("Hindari kesalahan penulisan berikut dan gunakan bentuk perbaikannya:\n\n")

	for _, path := range validFiles {
		raw, err := embeddedFS.ReadFile(path)
		if err != nil {
			return fmt.Errorf("failed to read embedded failure file %s: %w", path, err)
		}

		var failures map[string]FailureEntry
		if err := json.Unmarshal(raw, &failures); err != nil {
			return fmt.Errorf("failed to unmarshal failure JSON from %s: %w", path, err)
		}

		for _, item := range failures {
			builder.WriteString(fmt.Sprintf("- Salah: %s\n  Benar: %s\n\n", item.Wrong, item.Right))
		}
	}

	return nil
}
