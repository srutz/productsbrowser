import { useNavigate } from "@tanstack/react-router";
import { useTransition } from "react";

export function PagerLink({
  page,
  disabled,
  children,
}: {
  page: number;
  disabled: boolean;
  children: React.ReactNode;
}) {
  const [_, startTransition] = useTransition();
  const navigate = useNavigate();
  const className = "px-3 py-1 rounded border border-gray-300";
  if (disabled) {
    return (
      <span className={`${className} text-gray-400 cursor-not-allowed`}>
        {children}
      </span>
    );
  }
  return (
    <button
      onClick={() => {
        startTransition(() => {
          navigate({ to: "/products/page/{-$page}", params: { page } });
        });
      }}
      className={`${className} hover:bg-gray-100`}
    >
      {children}
    </button>
  );
}
