<<<<<<< HEAD
import type { Product, ProductCategory } from "../types/Product";
=======
import type { Product, ProductCategory } from "../types/product";
>>>>>>> origin/main
import { mapBackendProductToFrontend } from "./productMapper";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type BackendProduct = {
  id: number;
  name: string;
  brand: string;
  category: string;
  price: number;
  image: string;
  colors: string[];
  taglineLines: string[];
  display?: string | null;
  chip?: string | null;
  ram?: string | null;
  storage?: string | null;
  battery?: string | null;
  camera?: string | null;
  os?: string | null;
  connectivity?: string | null;
};

<<<<<<< HEAD
type BackendProductPayload = {
  id: number;
  name: string;
  brand: string;
  category: ProductCategory;
  price: number;
  image: string;
  colors: string[];
  taglineLines: string[];
  display?: string;
  chip?: string;
  ram?: string;
  storage?: string;
  battery?: string;
  camera?: string;
  os?: string;
  connectivity?: string;
};

=======
>>>>>>> origin/main
export class ProductService {
  async listAll(): Promise<Product[]> {
    const res = await fetch(`${API_BASE_URL}/api/v1/products`);
    if (!res.ok) throw new Error("Failed to fetch products");

    const data: BackendProduct[] = await res.json();
    return data.map(mapBackendProductToFrontend);
  }

  async getById(id: number): Promise<Product | undefined> {
    const res = await fetch(`${API_BASE_URL}/api/v1/products/${id}`);
    if (res.status === 404) return undefined;
    if (!res.ok) throw new Error("Failed to fetch product");

    const data: BackendProduct = await res.json();
    return mapBackendProductToFrontend(data);
  }

  async listBrandsByCategory(category: ProductCategory): Promise<string[]> {
    const res = await fetch(
      `${API_BASE_URL}/api/v1/products/category/${encodeURIComponent(category)}`
    );
    if (!res.ok) throw new Error("Failed to fetch brands");

    const data: BackendProduct[] = await res.json();
    const items: Product[] = data.map(mapBackendProductToFrontend);
    const unique: string[] = Array.from(
      new Set(items.map((p: Product) => p.brand))
    );

    return unique.sort((a: string, b: string) => a.localeCompare(b));
  }

  async listByCategoryAndBrand(
    category: ProductCategory,
    brand: string
  ): Promise<Product[]> {
    const res = await fetch(
      `${API_BASE_URL}/api/v1/products/category/${encodeURIComponent(
        category
      )}/brand/${encodeURIComponent(brand)}`
    );
    if (!res.ok) throw new Error("Failed to fetch products by brand");

    const data: BackendProduct[] = await res.json();
    return data.map(mapBackendProductToFrontend);
  }

<<<<<<< HEAD
  async create(product: BackendProductPayload): Promise<Product> {
    const res = await fetch(`${API_BASE_URL}/api/v1/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(product)
    });

    if (!res.ok) {
      throw new Error("Failed to create product");
    }

    const data: BackendProduct = await res.json();
    return mapBackendProductToFrontend(data);
  }

  async update(
    id: number,
    product: Partial<BackendProductPayload>
  ): Promise<Product> {
    const res = await fetch(`${API_BASE_URL}/api/v1/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(product)
    });

    if (!res.ok) {
      throw new Error("Failed to update product");
    }

    const data: BackendProduct = await res.json();
    return mapBackendProductToFrontend(data);
  }

  async delete(id: number): Promise<void> {
    const res = await fetch(`${API_BASE_URL}/api/v1/products/${id}`, {
      method: "DELETE"
    });

    if (!res.ok) {
      throw new Error("Failed to delete product");
    }
  }

=======
>>>>>>> origin/main
  sortByPriceAsc(items: Product[]): Product[] {
    return [...items].sort((a, b) => a.price - b.price);
  }
}