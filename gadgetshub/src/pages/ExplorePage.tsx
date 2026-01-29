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