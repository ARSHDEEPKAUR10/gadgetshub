import { Link, useParams } from "react-router-dom";
import { useMemo } from "react";
import products from "../data/products";
import type { ProductCategory } from "../types/Product";
 
const CATEGORY_MAP: Record<string, ProductCategory> = {
  smartphones: "Smartphone",
  laptops: "Laptop",
  headphones: "Headphones",
  accessories: "Accessories",
};
 
function slugify(s: string) {
  return s.toLowerCase().replace(/\s+/g, "-");
}
 
export default function CategoryBrandsPage() {
  const { categorySlug } = useParams<{ categorySlug?: string }>();
 
  const category = useMemo<ProductCategory | null>(() => {
    if (!categorySlug) return null;
    return CATEGORY_MAP[categorySlug.toLowerCase()] ?? null;
  }, [categorySlug]);
 
  const brands = useMemo(() => {
    if (!category) return [];
    return Array.from(
      new Set(products.filter((p) => p.category === category).map((p) => p.brand))
    );
  }, [category]);
 
  if (!category || !categorySlug) {
    return (
      <main style={{ padding: 24 }}>
        <h2>Category not found</h2>
        <p>Try: /explore/smartphones</p>
      </main>
    );
  }
 
  return (
    <main style={{ padding: 24 }}>
      <h2>{category} Brands</h2>
      <p>Pick a brand:</p>
 
      <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 12 }}>
        {brands.map((b) => (
          <Link
            key={b}
            to={`/explore/${categorySlug}/${slugify(b)}`}
            style={{
              padding: "10px 14px",
              border: "1px solid #ddd",
              borderRadius: 999,
              textDecoration: "none",
            }}
          >
            {b}
          </Link>
        ))}
      </div>
    </main>
  );
}
 