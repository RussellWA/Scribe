export async function generateMinutes(
  request: GenerateRequest
): Promise<GenerateResponse> {
  await new Promise((r) => setTimeout(r, 2000));

  return {
    output: 'Mock output',
    elapsed: 2.1,
  };
}
