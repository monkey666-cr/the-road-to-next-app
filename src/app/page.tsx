import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/heading";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <Heading title="Home" description="Hello Ticket Home!!!" />

      <div className="flex flex-1 flex-col items-center">
        <Button variant="outline">
          <Link href="/tickets" className="text-sm underline">
            Go to Tickets
          </Link>
        </Button>
      </div>
    </div>
  );
}
