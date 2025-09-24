import { Heading } from "@/components/heading";
import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { Placeholder } from "@/components/ui/placeholder";
import { TicketList } from "@/features/tickets/components/ticket-list";
import { homePath } from "@/path";
import { ErrorBoundary } from "react-error-boundary";
import Link from "next/link";
import { Suspense } from "react";
import TicketCreate from "@/features/tickets/components/ticket-create";
import { RedirectToast } from "@/components/redirect-toast";

// this is a client component
// export default function Tickets() {
//   const [tickets, setTickets] = useState<Ticket[]>([]);

//   useEffect(() => {
//     const fetchTickets = async () => {
//       const tickets = await getTickets();

//       setTickets(tickets);
//     };

//     fetchTickets();
//   }, []);

//   return (
//     <div className="flex flex-1 flex-col">
//       <Heading title="Tickets Page" />

//       <div className="flex flex-1 flex-col items-center animate-fade-in-from-top">
//         {tickets.map((ticket) => (
//           <TicketItem key={ticket.id} ticket={ticket} />
//         ))}
//       </div>
//     </div>
//   );
// }

const Tickets = async () => {
  return (
    <>
      <Heading title="Tickets Page" />

      <div className="flex flex-1 flex-col animate-fade-in-from-top">
        <TicketCreate />

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

        <RedirectToast />
      </div>
    </>
  );
};

export default Tickets;
