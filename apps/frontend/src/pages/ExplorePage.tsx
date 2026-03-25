import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ProductService } from "../services/ProductService";
import type { Product } from "../types/product";

import smartphonesImg from "../assets/smartphones.jpg";
import laptopsImg from "../assets/laptops.jpg";
import headphonesImg from "../assets/headphones.jpg";
import accessoriesImg from "../assets/accessories.jpg";

const service = new ProductService();

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
  const [featured, setFeatured] = useState<Product[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadFeatured = async () => {
      try {
        setError("");
        const data = await service.listAll();
        setFeatured(data.slice(0, 8));
      } catch {
        setError("Failed to load featured products");
      }
    };

    loadFeatured();
  }, []);

  return (
    <main style={{ padding: 24, maxWidth: 1100, margin: "0 auto" }}>
      <h2>Explore</h2>

      <section>
        <h3>Categories</h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 16,
          }}
        >
          {CATEGORIES.map((c) => (
            <Link key={c.slug} to={`/explore/${c.slug}`}>
              <img src={c.image} alt={c.title} style={{ width: "100%" }} />
              <h4>{c.title}</h4>
              <p>{c.subtitle}</p>
            </Link>
          ))}
        </div>
      </section>

      <section style={{ marginTop: 20 }}>
        <h3>Featured Gadgets</h3>

        {error && <p>{error}</p>}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 16,
          }}
        >
          {featured.map((p) => (
            <Link key={p.id} to={`/product/${p.id}`}>
              <img src={p.image} alt={p.name} style={{ width: "100%" }} />
              <h4>{p.name}</h4>
              <p>{p.brand}</p>
              <p>${p.price}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}