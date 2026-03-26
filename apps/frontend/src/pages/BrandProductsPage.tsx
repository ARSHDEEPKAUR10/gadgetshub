import { Link, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

import type { Product, ProductCategory } from "../types/Product";
import { ProductService } from "../services/ProductService";
import GadgetCard from "../components/GadgetCard/GadgetCard";

const CATEGORY_MAP: Record<string, ProductCategory> = {
  smartphones: "Smartphone",
  laptops: "Laptop",
  headphones: "Headphones",
  accessories: "Accessories",
};

const productService = new ProductService();

export default function BrandProductsPage() {
  const { categorySlug, brandSlug } = useParams<{
    categorySlug?: string;
    brandSlug?: string;
  }>();

  const [filtered, setFiltered] = useState<Product[]>([]);
  const [error, setError] = useState("");

  const category = useMemo<ProductCategory | null>(() => {
    if (!categorySlug) return null;
    return CATEGORY_MAP[categorySlug.toLowerCase()] ?? null;
  }, [categorySlug]);

  useEffect(() => {
    const loadProducts = async () => {
      if (!category || !brandSlug) return;

      try {
        setError("");
        const data = await productService.listByCategoryAndBrand(
          category,
          brandSlug
        );
        setFiltered(data);
      } catch {
        setError("Failed to load products");
      }
    };

    loadProducts();
  }, [category, brandSlug]);

  if (!category) {
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
        <h2 style={{ margin: "16px 0" }}>
          {brandSlug?.toUpperCase()} {category}
        </h2>
        <p>{error}</p>
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