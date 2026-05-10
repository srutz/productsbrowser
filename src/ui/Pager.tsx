import { PagerLink } from "./PagerLink";

export function Pager({
  page,
  totalPages,
}: {
  page: number;
  totalPages: number;
}) {
  const prev = page - 1;
  const next = page + 1;
  const hasPrev = prev >= 1;
  const hasNext = next <= totalPages;
  return (
    <div className="flex justify-center items-center gap-3 py-4">
      <PagerLink page={prev} disabled={!hasPrev}>
        Prev
      </PagerLink>
      <span className="text-sm text-gray-600">
        Page {page} of {totalPages}
      </span>
      <PagerLink page={next} disabled={!hasNext}>
        Next
      </PagerLink>
    </div>
  );
}
