import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/heading";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import { TicketList } from "@/features/tickets/components/ticket-list";
import { Spinner } from "@/components/spinner";
import { Placeholder } from "@/components/ui/placeholder";
import { homePath } from "@/path";

export default async function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <Heading title="Home" description="Hello Ticket Home!!!" />

      <div className="flex flex-1 flex-col items-center">
        <ErrorBoundary
          fallback={
            <Placeholder
              label="Something went wrong!"
              button={
                <Button asChild variant="outline">
                  <Link href={homePath}>Go to Home</Link>
                </Button>
              }
            />
          }
        >
          <Suspense fallback={<Spinner />}>
            <TicketList />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
}
