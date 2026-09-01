package service

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"
)

const CurrentVersion = "v1.1.3"

type GitHubRelease struct {
	TagName string `json:"tag_name"`
	HTMLURL string `json:"html_url"`
}

type UpdateInfo struct {
	UpdateAvailable bool   `json:"updateAvailable"`
	CurrentVersion  string `json:"currentVersion"`
	LatestVersion   string `json:"latestVersion"`
	ReleaseURL      string `json:"releaseUrl"`
}

func CheckForUpdates() (UpdateInfo, error) {
	apiURL := "https://api.github.com/repos/RussellWA/Scribe/releases/latest"

	client := http.Client{Timeout: 5 * time.Second}

	resp, err := client.Get(apiURL)
	if err != nil {
		return UpdateInfo{}, fmt.Errorf("failed to check for updates: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return UpdateInfo{}, fmt.Errorf("github api returned status: %d", resp.StatusCode)
	}

	var release GitHubRelease
	if err := json.NewDecoder(resp.Body).Decode(&release); err != nil {
		return UpdateInfo{}, err
	}

	// 3. Compare the versions
	updateAvailable := false
	if release.TagName != "" && release.TagName != CurrentVersion {
		updateAvailable = true
	}

	return UpdateInfo{
		UpdateAvailable: updateAvailable,
		CurrentVersion:  CurrentVersion,
		LatestVersion:   release.TagName,
		ReleaseURL:      release.HTMLURL,
	}, nil
}
