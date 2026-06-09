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
        padding: "0 var(--page-margin) 5rem",
      }}
    >
      <style>{`
        .product-flex-grid {
          column-gap: 0.75rem;
          row-gap: 3rem;
        }
        @media (min-width: 1024px) {
          .card-portrait, .card-square { width: calc(25% - 0.5625rem); }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .card-portrait, .card-square { width: calc(33.333% - 0.5rem); }
        }
        @media (max-width: 767px) {
          .product-section-mobile {
            padding-left: 0;
            padding-right: 0;
          }
          .product-flex-grid {
            column-gap: 0.375rem;
            row-gap: 2.5rem;
          }
          .card-portrait, .card-square { width: calc(50% - 0.1875rem); }
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
