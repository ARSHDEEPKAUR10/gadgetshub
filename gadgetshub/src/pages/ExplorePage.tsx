import { Link } from "react-router-dom";
import { useMemo } from "react";
import products from "../data/products";

import smartphonesImg from "../assets/smartphones.jpg";
import laptopsImg from "../assets/laptops.jpg";
import headphonesImg from "../assets/headphones.jpg";
import accessoriesImg from "../assets/accessories.jpg";

type CategoryCard = {
  title: string;
  slug: "smartphones" | "laptops" | "headphones" | "accessories";
  subtitle: string;
  image: string;
};

const CATEGORIES: CategoryCard[] = [
  {
    title: "Smartphones",
    slug: "smartphones",
    subtitle: "Apple, Samsung & more",
    image: smartphonesImg,
  },
  {
    title: "Laptops",
    slug: "laptops",
    subtitle: "Work, gaming, and study",
    image: laptopsImg,
  },
  {
    title: "Headphones",
    slug: "headphones",
    subtitle: "Wireless, ANC, best sound",
    image: headphonesImg,
  },
  {
    title: "Accessories",
    slug: "accessories",
    subtitle: "Chargers, cases, more",
    image: accessoriesImg,
  },
];

export default function ExplorePage() {
  const featured = useMemo(() => products.slice(0, 8), []);

  return (
    <main style={{ padding: 24, maxWidth: 1100, margin: "0 auto" }}>
      <h2 style={{ marginTop: 0 }}>Explore</h2>
      <p style={{ marginTop: 6, opacity: 0.8 }}>
        <b>Pick a category or check out featured gadgets.</b>
      </p>

      <section style={{ marginTop: 18 }}>
        <h3 style={{ marginBottom: 12 }}>Categories</h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 16,
          }}
        >
          {CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              to={`/explore/${c.slug}`}
              style={{
                textDecoration: "none",
                color: "inherit",
                border: "1px solid #e5e7eb",
                borderRadius: 18,
                padding: 16,
              }}
            >
              <div
                style={{
                  height: 130,
                  borderRadius: 14,
                  overflow: "hidden",
                  background: "#f5f5f7",
                  marginBottom: 12,
                }}
              >
                <img
                  src={c.image}
                  alt={c.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </div>

              <h4 style={{ margin: "8px 0 4px" }}>{c.title}</h4>
              <p style={{ margin: 0, opacity: 0.75 }}>{c.subtitle}</p>
            </Link>
          ))}
        </div>
      </section>

      <section style={{ marginTop: 28 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            gap: 12,
          }}
        >
          <h3 style={{ marginBottom: 12 }}>Featured Gadgets</h3>

          <Link to="/explore/smartphones" style={{ textDecoration: "none" }}>
            View phone brands →
          </Link>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 16,
          }}
        >
          {featured.map((p) => (
            <Link
              key={p.id}
              to={`/product/${p.id}`}
              style={{
                textDecoration: "none",
                color: "inherit",
                border: "1px solid #e5e7eb",
                borderRadius: 18,
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
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              </div>

              <h4 style={{ margin: "12px 0 6px" }}>{p.name}</h4>
              <p style={{ margin: 0, opacity: 0.75 }}>
                {p.brand} • {p.category}
              </p>
              <p style={{ margin: "10px 0 0", fontWeight: 600 }}>
                From ${p.price}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}