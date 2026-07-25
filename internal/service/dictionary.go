package service

import (
	"encoding/json"
	"os"
)

const (
	normalizationPath = "data/normalization.json"
	glossaryPath      = "data/glossary.json"
)

func loadDictionary(path string) (map[string]string, error) {
	data, err := os.ReadFile(path)
	if err != nil {
		return nil, err
	}

	var dictionary map[string]string

	err = json.Unmarshal(data, &dictionary)
	if err != nil {
		return nil, err
	}

	return dictionary, nil
}

func saveDictionary(path string, dictionary map[string]string) error {
	data, err := json.MarshalIndent(dictionary, "", "    ")
	if err != nil {
		return err
	}

	return os.WriteFile(path, data, 0644)
}

func LoadNormalization() (map[string]string, error) {
	return loadDictionary(normalizationPath)
}

func SaveNormalization(dictionary map[string]string) error {
	return saveDictionary(normalizationPath, dictionary)
}

func LoadGlossary() (map[string]string, error) {
	return loadDictionary(glossaryPath)
}

func SaveGlossary(dictionary map[string]string) error {
	return saveDictionary(glossaryPath, dictionary)
}
