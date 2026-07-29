package parser

import (
	"fmt"
	"strings"
)

func Parse(input string) (*MeetingInput, error) {
	meeting := &MeetingInput{}

	lines := strings.Split(input, "\n")

	for _, line := range lines {
		line = strings.TrimSpace(line)

		if line == "" {
			continue
		}

		switch {
		case strings.HasPrefix(line, "-"):
			meeting.MeetingNotes = append(
				meeting.MeetingNotes,
				strings.TrimSpace(strings.TrimPrefix(line, "-")),
			)

		case strings.HasPrefix(line, "?"):
			meeting.NeedConfirmation = append(
				meeting.NeedConfirmation,
				strings.TrimSpace(strings.TrimPrefix(line, "?")),
			)

		case strings.HasPrefix(line, "+"):
			meeting.OutstandingActions = append(
				meeting.OutstandingActions,
				strings.TrimSpace(strings.TrimPrefix(line, "+")),
			)

		default:
			return nil, fmt.Errorf("unknown marker: %s", line)
		}
	}

	return meeting, nil
}

func BuildStructuredInput(meeting *MeetingInput) string {

	var builder strings.Builder

	builder.WriteString(meeting.Title)
	builder.WriteString("\n\n")

	if len(meeting.MeetingNotes) > 0 {

		builder.WriteString("Meeting Notes\n")

		for _, note := range meeting.MeetingNotes {
			builder.WriteString("- ")
			builder.WriteString(note)
			builder.WriteString("\n")
		}

		builder.WriteString("\n")
	}

	if len(meeting.NeedConfirmation) > 0 {

		builder.WriteString("Need Confirmation\n")

		for _, note := range meeting.NeedConfirmation {
			builder.WriteString("- ")
			builder.WriteString(note)
			builder.WriteString("\n")
		}

		builder.WriteString("\n")
	}

	if len(meeting.OutstandingActions) > 0 {

		builder.WriteString("Next Plan / Outstanding Action\n")

		for _, note := range meeting.OutstandingActions {
			builder.WriteString("- ")
			builder.WriteString(note)
			builder.WriteString("\n")
		}
	}

	return builder.String()
}
