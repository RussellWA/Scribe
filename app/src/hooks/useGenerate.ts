import { useState } from 'react';

interface GenerateResult {
  output: string;
  elapsed: number;
}

export function useGenerate() {
  const [loading, setLoading] = useState(false);

  const generate = async (
    title: string,
    input: string
  ): Promise<GenerateResult> => {
    setLoading(true);

    const start = performance.now();

    try {
      // mock delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      return {
        output: `# ${title}

Meeting Notes

- Mock output`,
        elapsed: (performance.now() - start) / 1000,
      };
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    generate,
  };
}
