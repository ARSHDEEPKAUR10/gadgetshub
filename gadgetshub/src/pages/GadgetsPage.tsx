import GadgetCard from "../components/GadgetCard/GadgetCard";
import products, { type Product } from "../data/products";

export default function GadgetsPage() {
  return (
    <main style={{ padding: 24 }}>
      <h2>All Gadgets</h2>
      <p>Browse available gadgets.</p>

      {products.map((item: Product) => (
        <div key={item.id} style={{ marginBottom: 12 }}>
          <GadgetCard
            name={item.name}
            brand={item.brand}
            category={item.category}
            price={item.price}
          />
        </div>
      ))}
    </main>
  );
}