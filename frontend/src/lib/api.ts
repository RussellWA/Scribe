import { Generate, GetFailure, GetGlossary, GetNormalization, SaveFailure, SaveGlossary, SaveNormalization } from "../../wailsjs/go/main/App";
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

export async function getNormalization(): Promise<Record<string, string>> {
  return await GetNormalization();
}

export async function saveNormalization(normalization: Record<string, string>): Promise<void> {
  await SaveNormalization(normalization);
}

export async function getFailure(): Promise<Record<string, { wrong: string; right: string }>> {
  return await GetFailure();
}

export async function saveFailure(failure: Record<string, { wrong: string; right: string }>): Promise<void> {
  await SaveFailure(failure);
}