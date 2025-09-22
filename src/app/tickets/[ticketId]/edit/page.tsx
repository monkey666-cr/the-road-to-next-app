import TicketUpdate from "@/features/tickets/components/ticket-update";
import { Suspense } from "react";

type TicketEditPageProps = {
  params: Promise<{
    ticketId: string;
  }>;
};

const TicketEditPage = async (props: TicketEditPageProps) => {
  const params = await props.params;
  return (
    <>
      <Suspense>{TicketUpdate(Number(params.ticketId))}</Suspense>
    </>
  );
};

export default TicketEditPage;
