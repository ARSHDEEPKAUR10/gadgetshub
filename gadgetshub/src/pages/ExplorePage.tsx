<<<<<<< HEAD
import { Link, useParams } from "react-router-dom";
import { containerStyle } from "../styles/Utilities";

type Product = {
  id: number;
  name: string;
  category: string;
};

const products: Product[] = [
  { id: 1, name: "iPhone 15", category: "Smartphone" },
  { id: 2, name: "Samsung Galaxy S24", category: "Smartphone" },
  { id: 3, name: "MacBook Pro", category: "Laptop" },
  { id: 4, name: "Dell XPS 13", category: "Laptop" },
  { id: 5, name: "Sony WH-1000XM5", category: "Headphones" },
];

const CATEGORY_MAP: Record<string, string> = {
  smartphones: "Smartphone",
  laptops: "Laptop",
  headphones: "Headphones",
};

export default function ExplorePage() {
  const { categoryName } = useParams<{ categoryName?: string }>();

  const normalizedCategory = categoryName
    ? CATEGORY_MAP[categoryName.toLowerCase()] ?? categoryName
    : "";

  const filteredProducts = normalizedCategory
    ? products.filter((p) => p.category === normalizedCategory)
    : products;

  return (
    <main style={containerStyle}>
      <h2>
        {normalizedCategory
          ? `${normalizedCategory} Products`
          : "Explore Products"}
      </h2>

      <p style={{ marginTop: "6px" }}>
        {normalizedCategory ? (
          <>
            Showing category: <b>{normalizedCategory}</b> •{" "}
            <Link to="/explore">View All</Link>
          </>
        ) : (
          "Browse all gadgets by category."
        )}
      </p>

      <hr style={{ margin: "16px 0" }} />

      {filteredProducts.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <ul>
          {filteredProducts.map((product) => (
            <li key={product.id}>
              {product.name} ({product.category})
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
=======
import { useParams, Link } from "react-router-dom";
import { useMemo } from "react";
import GadgetCard from "../components/GadgetCard/GadgetCard";
import { products } from "../data/products";
 
export default function ExplorePage() {
  const { categoryName } = useParams<{ categoryName?: string }>();

  const category = useMemo(() => {
    if (!categoryName) return "";
    if (categoryName === "smartphones") return "Smartphone";
    if (categoryName === "laptops") return "Laptop";
    if (categoryName === "headphones") return "Headphones";
    return "";

  }, [categoryName]);

  const filteredProducts = useMemo(() => {
    if (!category) return products;
    return products.filter((p) => p.category === category);
  }, [category]);

  return (
    <main style={{ padding: 24 }}>
      <h2>{category ? `${category} Products` : "All Gadgets"}</h2>
      <div style={{ marginBottom: 12 }}>
        <Link to="/explore/smartphones">Smartphones</Link> |{" "}
        <Link to="/explore/laptops">Laptops</Link> |{" "}
        <Link to="/explore/headphones">Headphones</Link>
      </div>
 
      {filteredProducts.length === 0 && <p>No products found.</p>}
 
      {filteredProducts.map((product) => (
        <GadgetCard
          key={product.id}
          name={product.name}
          brand={product.brand}
          category={product.category}
          price={product.price}
        />
      ))}
    </main>
  );
}
>>>>>>> 798b2e8e638470ed3c2197c03fdfb839007b2bea
