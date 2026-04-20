import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import type { Product } from "../types/product";
import type { WishlistItem } from "../types/WishlistItem";
import { useWishlist } from "../hooks/useWishlist";

function categoryToSlug(
  cat: string
): "smartphones" | "laptops" | "headphones" | "accessories" {
  switch (cat.toLowerCase()) {
    case "smartphone":
    case "smartphones":
      return "smartphones";

    case "laptop":
    case "laptops":
      return "laptops";

    case "headphones":
      return "headphones";

    case "accessories":
      return "accessories";

    default:
      return "accessories";
  }
}

function slugify(s: string) {
  return s.toLowerCase().replace(/\s+/g, "-");
}

export default function ProductDetailsPage() {
  const { id } = useParams<{ id?: string }>();
  const { toggle, isWishlisted, message } = useWishlist();

  const [product, setProduct] = useState<Product | undefined>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        setError("");

        if (!id) return;

        const res = await fetch(
          `http://localhost:3000/api/v1/products/${id}`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch product");
        }

        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <main style={{ padding: 24 }}>
        <p>Loading product...</p>
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

  if (!product) {
    return (
      <main style={{ padding: 24 }}>
        <p>Product not found.</p>
        <Link to="/explore">Back</Link>
      </main>
    );
  }

  const specs = product.specs || {};

  const inWishlist = isWishlisted(String(product.id));

  const wishlistItem: WishlistItem = {
    id: String(product.id),
    title: product.name,
    category: categoryToSlug(product.category),
    priceCAD: product.price,
    rating: 4.5,
  };

  const categorySlug = categoryToSlug(product.category);

  return (
    <main style={{ padding: 24, maxWidth: 900, margin: "0 auto" }}>
      <Link to={`/explore/${categorySlug}/${slugify(product.brand)}`}>
        ← Back to {product.brand}
      </Link>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 24,
          marginTop: 16,
        }}
      >
        <div>
          <img
            src={product.image}
            alt={product.name}
            style={{
              width: "100%",
              height: 420,
              objectFit: "contain",
              borderRadius: 16,
              background: "#f5f5f7",
            }}
          />

          <div
            style={{
              display: "flex",
              gap: 10,
              justifyContent: "center",
              marginTop: 12,
            }}
          >
            {product.colors.map((c: string) => (
              <span
                key={c}
                title={c}
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 999,
                  background: c,
                  border: "1px solid #ccc",
                }}
              />
            ))}
          </div>
        </div>

        <div>
          <h1 style={{ marginTop: 0 }}>{product.name}</h1>

          {product.taglineLines.map((t: string, i: number) => (
            <p key={i}>{t}</p>
          ))}

          <h3>From ${product.price}</h3>

          <button onClick={() => toggle(wishlistItem)}>
            {inWishlist ? "Wishlisted" : "Add to Wishlist"}
          </button>

          {message && <p>{message}</p>}

          {(specs.display ||
            specs.chip ||
            specs.ram ||
            specs.storage ||
            specs.battery ||
            specs.camera ||
            specs.os ||
            specs.connectivity) && (
            <>
              <h3>Specifications</h3>
              <ul>
                {specs.display && <li>Display: {specs.display}</li>}
                {specs.chip && <li>Chip: {specs.chip}</li>}
                {specs.ram && <li>RAM: {specs.ram}</li>}
                {specs.storage && <li>Storage: {specs.storage}</li>}
                {specs.battery && <li>Battery: {specs.battery}</li>}
                {specs.camera && <li>Camera: {specs.camera}</li>}
                {specs.os && <li>OS: {specs.os}</li>}
                {specs.connectivity && (
                  <li>Connectivity: {specs.connectivity}</li>
                )}
              </ul>
            </>
          )}
        </div>
      </div>
    </main>
  );
}