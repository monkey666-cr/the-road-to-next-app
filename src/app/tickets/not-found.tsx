import { Button } from "@/components/ui/button";
import { Placeholder } from "@/components/ui/placeholder";
import { ticketsPath } from "@/path";
import Link from "next/link";

const notFound = () => {
  return (
    <Placeholder
      label="Ticket not found"
      button={
        <Button asChild variant="outline">
          <Link href={ticketsPath}>Go to Tickets</Link>
        </Button>
      }
    />
  );
};

export default notFound;
