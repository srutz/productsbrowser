import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { useProduct } from "../hooks/useProduct";
import { ProductPanel } from "../ui/ProductPanel";

const paramsSchema = z.object({
  productId: z.coerce.number().int().nonnegative(),
});

export const Route = createFileRoute("/product/$productId")({
  params: {
    parse: (raw) => paramsSchema.parse(raw),
    stringify: ({ productId }) => ({ productId: productId.toString() }),
  },
  component: RouteComponent,
});

// eslint-disable-next-line react-refresh/only-export-components
function RouteComponent() {
  const { productId } = Route.useParams();
  const { data: product } = useProduct(productId);
  return (
    <div>
      <ProductPanel product={product}></ProductPanel>
    </div>
  );
}
