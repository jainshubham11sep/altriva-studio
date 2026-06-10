import CollectionContent from "@/components/CollectionContent";
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

  return <CollectionContent items={items} />;
}
