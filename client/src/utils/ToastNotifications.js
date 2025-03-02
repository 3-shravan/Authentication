import { toast } from "sonner";

export const successToast = (message) => {
  toast.success(message ,{
    className:"h-10"
  });
};

export const errorToast = (message) => {
  toast.error(message);
};
