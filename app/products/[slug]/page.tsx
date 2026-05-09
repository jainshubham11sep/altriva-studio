import { notFound } from "next/navigation";
import { products } from "@/lib/products";
import ProductClient from "./ProductClient";

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  const related = products
    .filter((p) => p.slug !== slug && p.category === product.category)
    .slice(0, 4);

  return <ProductClient product={product} related={related} />;
}
