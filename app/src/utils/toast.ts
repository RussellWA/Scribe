import { toast } from "sonner";

export const notify = {
  copied() {
    toast.success("Copied to clipboard");
  },

  saved() {
    toast.success("Meeting saved");
  },

  cleared() {
    toast.success("Workspace cleared");
  },

  generated() {
    toast.success("Meeting generated");
  },

  failed(message: string) {
    toast.error(message);
  },
};