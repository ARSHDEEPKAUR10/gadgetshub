import { Link, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import type { ProductCategory } from "../types/Product";
import { ProductService } from "../services/ProductService";

const CATEGORY_MAP: Record<string, ProductCategory> = {
  smartphones: "Smartphone",
  laptops: "Laptop",
  headphones: "Headphones",
  accessories: "Accessories",
};

function slugify(s: string) {
  return s.toLowerCase().replace(/\s+/g, "-");
}

const productService = new ProductService();

export default function CategoryBrandsPage() {
  const { categorySlug } = useParams<{ categorySlug?: string }>();
  const [brands, setBrands] = useState<string[]>([]);
  const [error, setError] = useState("");

  const category = useMemo<ProductCategory | null>(() => {
    if (!categorySlug) return null;
    return CATEGORY_MAP[categorySlug.toLowerCase()] ?? null;
  }, [categorySlug]);

  useEffect(() => {
    const loadBrands = async () => {
      if (!category) return;

      try {
        setError("");
        const data = await productService.listBrandsByCategory(category);
        setBrands(data);
      } catch {
        setError("Failed to load brands");
      }
    };

    loadBrands();
  }, [category]);

  if (!category || !categorySlug) {
    return (
      <main style={{ padding: 24 }}>
        <h2>Category not found</h2>
        <p>Try: /explore/smartphones</p>
      </main>
    );
  }

  if (error) {
    return (
      <main style={{ padding: 24 }}>
        <h2>{category} Brands</h2>
        <p>{error}</p>
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