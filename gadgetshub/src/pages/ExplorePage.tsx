import { Link, useParams } from "react-router-dom";
import { useMemo } from "react";
import GadgetCard from "../components/GadgetCard/GadgetCard";
import products, { type Product } from "../data/products";

const CATEGORY_MAP: Record<string, Product["category"]> = {
  smartphones: "Smartphone",
  laptops: "Laptop",
  headphones: "Headphones",
  Accessories: "Accessories",
};

export default function ExplorePage() {
  const { categoryName } = useParams<{ categoryName?: string }>();

  const category = useMemo<Product["category"] | "">(() => {
    if (!categoryName) return "";
    return CATEGORY_MAP[categoryName.toLowerCase()] ?? "";
  }, [categoryName]);

  const filteredProducts = useMemo(() => {
    if (!category) return products;
    return products.filter((p) => p.category === category);
  }, [category]);

  return (
    <main style={{ padding: "24px" }}>
      <h2>{category ? `${category} Products` : "All Gadgets"}</h2>

      <nav style={{ marginBottom: "16px" }}>
        <Link to="/explore">All</Link> |{" "}
        <Link to="/explore/smartphones">Smartphones</Link> |{" "}
        <Link to="/explore/laptops">Laptops</Link> |{" "}
        <Link to="/explore/headphones">Headphones</Link> |{" "}
        <Link to="/explore/accessories">Accessories</Link>
      </nav>

      {filteredProducts.length === 0 ? (
        <p>No products found.</p>
      ) : (
        filteredProducts.map((product) => (
          <GadgetCard
            key={product.id}
            name={product.name}
            brand={product.brand}
            category={product.category}
            price={product.price}
          />
        ))
      )}
    </main>
  );
}
