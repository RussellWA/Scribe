import { Generate } from "../../wailsjs/go/main/App";
import { types } from "../../wailsjs/go/models";

export async function generateMinutes(
  request: types.GenerateRequest
): Promise<types.GenerateResponse> {
  return await Generate(request);
}