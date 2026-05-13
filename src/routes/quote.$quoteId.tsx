import { createFileRoute, useLocation, useNavigate } from '@tanstack/react-router'
import { type ComponentProps } from 'react';
import z from 'zod';
import { MyButton } from '../MyButton';
import { getQuote, useQuote, type QuoteType } from '../hooks/useQuote';
import { cn } from '../lib/utils';
import { useQueryClient } from '@tanstack/react-query';

const paramsSchema = z.object({
  quoteId: z.coerce.number().int(),
  status: z.enum(["draft", "published", "archived"]).optional()
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
})

// eslint-disable-next-line react-refresh/only-export-components
function RouteComponent() {
  const { quoteId } = Route.useParams();
  const navigate = useNavigate()
  const { data: quote } = useQuote(quoteId);
  const queryClient = useQueryClient();
  const handlePrev = () => {
    navigate({
      to: "/quote/$quoteId",
      params: {
        quoteId: Math.max(1, quoteId - 1),
        status: "archived"
      }
    })
    const preloadId = Math.max(quoteId - 2, 1)
    queryClient.ensureQueryData({
      queryKey: [ "quote", preloadId],
      queryFn: () => getQuote(preloadId)
    })
  }
  const handleNext = () => {
    navigate({
      to: "/quote/$quoteId",
      params: {
        quoteId: Math.min(99, quoteId + 1)
      }
    })
    const preloadId = quoteId + 2
    queryClient.ensureQueryData({
      queryKey: [ "quote", preloadId],
      queryFn: () => getQuote(preloadId)
    })
  }
  if (!quote) {
    return <div>Loading...</div>
  }
  return (
    <Vbox>
        <Hbox>
          <MyButton onClick={handlePrev}>Prev</MyButton>
          <MyButton onClick={handleNext}>Next</MyButton>
        </Hbox>
        <Quote quote={quote}></Quote>
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

