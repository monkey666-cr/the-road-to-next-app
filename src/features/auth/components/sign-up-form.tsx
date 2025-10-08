"use client";

import { Form } from "@/components/form/form";
import { SubmitButton } from "@/components/form/submit-button";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { Input } from "@/components/ui/input";
import { useActionState } from "react";
import { signUp } from "../actions/sign-up";
import { FieldError } from "@/components/form/utils/field-error";
import { homePath } from "@/path";
import { redirect } from "next/navigation";

const SignUpForm = () => {
  const [actionState, action] = useActionState(signUp, EMPTY_ACTION_STATE);
  return (
    <>
      <Form
        action={action}
        actionState={actionState}
        onSuccess={() => {
          redirect(homePath);
        }}
      >
        <Input
          name="username"
          placeholder="Username"
          defaultValue={actionState.payload?.get("username") as string}
        />
        <FieldError actionState={actionState} name="username" />

        <Input
          name="email"
          placeholder="Email"
          defaultValue={actionState.payload?.get("email") as string}
        />
        <FieldError actionState={actionState} name="email" />

        <Input
          name="password"
          placeholder="Password"
          type="password"
          defaultValue={actionState.payload?.get("password") as string}
        />
        <FieldError actionState={actionState} name="password" />

        <Input
          name="confirmPassword"
          placeholder="Confirm Password"
          type="password"
          defaultValue={actionState.payload?.get("confirmPassword") as string}
        />
        <FieldError actionState={actionState} name="confirmPassword" />

        <SubmitButton label="Sign Up" />
      </Form>
    </>
  );
};

export { SignUpForm };
