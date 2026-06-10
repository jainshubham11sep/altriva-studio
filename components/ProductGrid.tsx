import ProductCard from "./ProductCard";
import { products as allProducts, type Product } from "@/lib/products";

interface Props {
  items?: Product[];
}

export default function ProductGrid({ items }: Props) {
  const products = items ?? allProducts;

  return (
    <section style={{ paddingBottom: "5rem" }}>
      <style>{`
        .product-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.375rem;
          row-gap: 2.5rem;
        }
        @media (min-width: 768px) {
          .product-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 0.75rem;
            row-gap: 3rem;
            padding: 0 var(--page-margin);
          }
        }
        @media (min-width: 1024px) {
          .product-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 0.75rem;
            row-gap: 3rem;
          }
        }
      `}</style>

      <div className="product-grid">
        {products.map((product, i) => (
          <ProductCard key={product.id} product={product} index={i} />
        ))}
      </div>
    </section>
  );
}
