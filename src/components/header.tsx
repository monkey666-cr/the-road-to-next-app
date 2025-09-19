import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { LucideKanban } from "lucide-react";
import { homePath, loginPath, ticketsPath } from "@/path";
import { ThemeSwitcher } from "./theme/theme-switcher";

const Header = () => {
  return (
    <nav
      className="
          supports-backdrop-blur:bg-background/60
          fixed left-0 right-0 top-0 z-20
          border-b bg-baackground/95 backdrop-blur
          w-full flex justify-between py-2.5 px-5"
    >
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
          <Link
            href={loginPath}
            className={buttonVariants({ variant: "outline" })}
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export { Header };
