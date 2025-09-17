import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Home Page</h1>
      <div className="py-2">
        <Link href="/tickets" className="text-blue-500 underline">
          Go to Tickets
        </Link>
      </div>
    </div>
  );
}
