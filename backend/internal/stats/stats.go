package stats

import (
	"fmt"
	"strings"
)

func CountLines(text string) int {
	lines := strings.Split(text, "\n")

	count := 0

	for _, line := range lines {
		if strings.TrimSpace(line) != "" {
			count++
		}
	}

	return count
}

func (s Statistics) Print() {

	fmt.Println()
	fmt.Println("========== Statistics ==========")
	fmt.Printf("Model                 : %s\n", s.Model)
	fmt.Printf("Temperature           : %.2f\n", s.Temperature)
	fmt.Printf("Input Lines           : %d\n", s.InputLines)
	fmt.Printf("Output Lines          : %d\n", s.OutputLines)
	fmt.Printf("Meeting Notes         : %d\n", s.MeetingNotesCount)
	fmt.Printf("Need Confirmation     : %d\n", s.NeedConfirmationCount)
	fmt.Printf("Outstanding Actions   : %d\n", s.OutstandingCount)
	fmt.Printf("Prompt Time       : %v\n", s.PromptTime)
	fmt.Printf("Generation Time       : %v\n", s.GenerationTime)
	fmt.Println("================================")
}
