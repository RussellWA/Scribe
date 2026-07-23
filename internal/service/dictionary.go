package service

import (
	"encoding/json"
	"os"
	"scribe/internal/model"
)

const (
	normalizationPath = "data/normalization.json"
	glossaryPath      = "data/glossary.json"
)

func loadDictionary(path string) (model.Dictionary, error) {
	data, err := os.ReadFile(path)
	if err != nil {
		return nil, err
	}

	var dictionary model.Dictionary

	err = json.Unmarshal(data, &dictionary)
	if err != nil {
		return nil, err
	}

	return dictionary, nil
}

func saveDictionary(path string, dictionary model.Dictionary) error {
	data, err := json.MarshalIndent(dictionary, "", "    ")
	if err != nil {
		return err
	}

	return os.WriteFile(path, data, 0644)
}

func LoadNormalization() (model.Dictionary, error) {
	return loadDictionary(normalizationPath)
}

func SaveNormalization(dictionary model.Dictionary) error {
	return saveDictionary(normalizationPath, dictionary)
}

func LoadGlossary() (model.Dictionary, error) {
	return loadDictionary(glossaryPath)
}

func SaveGlossary(dictionary model.Dictionary) error {
	return saveDictionary(glossaryPath, dictionary)
}
