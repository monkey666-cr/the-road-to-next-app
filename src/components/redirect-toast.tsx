"use client";

import { deleteCookieByKey, getCookieByKey } from "@/actions/cookies";
import { useEffect } from "react";
import { toast } from "sonner";

const RedirectToast = () => {
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
  }, []); // 空依赖数组，只在组件挂载时执行一次

  return null;
};

export { RedirectToast };
