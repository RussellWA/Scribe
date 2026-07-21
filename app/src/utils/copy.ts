import { toast } from 'sonner';

export async function copyOutput(output: string) {
  await navigator.clipboard.writeText(output);

  toast.success('Meeting minutes copied.');
}
