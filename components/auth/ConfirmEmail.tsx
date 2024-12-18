"use client";

import { emailConfirmation } from "@/app/auth/actions";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

import { useEffect, useState } from "react";
import AuthForm from "./AuthForm";

const ConfirmEmail = () => {
  const token = useSearchParams().get("token");
  const router = useRouter();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const confirmEmail = async () => {
      if (!token) {
        setError("Invalid token");
        return;
      }
      try {
        const { success, error } = await emailConfirmation(token);
        if (success) {
          setSuccess(success);
          // router.push("/auth/login");
        } else if (error) setError(error);
      } catch (err) {
        setError("An unexpected error occurred.");
      }
    };

    confirmEmail();
  }, []);

  return (
    <AuthForm
      formTitle="Confirmation Status"
      footerLabel="Login to your account"
      footerHref="/auth/login"
      showProvider={false}
    >
      <p
        className={cn(
          "text-center font-semibold text-xl ",
          success && "text-primary",
          error && "text-red-600"
        )}
      >
        {!success && !error ? "Confirming email..." : success ? success : error}
      </p>
    </AuthForm>
  );
};

export default ConfirmEmail;
