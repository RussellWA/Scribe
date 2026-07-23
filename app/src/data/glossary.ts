import type { GlossaryEntry } from '../types/GlossaryEntry';

export const glossaryData: GlossaryEntry[] = [
  {
    id: crypto.randomUUID(),
    acronym: 'QA',
    expansion: 'Quality Assurance',
  },
  {
    id: crypto.randomUUID(),
    acronym: 'PIC',
    expansion: 'Person In Charge',
  },
  {
    id: crypto.randomUUID(),
    acronym: 'POC',
    expansion: 'Proof of Concept',
  },
];
