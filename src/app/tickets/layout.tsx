import { getAuth } from "@/features/auth/queries/get-auth";
import { signInPath } from "@/path";
import { redirect } from "next/navigation";

export default async function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await getAuth();

  if (!user) {
    redirect(signInPath);
  }

  return <>{children}</>;
}
