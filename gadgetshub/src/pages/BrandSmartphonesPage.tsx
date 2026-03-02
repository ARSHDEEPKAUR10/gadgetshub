import { Link, useParams } from "react-router-dom";
import { useMemo } from "react";

import products, { type ProductCategory } from "../data/products";

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
  const { categorySlug, brandSlug } = useParams<{
    categorySlug?: string;
    brandSlug?: string;
  }>();

  const category = useMemo<ProductCategory | null>(() => {
    if (!categorySlug) return null;
    return CATEGORY_MAP[categorySlug.toLowerCase()] ?? null;
  }, [categorySlug]);

  const brandSlugNormalized = useMemo(() => {
    if (!brandSlug) return "";
    return brandSlug.toLowerCase();
  }, [brandSlug]);

  const filtered = useMemo(() => {
    if (!category || !brandSlugNormalized) return [];
    return products.filter(
      (p) => p.category === category && slugify(p.brand) === brandSlugNormalized
    );
  }, [category, brandSlugNormalized]);

  if (!category || !categorySlug) {
    return (
      <main style={{ padding: 24 }}>
        <h2>Category not found.</h2>
        <Link to="/explore/smartphones">Go to Smartphones</Link>
      </main>
    );
  }

  return (
    <main style={{ padding: 24 }}>
      <Link to={`/explore/${categorySlug}`}>← Back to brands</Link>

      <h2 style={{ marginTop: 16 }}>
        {(brandSlug ?? "Brand")} {category} Products
      </h2>

      {filtered.length === 0 ? (
        <p>No products found for this brand.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 16,
            marginTop: 16,
          }}
        >
          {filtered.map((p) => (
            <Link
              key={p.id}
              to={`/product/${p.id}`}
              style={{
                textDecoration: "none",
                color: "inherit",
                border: "1px solid #ddd",
                borderRadius: 16,
                padding: 16,
              }}
            >
              <div
                style={{
                  height: 200,
                  background: "#f5f5f7",
                  borderRadius: 14,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                <img
                  src={p.image}
                  alt={p.name}
                  style={{ width: "100%", height: "100%", objectFit: "contain" }}
                />
              </div>

              <h3 style={{ margin: "12px 0 6px" }}>{p.name}</h3>
              <p style={{ margin: 0, opacity: 0.8 }}>{p.brand}</p>
              <p style={{ margin: "10px 0 0", fontWeight: 600 }}>
                From ${p.price}
              </p>

              <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                {(p.colors ?? []).slice(0, 5).map((c: string) => (
                  <span
                    key={c}
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: 999,
                      background: c,
                      border: "1px solid #ccc",
                    }}
                  />
                ))}
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}