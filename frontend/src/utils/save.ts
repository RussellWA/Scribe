export function saveMarkdown(title: string, output: string) {
  const file = `${title}

${output}`;

  const blob = new Blob([file], {
    type: 'text/markdown',
  });

  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');

  a.href = url;

  const filename = title.trim().replace(/[<>:"/\\|?*]/g, '') || 'Meeting';

  a.download = `${filename}.md`;

  a.click();

  URL.revokeObjectURL(url);
}
