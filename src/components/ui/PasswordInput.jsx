"use client";

import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import Input from "@/components/ui/Input";

/** Password field with a show/hide toggle. Accepts every <Input> prop. */
export default function PasswordInput(props) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative w-full">
      <Input
        leftIcon={Lock}
        autoComplete="current-password"
        {...props}
        type={visible ? "text" : "password"}
        className="pr-10"
      />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? "Hide password" : "Show password"}
        className="absolute right-2.5 top-[34px] flex h-6 w-6 cursor-pointer items-center justify-center rounded-md text-placeholder transition-colors hover:text-foreground"
        style={props.label ? undefined : { top: 8 }}
      >
        {visible ? <EyeOff size={16} /> : <Eye size={16} />}
      </button>
    </div>
  );
}
