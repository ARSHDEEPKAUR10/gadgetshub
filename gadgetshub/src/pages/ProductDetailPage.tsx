import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";

import products from "../data/products";
import type { ProductCategory } from "../types/Product";

import type { WishlistItem } from "../types/WishlistItem";
import { useWishlist } from "../hooks/useWishlist";

function categoryToSlug(cat: ProductCategory): WishlistItem["category"] {
  switch (cat) {
    case "Smartphone":
      return "smartphones";
    case "Laptop":
      return "laptops";
    case "Headphones":
      return "headphones";
    case "Accessories":
      return "accessories";
  }
}

function slugify(s: string) {
  return s.toLowerCase().replace(/\s+/g, "-");
}

export default function ProductDetailsPage() {
  const { id } = useParams<{ id?: string }>();
  const { toggle, isWishlisted, message } = useWishlist();

  const product = useMemo(() => {
    const pid = Number(id);
    return products.find((p) => p.id === pid);
  }, [id]);

  if (!product) {
    return (
      <main className="page_container">
        <p>Product not found.</p>
        <Link to="/explore">Back to Explore</Link>
      </main>
    );
  }

  const inWishlist = isWishlisted(String(product.id));

  const wishlistItem: WishlistItem = {
    id: String(product.id),
    title: product.name,
    category: categoryToSlug(product.category),
    priceCAD: product.price,
    rating: 4.5,
  };

  return (
    <main className="page_container" style={{ maxWidth: 900 }}>
      <Link to={`/explore/${categoryToSlug(product.category)}/${slugify(product.brand)}`}>
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

          <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 12 }}>
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
            <p key={i} style={{ margin: "6px 0" }}>
              {t}
            </p>
          ))}

          <h3 style={{ marginTop: 18 }}>From ${product.price}</h3>

          <button
            onClick={() => toggle(wishlistItem)}
            style={{
              marginTop: 12,
              padding: "10px 14px",
              borderRadius: 10,
              border: "1px solid #ddd",
              cursor: "pointer",
            }}
          >
            {inWishlist ? "★ Wishlisted" : "☆ Add to Wishlist"}
          </button>

          {message && <p style={{ marginTop: 10 }}>{message}</p>}

          {product.specs && (
            <>
              <h3 style={{ marginTop: 18 }}>Specifications</h3>
              <ul>
                {product.specs.display && (
                  <li>
                    <strong>Display:</strong> {product.specs.display}
                  </li>
                )}
                {product.specs.chip && (
                  <li>
                    <strong>Chip:</strong> {product.specs.chip}
                  </li>
                )}
                {product.specs.ram && (
                  <li>
                    <strong>RAM:</strong> {product.specs.ram}
                  </li>
                )}
                {product.specs.storage && (
                  <li>
                    <strong>Storage:</strong> {product.specs.storage}
                  </li>
                )}
                {product.specs.battery && (
                  <li>
                    <strong>Battery:</strong> {product.specs.battery}
                  </li>
                )}
                {product.specs.camera && (
                  <li>
                    <strong>Camera:</strong> {product.specs.camera}
                  </li>
                )}
                {product.specs.os && (
                  <li>
                    <strong>OS:</strong> {product.specs.os}
                  </li>
                )}
                {product.specs.connectivity && (
                  <li>
                    <strong>Connectivity:</strong> {product.specs.connectivity}
                  </li>
                )}
              </ul>
            </>
          )}
        </div>
      </div>
    </main>
  );
}