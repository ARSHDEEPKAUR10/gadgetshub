import { Link, useParams } from "react-router-dom";
import { useMemo } from "react";
import { useProducts } from "../hooks/useProducts";
import type { ProductCategory } from "../types/Product";
import GadgetCard from "../components/GadgetCard/GadgetCard";
 
const CATEGORY_MAP: Record<string, ProductCategory> = {
    smartphones: "Smartphone",
    laptops: "Laptop",
    headphones: "Headphones",
    accessories: "Accessories",
};
 
function unslugify(s: string) {
  return s.replace(/-/g, " ");

}
 
export default function BrandProductsPage() {
    const { categorySlug, brandSlug } = useParams<{ categorySlug?: string; brandSlug?: string }>();
    const { listByCategoryAndBrand, sortByPriceAsc } = useProducts();
    const category = useMemo<ProductCategory | null>(() => {
        if (!categorySlug) return null;
        return CATEGORY_MAP[categorySlug.toLowerCase()] ?? null;
    }, [categorySlug]);
    
    const brand = useMemo(() => {
        if (!brandSlug) return "";
        return unslugify(brandSlug);
    }, [brandSlug]);
    
    const items = useMemo(() => {
        if (!category || !brand) return [];
        return sortByPriceAsc(listByCategoryAndBrand(category, brand));
    }, [category, brand, listByCategoryAndBrand, sortByPriceAsc]);
    
    if (!category || !categorySlug || !brandSlug) {
        return (
        <main style={{ padding: 24 }}>
            <h2>Not found</h2>
            <Link to="/explore">← Back to Explore</Link>
            </main>
            );
        }
        
        return (
        <main style={{ padding: 24 }}>
            <Link to={`/explore/${categorySlug}`}>← Back to Brands</Link>
            <h2 style={{ marginTop: 12 }}>
                {category} • {brand.toUpperCase()}
                </h2>

                {items.length === 0 ? (
                    <p>No products found.</p>
                    ) : (
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 16 }}>
                        {items.map((p) => (
                            <GadgetCard
                            key={p.id}
                            id={p.id}
                            name={p.name}
                            brand={p.brand}
                            category={p.category}
                            price={p.price}
                            image={p.image}
                            colors={p.colors}
                            />
                        ))}
                    </div>
                )}
        </main>
    );
}
 