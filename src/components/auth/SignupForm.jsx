"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Building, Mail, Phone, User, UserPlus } from "lucide-react";
import {
  Button,
  Checkbox,
  FieldLabel,
  Input,
  NumberInput,
  PasswordInput,
  SegmentedControl,
} from "@/components/ui";
import AuthHeading from "@/components/auth/AuthHeading";
import PasswordStrength from "@/components/auth/PasswordStrength";
import { AUTH_ROUTES } from "@/constants/auth";
import { COMPANY_TYPES } from "@/constants/projects";
import { PASSWORD_RULES, isEmail, passwordScore } from "@/lib/validators";
import { useToast } from "@/context/ToastContext";
import { authService } from "@/services/authService";

const INITIAL = {
  name: "",
  company: "",
  companyType: "developer",
  email: "",
  phone: "",
  password: "",
  confirm: "",
  terms: false,
};

export default function SignupForm() {
  const router = useRouter();
  const toast = useToast();
  const [values, setValues] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const set = (key, value) => {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!values.name.trim()) next.name = "Enter your full name.";
    if (!values.company.trim()) next.company = "Enter your company name.";
    if (!isEmail(values.email)) next.email = "Enter a valid email address.";
    if (values.phone.length < 7) next.phone = "Enter a valid phone number.";
    if (passwordScore(values.password) < PASSWORD_RULES.length) {
      next.password = "Password does not meet all the rules.";
    }
    if (values.confirm !== values.password) next.confirm = "Passwords do not match.";
    if (!values.terms) next.terms = "You need to accept the terms to continue.";
    return next;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length) return;

    setLoading(true);
    try {
      await authService.signup(values);
      toast.success("Your account is ready. Let's add your first project.", { title: "Account created" });
      router.replace(AUTH_ROUTES.afterLogin);
    } catch (err) {
      toast.error(err.message || "Could not create your account. Please try again.", {
        title: "Sign up failed",
      });
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <AuthHeading
        title="Create your account"
        subtitle="Start listing projects and getting matched with the right customers."
      />

      <div className="flex flex-col gap-2">
        <FieldLabel>I am a</FieldLabel>
        <SegmentedControl
          label="Company type"
          options={COMPANY_TYPES}
          value={values.companyType}
          onChange={(v) => set("companyType", v)}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          label="Full name"
          autoComplete="name"
          leftIcon={User}
          placeholder="Your name"
          value={values.name}
          onChange={(e) => set("name", e.target.value)}
          error={errors.name}
        />
        <Input
          label="Company name"
          autoComplete="organization"
          leftIcon={Building}
          placeholder="Company name"
          value={values.company}
          onChange={(e) => set("company", e.target.value)}
          error={errors.company}
        />
      </div>

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
      <NumberInput
        label="Phone number"
        leftIcon={Phone}
        autoComplete="tel"
        maxLength={15}
        placeholder="Digits only"
        value={values.phone}
        onChange={(v) => set("phone", v)}
        error={errors.phone}
      />

      <div className="flex flex-col gap-3">
        <PasswordInput
          label="Password"
          autoComplete="new-password"
          placeholder="Create a password"
          value={values.password}
          onChange={(e) => set("password", e.target.value)}
          error={errors.password}
        />
        {values.password && <PasswordStrength value={values.password} />}
      </div>
      <PasswordInput
        label="Confirm password"
        autoComplete="new-password"
        placeholder="Repeat your password"
        value={values.confirm}
        onChange={(e) => set("confirm", e.target.value)}
        error={errors.confirm}
      />

      <Checkbox checked={values.terms} onChange={(v) => set("terms", v)} error={errors.terms}>
        I agree to the{" "}
        <span className="font-semibold text-primary">Terms of Service</span> and{" "}
        <span className="font-semibold text-primary">Privacy Policy</span>.
      </Checkbox>

      <Button type="submit" size="lg" loading={loading} leftIcon={UserPlus} className="w-full">
        Create account
      </Button>

      <p className="text-center text-sm text-muted">
        Already have an account?{" "}
        <Link href={AUTH_ROUTES.login} className="font-semibold text-primary hover:text-primary-hover">
          Log in
        </Link>
      </p>
    </form>
  );
}
