import { Link, useParams } from "react-router-dom";
import products from "../data/products";
import GadgetCard from "../components/GadgetCard/GadgetCard";

type CategorySlug = "smartphones" | "laptops" | "headphones" | "accessories";

const SLUG_TO_CATEGORY: Record<CategorySlug, string> = {
  smartphones: "Smartphone",
  laptops: "Laptop",
  headphones: "Headphones",
  accessories: "Accessories",
};

export default function BrandProductsPage() {
  const { categorySlug, brandSlug } = useParams<{
    categorySlug: CategorySlug;
    brandSlug: string;
  }>();

  const category = categorySlug ? SLUG_TO_CATEGORY[categorySlug] : "";
  const brand = (brandSlug ?? "").toLowerCase();

  const items = products.filter(
    (p) => p.category === category && p.brand.toLowerCase() === brand
  );

  return (
    <main style={{ padding: 24 }}>
      <Link to={`/explore/${categorySlug}`}>← Back to brands</Link>
      <h2 style={{ marginTop: 12 }}>
        {items[0]?.brand ?? "Brand"} {category ? `(${category})` : ""}
      </h2>

      {items.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div style={{ display: "grid", gap: 14 }}>
          {items.map((p) => (
            <Link
              key={p.id}
              to={`/product/${p.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <GadgetCard
                name={p.name}
                brand={p.brand}
                category={p.category}
                price={p.price}
                image={p.image}
                colors={p.colors}
              />
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}