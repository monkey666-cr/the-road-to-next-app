import { Heading } from "@/components/heading";
import initializeData from "@/data";

type TicketPageProps = {
  params: Promise<{
    ticketId: string;
  }>;
};

const TicketPage = async (props: TicketPageProps) => {
  const params = await props.params;
  const ticketId = params.ticketId;

  const ticket = initializeData.find((ticket) => ticket.id === ticketId);

  return (
    <>
      <Heading title="Ticket Details" />

      <h1>{ticket?.title}</h1>
      <span>{ticket?.description}</span>
    </>
  );
};

export default TicketPage;
