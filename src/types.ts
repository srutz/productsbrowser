import { z } from "zod";

const ProductDimensionsSchema = z.object({
  width: z.number(),
  height: z.number(),
  depth: z.number(),
});

const ProductReviewSchema = z.object({
  rating: z.number(),
  comment: z.string(),
  date: z.string(), // ISO 8601 date string
  reviewerName: z.string(),
  reviewerEmail: z.string().email(),
});

const ProductMetaSchema = z.object({
  createdAt: z.string(), // ISO 8601 date string
  updatedAt: z.string(), // ISO 8601 date string
  barcode: z.string(),
  qrCode: z.string(),
});

const ProductSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  category: z.string(),
  price: z.number(),
  discountPercentage: z.number(),
  rating: z.number(),
  stock: z.number(),
  tags: z.array(z.string()),
  brand: z.string(),
  sku: z.string(),
  weight: z.number(),
  dimensions: ProductDimensionsSchema,
  warrantyInformation: z.string(),
  shippingInformation: z.string(),
  availabilityStatus: z.string(),
  reviews: z.array(ProductReviewSchema),
  returnPolicy: z.string(),
  minimumOrderQuantity: z.number(),
  meta: ProductMetaSchema,
  images: z.array(z.string()),
  thumbnail: z.string(),
});

const ProductsRequestSchema = z.object({
  total: z.number(),
  skip: z.number(),
  limit: z.number(),
  products: z.array(ProductSchema),
});

type ProductDimensions = z.infer<typeof ProductDimensionsSchema>;
type ProductReview = z.infer<typeof ProductReviewSchema>;
type ProductMeta = z.infer<typeof ProductMetaSchema>;
type Product = z.infer<typeof ProductSchema>;

type ProductsRequest = z.infer<typeof ProductsRequestSchema>;

export {
  ProductDimensionsSchema,
  ProductMetaSchema,
  ProductReviewSchema,
  ProductSchema,
  ProductsRequestSchema,
  type Product,
  type ProductDimensions,
  type ProductMeta,
  type ProductReview,
  type ProductsRequest
};

