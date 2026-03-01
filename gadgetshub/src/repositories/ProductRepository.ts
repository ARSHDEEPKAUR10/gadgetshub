import products from "../data/products";

import type { Product, ProductCategory } from "../types/Product";

export class ProductRepository {

    getAll(): Product[] {
        return products;
    }
    
    getById(id: number): Product | undefined {
        return products.find((p) => p.id === id);
    }
    
    getByCategory(category: ProductCategory): Product[] {
        return products.filter((p) => p.category === category);
    }
    
    getByCategoryAndBrand(category: ProductCategory, brand: string): Product[] {
        const b = brand.trim().toLowerCase();
        return products.filter(
            (p) => p.category === category && p.brand.toLowerCase() === b
        );
    }
    
    create(_product: Product) {}
    update(_product: Product) {}
    delete(_id: number) {}

}
 