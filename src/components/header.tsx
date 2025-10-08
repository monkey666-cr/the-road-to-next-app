"use client";

import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { LucideKanban, LucideLogOut } from "lucide-react";
import { homePath, signInPath, signUpPath, ticketsPath } from "@/path";
import { ThemeSwitcher } from "./theme/theme-switcher";
import { signOut } from "@/features/auth/actions/sign-out";
import { SubmitButton } from "./form/submit-button";
import { useAuth } from "@/features/auth/hooks/use-auth";

const Header = () => {
  const { user, isFetched } = useAuth();

  if (!isFetched) {
    return null;
  }

  return (
    <nav
      className="
          animate-header-from-top
          supports-backdrop-blur:bg-background/60
          fixed left-0 right-0 top-0 z-20
          border-b bg-baackground/95 backdrop-blur
          w-full flex justify-between py-2.5 px-5"
    >
      {user ? (
        <>
          <div className="flex gap-2">
            <div>
              <Button asChild variant="outline">
                <Link href={homePath}>
                  <LucideKanban />
                  <h1 className="text-lg font-semibold">TicketBounty</h1>
                </Link>
              </Button>
            </div>
            <div>
              <Link
                href={ticketsPath}
                className={buttonVariants({ variant: "outline" })}
              >
                Tickets
              </Link>
            </div>
          </div>
          <div className="flex gap-2">
            <div>
              <ThemeSwitcher />
            </div>
            <div>
              <form action={signOut}>
                <SubmitButton label="Sign out" icon={<LucideLogOut />} />
              </form>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex gap-2">
            <div>
              <Button asChild variant="outline">
                <Link href={homePath}>
                  <LucideKanban />
                  <h1 className="text-lg font-semibold">TicketBounty</h1>
                </Link>
              </Button>
            </div>
          </div>
          <div className="flex gap-2">
            <div>
              <ThemeSwitcher />
            </div>
            <div>
              <Link
                href={signUpPath}
                className={buttonVariants({ variant: "outline" })}
              >
                Sign Up
              </Link>
            </div>
            <div>
              <Link
                href={signInPath}
                className={buttonVariants({ variant: "default" })}
              >
                Sign In
              </Link>
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export { Header };
