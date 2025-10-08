import { CardCompact } from "@/components/card-comopact";
import { SignUpForm } from "@/features/auth/components/sign-up-form";
import { signInPath } from "@/path";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <div className="flex flex-1 items-center justify-center animate-fade-in-from-top">
      <CardCompact
        title="Sign Up"
        description="Create an account to get started"
        className="flex flex-col self-center mb-10 w-full max-w-[650px]"
        content={<SignUpForm />}
        footer={
          <Link className="text-sm text-muted-foreground" href={signInPath}>
            Have an account? Sign In now
          </Link>
        }
      />
    </div>
  );
}
