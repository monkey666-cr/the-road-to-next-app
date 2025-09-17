import initializeData from "@/data";

type TicketPageProps = {
  params: Promise<{
    ticketId: string;
  }>;
};

const TicketPage = async (props: TicketPageProps) => {
  const params = (await props.params);
  const ticketId = params.ticketId;

  const ticket = initializeData.find((ticket) => ticket.id === ticketId);

  return (
    <>
      <h1>{ticket?.title}</h1>
      <span>{ticket?.description}</span>
    </>
  );
};

export default TicketPage;
