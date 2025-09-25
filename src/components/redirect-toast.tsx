"use client";

import { deleteCookieByKey, getCookieByKey } from "@/actions/cookies";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

const RedirectToast = () => {
  const pathname = usePathname();

  useEffect(() => {
    const showToast = async () => {
      try {
        const toastMessage = await getCookieByKey("toast");

        console.log(toastMessage);

        if (toastMessage) {
          toast.success(toastMessage);
          await deleteCookieByKey("toast");
        }
      } catch (error) {
        console.error("Failed to get toast message:", error);
      }
    };

    showToast();
  }, [pathname]);

  return null;
};

export { RedirectToast };
