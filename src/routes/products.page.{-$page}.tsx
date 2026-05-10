import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { useProducts } from "../hooks/useProducts";
import type { Product } from "../types";
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
  const navigate = useNavigate();
  const handleProductClick = (product: Product) => {
    navigate({ to: "/product/$productId", params: { productId: product.id } });
  };
  return (
    <div className="grow flex flex-col">
      <div className="flex flex-wrap justify-center gap-4">
        {productsResponse.products.map((product) => (
          <button
            key={product.id}
            type="button"
            onClick={() => handleProductClick(product)}
          >
            <ProductThumb key={product.id} product={product}></ProductThumb>
          </button>
        ))}
      </div>
    </div>
  );
}
