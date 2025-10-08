import { CardCompact } from "@/components/card-comopact";
import { SignInForm } from "@/features/auth/components/sign-in-form";
import { signUpPath } from "@/path";
import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="flex flex-1 items-center justify-center animate-fade-in-from-top">
      <CardCompact
        title="Sign In"
        description="Sign In your account"
        className="flex flex-col self-center mb-10 w-full max-w-[650px]"
        content={<SignInForm />}
        footer={
          <Link href={signUpPath} className="text-sm text-muted-foreground">
            No account yet?
          </Link>
        }
      />
    </div>
  );
}
