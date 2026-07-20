package normalizer

import (
	"regexp"
	"strings"
)

func Normalize(input string, rules map[string]string) (string, int) {

	count := 0
	output := input

	for oldWord, newWord := range rules {

		regex := regexp.MustCompile(`(?i)\b` + regexp.QuoteMeta(oldWord) + `\b`)

		matches := regex.FindAllStringIndex(output, -1)
		count += len(matches)

		output = regex.ReplaceAllString(output, newWord)
	}

	output = strings.ReplaceAll(output, "\r\n", "\n")

	return output, count
}
