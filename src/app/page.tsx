import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col gap-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Home Page</h2>
        <p className="text-sm-">Your home place to start</p>
      </div>

      <div className="flex flex-1 flex-col items-center">
        <Link href="/tickets" className="text-sm underline">
          Go to Tickets
        </Link>
      </div>
    </div>
  );
}
