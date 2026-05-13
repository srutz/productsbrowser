import { useTransition } from "react";

export function PagerLink({
  page,
  disabled,
  onNavigate,
  children,
}: {
  page: number;
  disabled: boolean;
  onNavigate: (page: number) => void;
  children: React.ReactNode;
}) {
  const [_, startTransition] = useTransition();
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
          onNavigate(page);
        });
      }}
      className={`${className} hover:bg-gray-100`}
    >
      {children}
    </button>
  );
}
