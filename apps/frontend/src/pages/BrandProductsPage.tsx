import { Link, useParams } from "react-router-dom";
import { useMemo } from "react";

import products, { type ProductCategory } from "../data/products";
import GadgetCard from "../components/GadgetCard/GadgetCard";

const CATEGORY_MAP: Record<string, ProductCategory> = {
  smartphones: "Smartphone",
  laptops: "Laptop",
  headphones: "Headphones",
  accessories: "Accessories",
};

function slugify(s: string) {
  return s.toLowerCase().replace(/\s+/g, "-");
}

export default function BrandProductsPage() {
  const { categorySlug, brandSlug } = useParams();

  const category = useMemo<ProductCategory | null>(() => {
    if (!categorySlug) return null;
    return CATEGORY_MAP[categorySlug.toLowerCase()] ?? null;
  }, [categorySlug]);

  const filtered = useMemo(() => {
    if (!category || !brandSlug) return [];
    return products.filter(
      (p) => p.category === category && slugify(p.brand) === brandSlug
    );
  }, [category, brandSlug]);

  if (!category) {
    return (
      <main style={{ padding: 24 }}>
        <h2>Category not found</h2>
        <Link to="/explore">Go back</Link>
      </main>
    );
  }

  return (
    <main style={{ padding: 24 }}>
      <Link to={`/explore/${categorySlug}`}>← Back to brands</Link>

      <h2 style={{ margin: "16px 0" }}>
        {brandSlug?.toUpperCase()} {category}
      </h2>

      {filtered.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: 20,
            marginTop: 20,
          }}
        >
          {filtered.map((p) => (
            <GadgetCard
              key={p.id}
              id={p.id}
              name={p.name}
              brand={p.brand}
              category={p.category}
              price={p.price}
              image={p.image}
              colors={p.colors}
            />
          ))}
        </section>
      )}
    </main>
  );
}