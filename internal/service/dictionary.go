package service

import (
	"encoding/json"
	"os"
)

const (
	normalizationPath = "data/normalization.json"
	glossaryPath      = "data/glossary.json"
	failurePath       = "data/failure.json"
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

type FailureEntry struct {
	Wrong string `json:"wrong"`
	Right string `json:"right"`
}

func loadFailure(path string) (map[string]FailureEntry, error) {
	data, err := os.ReadFile(path)
	if err != nil {
		return nil, err
	}

	var dictionary map[string]FailureEntry

	err = json.Unmarshal(data, &dictionary)
	if err != nil {
		return nil, err
	}

	return dictionary, nil
}

func saveFailure(path string, dictionary map[string]FailureEntry) error {
	data, err := json.MarshalIndent(dictionary, "", "  ")
	if err != nil {
		return err
	}

	return os.WriteFile(path, data, 0644)
}

func LoadFailure() (map[string]FailureEntry, error) {
	return loadFailure(failurePath)
}

func SaveFailure(dictionary map[string]FailureEntry) error {
	return saveFailure(failurePath, dictionary)
}
