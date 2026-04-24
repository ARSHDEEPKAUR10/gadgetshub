import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function slugify(s: string) {
  return s.toLowerCase().replace(/\s+/g, "-");
}

function slugToCategory(slug?: string): string | undefined {
  switch (slug) {
    case "smartphones":
      return "Smartphone";
    case "laptops":
      return "Laptop";
    case "headphones":
      return "Headphones";
    case "accessories":
      return "Accessories";
    default:
      return undefined;
  }
}

type BackendProduct = {
  brand: string;
};

export default function CategoryBrandsPage() {
  const { categorySlug } = useParams<{ categorySlug?: string }>();
  const [brands, setBrands] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadBrands = async () => {
      const category = slugToCategory(categorySlug);

      if (!category) {
        setError("Invalid category");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const res = await fetch(
          `http://localhost:3000/api/v1/products/category/${category}`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch brands");
        }

        const data: BackendProduct[] = await res.json();

        const uniqueBrands: string[] = Array.from(
          new Set(data.map((p) => p.brand))
        );

        setBrands(uniqueBrands);
      } catch (err) {
        console.error(err);
        setError("Failed to load brands");
      } finally {
        setLoading(false);
      }
    };

    loadBrands();
  }, [categorySlug]);

  if (!categorySlug) {
    return (
      <main style={{ padding: 24 }}>
        <h2>Category not found</h2>
        <p>Try: /explore/smartphones</p>
      </main>
    );
  }

  if (loading) {
    return (
      <main style={{ padding: 24 }}>
        <h2 style={{ textTransform: "capitalize" }}>{categorySlug} Brands</h2>
        <p>Loading...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main style={{ padding: 24 }}>
        <h2 style={{ textTransform: "capitalize" }}>{categorySlug} Brands</h2>
        <p>{error}</p>
      </main>
    );
  }

  return (
    <main style={{ padding: 24 }}>
      <h2 style={{ textTransform: "capitalize" }}>
        {categorySlug} Brands
      </h2>
      <p>Pick a brand:</p>

      <div
        style={{
          display: "flex",
          gap: 14,
          flexWrap: "wrap",
          marginTop: 12,
        }}
      >
        {brands.map((brand) => (
          <Link
            key={brand}
            to={`/explore/${categorySlug}/${slugify(brand)}`}
            style={{
              padding: "10px 14px",
              border: "1px solid #ddd",
              borderRadius: 999,
              textDecoration: "none",
            }}
          >
            {brand}
          </Link>
        ))}
      </div>
    </main>
  );
}