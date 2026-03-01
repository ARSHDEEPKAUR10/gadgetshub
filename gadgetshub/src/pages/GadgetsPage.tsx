import GadgetCard from "../components/GadgetCard/GadgetCard";
import products from "../data/products";
import type { Product } from "../types/Product";
 
export default function GadgetsPage() {
  return (
  <main style={{ padding: 24 }}>

    <h2>All Gadgets</h2>
    <p>Browse available gadgets.</p>

    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 16 }}>

      {products.map((item: Product) => ( 
        <GadgetCard
        key={item.id}
        id={item.id}
        name={item.name}
        brand={item.brand}
        category={item.category}
        price={item.price}
        image={item.image}
        colors={item.colors}
        />
        ))}

    </div>
    
  </main>
  );
}
 