import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col gap-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Home Page</h2>
        <p className="text-sm-">Your home place to start</p>
      </div>

      <Separator />

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
