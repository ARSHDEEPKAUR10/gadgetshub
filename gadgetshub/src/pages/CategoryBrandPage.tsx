import { Link, useParams } from "react-router-dom";
import products from "../data/products";

type CategorySlug = "smartphones" | "laptops" | "headphones" | "accessories";

const SLUG_TO_CATEGORY: Record<CategorySlug, string> = {
  smartphones: "Smartphone",
  laptops: "Laptop",
  headphones: "Headphones",
  accessories: "Accessories",
};

export default function CategoryBrandsPage() {
  const { categorySlug } = useParams<{ categorySlug: CategorySlug }>();
  const category = categorySlug ? SLUG_TO_CATEGORY[categorySlug] : "";

  const brands = Array.from(
    new Set(
      products
        .filter((p) => p.category === category)
        .map((p) => p.brand)
    )
  ).sort();

  return (
    <main style={{ padding: 24 }}>
      <h2>{category ? `${category} Brands` : "Brands"}</h2>
      {!category ? (
        <p>Category not found.</p>
      ) : (
        <div style={{ display: "grid", gap: 12, maxWidth: 520 }}>
          {brands.map((b) => (
            <Link
              key={b}
              to={`/explore/${categorySlug}/${b.toLowerCase()}`}
              style={{
                padding: 14,
                border: "1px solid #e5e7eb",
                borderRadius: 14,
                textDecoration: "none",
                color: "inherit",
              }}
            >
              {b}
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}