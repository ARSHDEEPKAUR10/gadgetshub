import type { Product, ProductCategory } from "../types/Product";
import { ProductRepository } from "../repositories/ProductRepository";

export class ProductService {
  private repo: ProductRepository;
  constructor(repo: ProductRepository) {
    this.repo = repo;
  }
 
  listAll(): Product[] {
    return this.repo.getAll();
  }
 
  getById(id: number): Product | undefined {
    return this.repo.getById(id);
  }
 
  listBrandsByCategory(category: ProductCategory): string[] {
    const items = this.repo.getByCategory(category);
    const unique = Array.from(new Set(items.map((p) => p.brand)));
    return unique.sort((a, b) => a.localeCompare(b));
  }
 
  listByCategoryAndBrand(category: ProductCategory, brand: string): Product[] {
    return this.repo.getByCategoryAndBrand(category, brand);
  }
 
  sortByPriceAsc(items: Product[]): Product[] {
    return [...items].sort((a, b) => a.price - b.price);
  }

}
 