export const homePath = "/";

export const ticketsPath = "/tickets";

export const ticketPath = (ticketId: string | number) => `/tickets/${ticketId}`;

export const ticketEditPath = (ticketId: string | number) =>
  `/tickets/${ticketId}/edit`;

export const signInPath = "/sign-in";

export const signUpPath = "/sign-up";
