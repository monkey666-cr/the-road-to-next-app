import { TicketDetail } from "@/features/tickets/components/ticket-detail";

type TicketPageProps = {
  params: Promise<{
    ticketId: string;
  }>;
};

const TicketPage = async (props: TicketPageProps) => {
  const params = await props.params;
  const ticketId = params.ticketId;

  return (
    <>
      <TicketDetail ticketId={Number(ticketId)} />
    </>
  );
};

// Uncomment this function to enable static generation of ticket pages
// export async function generateStaticParams() {
//   const tickets = await getTickets();

//   if (!tickets) {
//     return [];
//   }

//   return tickets.map((ticket) => ({
//     ticketId: ticket.id.toString(),
//   }));
// }

export default TicketPage;
