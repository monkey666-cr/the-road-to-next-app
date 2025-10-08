"use server";

import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { z } from "zod";
import { hash } from "@node-rs/argon2";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { lucia } from "@/lib/auth";
import { Prisma } from "@prisma/client";

const signUpSchema = z
  .object({
    username: z
      .string()
      .min(1)
      .max(255)
      .refine(
        (value) => !value.includes(" "),
        "Username cannot contain spaces"
      ),
    email: z.email().min(1, { message: "Is required" }).max(255),
    password: z.string().min(6).max(255),
    confirmPassword: z.string().min(6).max(255),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Password do not match",
        path: ["confirmPassword"],
      });
    }
  });

export const signUp = async (_actionState: ActionState, formData: FormData) => {
  try {
    const { username, email, password } = signUpSchema.parse(
      Object.fromEntries(formData)
    );
    const passwordHash = await hash(password);
    const user = await prisma.user.create({
      data: {
        username,
        email,
        passwordHash,
      },
    });
    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    (await cookies()).set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return toActionState(
        "ERROR",
        "Either email or username is already used",
        formData
      );
    }
    return fromErrorToActionState(error, formData);
  }

  return toActionState("SUCCESS", "Sign up successful", formData);
};
