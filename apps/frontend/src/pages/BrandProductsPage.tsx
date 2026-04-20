import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import type { Product } from "../types/product";
import GadgetCard from "../components/GadgetCard/GadgetCard";

export default function BrandProductsPage() {
  const { categorySlug, brandSlug } = useParams<{
    categorySlug?: string;
    brandSlug?: string;
  }>();

  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      if (!categorySlug || !brandSlug) return;

      try {
        setError("");

        const res = await fetch(
          `http://localhost:3000/api/v1/products/category/${categorySlug}/brand/${brandSlug}`
        );

        const data = await res.json();

        setProducts(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load products");
      }
    };

    loadProducts();
  }, [categorySlug, brandSlug]);

  if (!categorySlug) {
    return (
      <main style={{ padding: 24 }}>
        <h2>Category not found</h2>
        <Link to="/explore">Go back</Link>
      </main>
    );
  }

  if (error) {
    return (
      <main style={{ padding: 24 }}>
        <Link to={`/explore/${categorySlug}`}>← Back to brands</Link>
        <h2 style={{ margin: "16px 0", textTransform: "capitalize" }}>
          {brandSlug} {categorySlug}
        </h2>
        <p>{error}</p>
      </main>
    );
  }

  return (
    <main style={{ padding: 24 }}>
      <Link to={`/explore/${categorySlug}`}>← Back to brands</Link>

      <h2 style={{ margin: "16px 0", textTransform: "capitalize" }}>
        {brandSlug} {categorySlug}
      </h2>

      {products.length === 0 ? (
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
          {products.map((p) => (
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