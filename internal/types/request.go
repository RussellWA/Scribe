package types

type GenerateRequest struct {
	Title string `json:"title"`
	Notes string `json:"notes"`
	Model string `json:"model"`
}
