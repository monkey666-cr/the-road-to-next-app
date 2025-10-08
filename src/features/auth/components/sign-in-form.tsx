"use client";

import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { useActionState } from "react";
import { signIn } from "../actions/sign-in";
import { Form } from "@/components/form/form";
import { SubmitButton } from "@/components/form/submit-button";
import { Input } from "@/components/ui/input";
import { FieldError } from "@/components/form/utils/field-error";
import { redirect } from "next/navigation";
import { homePath } from "@/path";

const SignInForm = () => {
  const [actionState, action] = useActionState(signIn, EMPTY_ACTION_STATE);

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

        <SubmitButton label="Sign In" />
      </Form>
    </>
  );
};

export { SignInForm };
