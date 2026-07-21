import { notify } from './toast';

export async function copyOutput(output: string) {
  await navigator.clipboard.writeText(output);

  notify.copied();
}
