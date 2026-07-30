package service

import (
	"Scribe/config"
	"encoding/json"
	"os"
)

func loadDictionary(fileName string) (map[string]string, error) {
	path, err := config.GetUserFilePath(fileName)
	if err != nil {
		return nil, err
	}

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

func saveDictionary(fileName string, dictionary map[string]string) error {
	path, err := config.GetUserFilePath(fileName)
	if err != nil {
		return err
	}

	data, err := json.MarshalIndent(dictionary, "", "    ")
	if err != nil {
		return err
	}

	return os.WriteFile(path, data, 0644)
}

func LoadNormalization() (map[string]string, error) {
	return loadDictionary("normalization.json")
}

func SaveNormalization(dictionary map[string]string) error {
	return saveDictionary("normalization.json", dictionary)
}

func LoadGlossary() (map[string]string, error) {
	return loadDictionary("glossary.json")
}

func SaveGlossary(dictionary map[string]string) error {
	return saveDictionary("glossary.json", dictionary)
}

type FailureEntry struct {
	Wrong string `json:"wrong"`
	Right string `json:"right"`
}

func loadFailure(fileName string) (map[string]FailureEntry, error) {
	path, err := config.GetUserFilePath(fileName)
	if err != nil {
		return nil, err
	}

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

func saveFailure(fileName string, dictionary map[string]FailureEntry) error {
	path, err := config.GetUserFilePath(fileName)
	if err != nil {
		return err
	}

	data, err := json.MarshalIndent(dictionary, "", "  ")
	if err != nil {
		return err
	}

	return os.WriteFile(path, data, 0644)
}

func LoadFailure() (map[string]FailureEntry, error) {
	return loadFailure("failure.json")
}

func SaveFailure(dictionary map[string]FailureEntry) error {
	return saveFailure("failure.json", dictionary)
}
