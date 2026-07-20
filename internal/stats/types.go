package stats

import "time"

type Statistics struct {
	Model                 string
	Temperature           float64
	InputLines            int
	OutputLines           int
	NormalizationCount    int
	MeetingNotesCount     int
	NeedConfirmationCount int
	OutstandingCount      int
	PromptTime            time.Duration
	GenerationTime        time.Duration
}
