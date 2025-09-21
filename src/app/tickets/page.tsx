import { Heading } from "@/components/heading";
import { Spinner } from "@/components/spinner";
import TicketItem from "@/features/tickets/components/ticket-item";
import { TicketList } from "@/features/tickets/components/ticket-list";
import { getTickets } from "@/features/tickets/queries/get-tickets";
import { Suspense } from "react";

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
    <div className="flex flex-1 flex-col">
      <Heading title="Tickets Page" />

      <Suspense fallback={<Spinner />}>
        <TicketList />
      </Suspense>
    </div>
  );
};

export default Tickets;
