import { useMemo } from "react";
import type { Product, ProductCategory } from "../types/Product";
import { ProductRepository } from "../repositories/ProductRepository";
import { ProductService } from "../services/ProductService";
 
const repo = new ProductRepository();
const service = new ProductService(repo);

export function useProducts() {
    const all = useMemo(() => service.listAll(), []);
    function getById(id: number): Product | undefined {
        return service.getById(id);
    }
    
    function listBrandsByCategory(category: ProductCategory): string[] {
        return service.listBrandsByCategory(category);
    }
    
    function listByCategoryAndBrand(category: ProductCategory, brand: string): Product[] {
        return service.listByCategoryAndBrand(category, brand);
    }
    
    function sortByPriceAsc(items: Product[]): Product[] {
        return service.sortByPriceAsc(items);
    }
    
    return { all, getById, listBrandsByCategory, listByCategoryAndBrand, sortByPriceAsc };
}
 