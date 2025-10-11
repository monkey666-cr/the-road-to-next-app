import { getAuth } from "@/features/auth/queries/get-auth";
import { signInPath } from "@/path";
import { redirect } from "next/navigation";

export const getAuthOrRedirect = async () => {
  const auth = await getAuth();

  if (!auth.user) {
    redirect(signInPath);
  }

  return auth;
};
