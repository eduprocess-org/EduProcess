import { type ButtonHTMLAttributes, type ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md";
  children: ReactNode;
  isLoading?: boolean;
}

export function Button({
  variant = "primary",
  size = "md",
  children,
  isLoading = false,
  disabled,
  className = "",
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-medium transition-colors rounded-lg disabled:opacity-60 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-[#1B2B5E] text-white hover:bg-[#142348] disabled:bg-[#CBD5E1]",
    secondary: "bg-[#EFF6FF] text-[#1B2B5E] border border-[#D9E3F0] hover:bg-[#DBEAFE]",
    outline: "bg-transparent border border-[#D9E3F0] text-[#64748B] hover:bg-[#F8FAFC]",
    ghost: "bg-transparent text-[#64748B] hover:bg-[#F1F5F9]",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <svg
          className="mr-2 h-4 w-4 animate-spin text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
      ) : null}
      {children}
    </button>
  );
}