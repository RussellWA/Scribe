import { Generate, GetGlossary, SaveGlossary } from "../../wailsjs/go/main/App";
import { types } from "../../wailsjs/go/models";

export async function generateMinutes(
  request: types.GenerateRequest
): Promise<types.GenerateResponse> {
  return await Generate(request);
}

export async function getGlossary(): Promise<Record<string, string>> {
  return await GetGlossary();
}

export async function saveGlossary(glossary: Record<string, string>): Promise<void> {
  await SaveGlossary(glossary);
}