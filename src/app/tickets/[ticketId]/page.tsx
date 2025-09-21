import { Heading } from "@/components/heading";
import { TicketDetail } from "@/features/tickets/components/ticket-detail";
import { Suspense } from "react";

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
      <Heading title="Ticket Details" />

      <Suspense>
        <TicketDetail ticketId={ticketId} />
      </Suspense>
    </>
  );
};

export default TicketPage;
