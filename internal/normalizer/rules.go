package normalizer

import (
	"encoding/json"
	"os"
)

func LoadRules(path string) (map[string]string, error) {

	file, err := os.ReadFile(path)
	if err != nil {
		return nil, err
	}

	var rules map[string]string

	if err := json.Unmarshal(file, &rules); err != nil {
		return nil, err
	}

	return rules, nil
}
