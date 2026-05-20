import ProductCard from "./ProductCard";
import { products as allProducts, type Product } from "@/lib/products";

interface Props {
  items?: Product[];
}

export default function ProductGrid({ items }: Props) {
  const products = items ?? allProducts;

  return (
    <section
      className="product-section-mobile"
      style={{
        padding: "1rem var(--page-margin) 4rem",
      }}
    >
      <style>{`
        .product-flex-grid {
          column-gap: 0.375rem;
          row-gap: 3rem;
        }
        @media (min-width: 1024px) {
          .card-portrait { width: calc(26.23% - 0.375rem * 2 / 3); }
          .card-square   { width: calc(32.79% - 0.375rem * 2 / 3); }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .card-portrait { width: calc(26.23% - 0.375rem * 2 / 3); }
          .card-square   { width: calc(32.79% - 0.375rem * 2 / 3); }
        }
        @media (max-width: 767px) {
          .product-section-mobile {
            padding-left: 0;
            padding-right: 0;
          }
          .product-flex-grid {
            column-gap: 0.1875rem;
            row-gap: 1.5rem;
          }
          .card-portrait, .card-square { width: calc(50% - 0.09375rem); }
        }
      `}</style>

      <div className="product-flex-grid flex flex-wrap">
        {products.map((product, i) => (
          <div
            key={product.id}
            className={product.aspect === "portrait" ? "card-portrait" : "card-square"}
          >
            <ProductCard product={product} index={i} />
          </div>
        ))}
      </div>
    </section>
  );
}
