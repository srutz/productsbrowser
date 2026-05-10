import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { useProducts } from "../hooks/useProducts";
import { ProductThumb } from "../ui/ProductThumb";

const paramsSchema = z.object({
  page: z.coerce
    .number()
    .int()
    .nonnegative()
    //.refine((n) => n % 2 === 0, { message: "page must be even" })
    .optional(),
});

export const Route = createFileRoute("/products/page/{-$page}")({
  params: {
    parse: (raw) => paramsSchema.parse(raw),
    stringify: ({ page }) => ({ page: page?.toString() }),
  },
  component: RouteComponent,
});

// eslint-disable-next-line react-refresh/only-export-components
function RouteComponent() {
  const { page = 1 } = Route.useParams();
  const { data: productsResponse } = useProducts({ page });
  return (
    <div className="grow flex flex-col">
      <div className="flex flex-wrap justify-center gap-4">
        {productsResponse.products.map((product) => (
          <ProductThumb key={product.id} product={product}></ProductThumb>
        ))}
      </div>
    </div>
  );
}
