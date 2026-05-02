import CategoryTabs from "@/components/CategoryTabs";
import ProductGrid from "@/components/ProductGrid";
import MoreFeatured from "@/components/MoreFeatured";
import { getCollectionProducts, collectionTitles } from "@/lib/products";

export async function generateStaticParams() {
  return Object.keys(collectionTitles).map((slug) => ({ slug }));
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const items = getCollectionProducts(slug);
  const title = collectionTitles[slug] ?? slug.replace(/-/g, " ");

  return (
    <>
      <CategoryTabs />
      <div
        style={{
          padding: "1rem var(--page-margin) 0.5rem",
          fontSize: "0.6875rem",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          display: "flex",
          alignItems: "baseline",
          gap: "0.5rem",
        }}
      >
        <span>{title}</span>
        <span style={{ opacity: 0.45 }}>[{items.length}]</span>
      </div>
      <ProductGrid items={items} />
      <MoreFeatured />
    </>
  );
}
