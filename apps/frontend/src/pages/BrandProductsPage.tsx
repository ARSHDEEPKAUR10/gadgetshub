import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

type Product = {
  id: number;
  name: string;
  brand: string;
  category: string;
  price: number;
  image: string;
};

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

function unslugifyBrand(slug?: string): string | undefined {
  if (!slug) return undefined;
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export default function BrandProductsPage() {
  const { categorySlug, brandSlug } = useParams<{
    categorySlug?: string;
    brandSlug?: string;
  }>();

  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      const category = slugToCategory(categorySlug);
      const brand = unslugifyBrand(brandSlug);

      if (!category || !brand) {
        setError("Invalid category or brand");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const res = await fetch(
          `http://localhost:3000/api/v1/products/category/${category}/brand/${brand}`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }

        const data: Product[] = await res.json();
        setProducts(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [categorySlug, brandSlug]);

  if (!categorySlug || !brandSlug) {
    return (
      <main style={{ padding: 24 }}>
        <h2>Page not found</h2>
      </main>
    );
  }

  if (loading) {
    return (
      <main style={{ padding: 24 }}>
        <p>Loading...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main style={{ padding: 24 }}>
        <p>{error}</p>
      </main>
    );
  }

  return (
    <main style={{ padding: 24 }}>
      <Link to={`/explore/${categorySlug}`}>← Back to brands</Link>

      <h2 style={{ marginTop: 24, textTransform: "capitalize" }}>
        {brandSlug} {categorySlug}
      </h2>

      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 20,
            marginTop: 20,
          }}
        >
          {products.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              style={{
                textDecoration: "none",
                color: "inherit",
                border: "1px solid #ddd",
                borderRadius: 12,
                padding: 16,
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                style={{
                  width: "100%",
                  height: 180,
                  objectFit: "contain",
                  marginBottom: 12,
                }}
              />
              <h3 style={{ margin: "0 0 8px" }}>{product.name}</h3>
              <p style={{ margin: 0 }}>${product.price}</p>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}