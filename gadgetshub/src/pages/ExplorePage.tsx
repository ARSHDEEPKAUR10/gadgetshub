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
