package prompt

func BuildRequest(systemPrompt string, input string) string {
	return systemPrompt + "\n\n" + input
}
