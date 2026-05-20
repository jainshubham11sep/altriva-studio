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
          padding: "1.25rem var(--page-margin) 0.75rem",
          display: "flex",
          alignItems: "baseline",
          gap: "0.5rem",
        }}
      >
        <span style={{ fontSize: "0.5625rem", letterSpacing: "0.12em", textTransform: "uppercase" }}>{title}</span>
        <span style={{ fontSize: "0.5625rem", letterSpacing: "0.06em", opacity: 0.4 }}>[ {items.length} ]</span>
      </div>
      <ProductGrid items={items} />
      <MoreFeatured />
    </>
  );
}
