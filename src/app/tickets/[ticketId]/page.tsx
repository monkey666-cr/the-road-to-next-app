import { Heading } from "@/components/heading";
import { Spinner } from "@/components/spinner";
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
      <TicketDetail ticketId={ticketId} />
    </>
  );
};

export default TicketPage;
