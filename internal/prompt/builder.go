package prompt

import (
	"Scribe/config"
	"embed"
	"encoding/json"
	"fmt"
	"os"
	"strings"
)

//go:embed assets data
var embeddedFS embed.FS

type Glossary map[string]string
type Normalization map[string]string
type FailureEntry struct {
	Wrong string `json:"wrong"`
	Right string `json:"right"`
}

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
		"glossary.json",
		"normalization.json",
	); err != nil {
		return "", err
	}

	if err := appendFailures(
		&builder,
		"Known Failures",
		"failure.json",
	); err != nil {
		return "", err
	}

	builder.WriteString("Sekarang, format catatan mentah berikut:")
	return builder.String(), nil
}

func appendDictionary(builder *strings.Builder, title string, fileNames ...string) error {
	builder.WriteString("# ")
	builder.WriteString(title)
	builder.WriteString("\n\n")
	builder.WriteString("Gunakan daftar berikut sebagai referensi penulisan apabila maknanya jelas dari konteks.\n\n")

	for _, fileName := range fileNames {
		fullPath, err := config.GetUserFilePath(fileName)
		if err != nil {
			return fmt.Errorf("failed to get path for %s: %w", fileName, err)
		}

		raw, err := os.ReadFile(fullPath)
		if err != nil {
			if os.IsNotExist(err) {
				continue
			}
			return fmt.Errorf("failed to read %s: %w", fileName, err)
		}

		var dict map[string]string
		if err := json.Unmarshal(raw, &dict); err != nil {
			return fmt.Errorf("failed to parse JSON in %s: %w", fileName, err)
		}

		for from, to := range dict {
			builder.WriteString(fmt.Sprintf("- %s → %s\n", from, to))
		}
	}

	builder.WriteString("\n")
	return nil
}

func appendFailures(builder *strings.Builder, title string, fileNames ...string) error {
	builder.WriteString("# ")
	builder.WriteString(title)
	builder.WriteString("\n\n")
	builder.WriteString("Hindari kesalahan penulisan berikut dan gunakan bentuk perbaikannya:\n\n")

	for _, fileName := range fileNames {
		fullPath, err := config.GetUserFilePath(fileName)
		if err != nil {
			return fmt.Errorf("failed to get path for %s: %w", fileName, err)
		}

		raw, err := os.ReadFile(fullPath)
		if err != nil {
			if os.IsNotExist(err) {
				continue
			}
			return fmt.Errorf("failed to read %s: %w", fileName, err)
		}

		var failures map[string]FailureEntry
		if err := json.Unmarshal(raw, &failures); err != nil {
			return fmt.Errorf("failed to parse JSON in %s: %w", fileName, err)
		}

		for _, item := range failures {
			builder.WriteString(fmt.Sprintf("- Salah: %s\n  Benar: %s\n\n", item.Wrong, item.Right))
		}
	}

	return nil
}
