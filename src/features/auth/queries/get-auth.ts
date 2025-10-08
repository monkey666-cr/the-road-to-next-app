"use server";

import { lucia } from "@/lib/auth";
import { cookies } from "next/headers";
import { cache } from "react";

export const getAuth = cache(async () => {
  const sessionId = (await cookies()).get(lucia.sessionCookieName)?.value;
  if (!sessionId) return { user: null, session: null };

  const result = await lucia.validateSession(sessionId);

  try {
    if (result.session && result.session.fresh) {
      const sessionCookie = lucia.createSessionCookie(result.session.id);
      (await cookies()).set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }
    if (!result.session) {
      const sessionCookie = lucia.createBlankSessionCookie();
      (await cookies()).set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }
  } catch (error) {
    console.error("Error validating session:", error);
  }

  return result;
});
