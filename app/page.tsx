import CategoryTabs from "@/components/CategoryTabs";
import ProductGrid from "@/components/ProductGrid";
import MoreFeatured from "@/components/MoreFeatured";

export default function HomePage() {
  return (
    <>
      <CategoryTabs />
      <ProductGrid />
      <MoreFeatured />
    </>
  );
}
