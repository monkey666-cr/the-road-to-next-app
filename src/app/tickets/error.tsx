"use client";

import { Button } from "@/components/ui/button";
import { Placeholder } from "@/components/ui/placeholder";
import { homePath } from "@/path";
import Link from "next/link";

const Error = ({ error }: { error: Error }) => {
  return (
    <Placeholder
      label={error.message || "Something went wrong!"}
      button={
        <Button asChild variant="outline">
          <Link href={homePath}>Go to Home</Link>
        </Button>
      }
    />
  );
};

export default Error;
