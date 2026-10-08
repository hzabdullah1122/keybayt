"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogIn, Mail } from "lucide-react";
import { Button, Checkbox, Input, PasswordInput } from "@/components/ui";
import AuthHeading from "@/components/auth/AuthHeading";
import { AUTH_ROUTES, LOGIN_VALIDATION_ENABLED } from "@/constants/auth";
import { isEmail } from "@/lib/validators";
import { useToast } from "@/context/ToastContext";
import { authService } from "@/services/authService";

export default function LoginForm() {
  const router = useRouter();
  const toast = useToast();
  const [values, setValues] = useState({ email: "", password: "", remember: true });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const set = (key, value) => {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (LOGIN_VALIDATION_ENABLED) {
      const next = {};
      if (!isEmail(values.email)) next.email = "Enter a valid email address.";
      if (!values.password) next.password = "Enter your password.";
      setErrors(next);
      if (Object.keys(next).length) return;
    }

    setLoading(true);
    try {
      await authService.login(values);
      toast.success("You are now logged in to your dashboard.", { title: "Welcome back!" });
      router.replace(AUTH_ROUTES.afterLogin);
    } catch (err) {
      toast.error(err.message || "Could not log in. Please try again.", { title: "Login failed" });
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <AuthHeading title="Welcome back" subtitle="Log in to manage your projects and customer matches." />

      <Input
        label="Email address"
        type="email"
        autoComplete="email"
        leftIcon={Mail}
        placeholder="you@company.com"
        value={values.email}
        onChange={(e) => set("email", e.target.value)}
        error={errors.email}
      />
      <PasswordInput
        label="Password"
        placeholder="Enter your password"
        value={values.password}
        onChange={(e) => set("password", e.target.value)}
        error={errors.password}
      />

      <div className="flex items-center justify-between gap-3">
        <Checkbox checked={values.remember} onChange={(v) => set("remember", v)}>
          Remember me
        </Checkbox>
        <Link
          href={AUTH_ROUTES.forgotPassword}
          className="text-sm font-semibold text-primary hover:text-primary-hover"
        >
          Forgot password?
        </Link>
      </div>

      <Button type="submit" size="lg" loading={loading} leftIcon={LogIn} className="w-full">
        Log in
      </Button>

      <p className="text-center text-sm text-muted">
        New to Keybayt?{" "}
        <Link href={AUTH_ROUTES.signup} className="font-semibold text-primary hover:text-primary-hover">
          Create an account
        </Link>
      </p>
    </form>
  );
}
