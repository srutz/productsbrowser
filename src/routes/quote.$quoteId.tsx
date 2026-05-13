import { createFileRoute } from '@tanstack/react-router'
import { type ComponentProps } from 'react';
import z from 'zod';
import { MyButton } from '../MyButton';
import { useQuote, type QuoteType } from '../hooks/useQuote';
import { cn } from '../lib/utils';

const paramsSchema = z.object({
  quoteId: z.coerce.number().int(),
});

const searchSchema = z.object({
  hl: z.coerce.boolean().catch(false),
  sort: z.enum(["asc", "desc"]).optional()
});


// eslint-disable-next-line react-refresh/only-export-components
export const Route = createFileRoute('/quote/$quoteId')({
  component: RouteComponent,
  params: {
    parse: (raw) => {
      return paramsSchema.parse(raw)
    },
    stringify: ({ quoteId }) => ({ quoteId: quoteId.toString() }),
  },
  validateSearch: searchSchema,
})

// eslint-disable-next-line react-refresh/only-export-components
function RouteComponent() {
  const { quoteId } = Route.useParams();
  const search = Route.useSearch()
  const { data: quote } = useQuote(quoteId);
  if (!quote) {
    return <div>Loading...</div>
  }
  return (
    <Vbox>
        <Quote quote={quote}></Quote>
        <Hbox>
          <MyButton>Prev</MyButton>
          <MyButton>Next</MyButton>
        </Hbox>
    </Vbox>
    )
}

export function Vbox({ className, children, ...props }: ComponentProps<"div">) {
  return (<div className={cn("flex flex-col gap-4", className)} {...props}>
    {children}
  </div>)
}

export function Hbox({ className, children, ...props }: ComponentProps<"div">) {
  return (<div className={cn("flex self-center gap-2", className)} {...props}>
    {children}
  </div>)
}

export function Quote({ quote } : { quote: QuoteType }) {
  return (<div className="flex flex-col self-center gap-2 shadow-xl px-6 py-2 max-w-[500px]">
    <div>{quote?.quote}</div>
      <div className="text-gray-600 text-sm">{quote?.author}</div>
    </div>)
}

