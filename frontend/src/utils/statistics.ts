import type { SessionStat } from '../types/Statistics';

export function calculateStats(input: string): SessionStat {
  // const characters = input.length;

  const words = input.trim() === '' ? 0 : input.trim().split(/\s+/).length;

  // const lines = input === '' ? 0 : input.split('\n').length;

  const meetingNotes = input.match(/^\s*-/gm)?.length ?? 0;

  const confirmations = input.match(/^\s*\?/gm)?.length ?? 0;

  const actions = input.match(/^\s*\+/gm)?.length ?? 0;

  const unrecognized = input.split('\n').filter((line) => {
    const trimmed = line.trim();

    if (trimmed === '') return false;

    return !['-', '+', '?'].some((p) => trimmed.startsWith(p));
  }).length;

  return {
    // characters,
    words,
    // lines,

    meetingNotes,
    confirmations,
    actions,
    unrecognized,
  };
}
