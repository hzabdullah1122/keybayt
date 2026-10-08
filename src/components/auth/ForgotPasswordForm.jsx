"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, KeyRound, Mail, MailCheck, Send } from "lucide-react";
import { Button, Input } from "@/components/ui";
import AuthHeading from "@/components/auth/AuthHeading";
import { AUTH_ROUTES } from "@/constants/auth";
import { isEmail } from "@/lib/validators";
import { useToast } from "@/context/ToastContext";
import { authService } from "@/services/authService";

function BackToLogin() {
  return (
    <Link
      href={AUTH_ROUTES.login}
      className="flex items-center justify-center gap-2 text-sm font-semibold text-muted transition-colors hover:text-primary"
    >
      <ArrowLeft size={16} />
      Back to login
    </Link>
  );
}

export default function ForgotPasswordForm() {
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const send = async () => {
    setLoading(true);
    try {
      await authService.requestPasswordReset(email);
      setSent(true);
      toast.success(`We sent a reset link to ${email.trim()}.`, { title: "Email sent" });
    } catch {
      toast.error("Could not send the reset link. Please try again.", { title: "Email not sent" });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isEmail(email)) {
      setError("Enter a valid email address.");
      return;
    }
    send();
  };

  if (sent) {
    return (
      <div className="flex flex-col gap-6">
        <AuthHeading
          icon={MailCheck}
          title="Check your email"
          subtitle={`If an account exists for ${email.trim()}, we have sent a link to reset your password.`}
        />
        <Button variant="outline" size="lg" loading={loading} onClick={send} className="w-full">
          Resend link
        </Button>
        <BackToLogin />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <AuthHeading
        icon={KeyRound}
        title="Forgot your password?"
        subtitle="Enter the email you signed up with and we will send you a link to reset it."
      />

      <Input
        label="Email address"
        type="email"
        autoComplete="email"
        leftIcon={Mail}
        placeholder="you@company.com"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setError("");
        }}
        error={error && !loading ? error : undefined}
      />

      <Button type="submit" size="lg" loading={loading} leftIcon={Send} className="w-full">
        Send reset link
      </Button>

      <BackToLogin />
    </form>
  );
}
