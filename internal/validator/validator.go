package validator

import (
	"fmt"
	"strings"
)

func ValidateInput(input string) error {
	lines := strings.Split(input, "\n")

	for i, line := range lines {
		line = strings.TrimSpace(line)

		if line == "" {
			continue
		}

		if !(strings.HasPrefix(line, "-") ||
			strings.HasPrefix(line, "+") ||
			strings.HasPrefix(line, "?")) {

			return fmt.Errorf(
				"Line %d: expected '-', '+', or '?' at the beginning\nFound: %s",
				i+1,
				line,
			)
		}
	}

	return nil
}
