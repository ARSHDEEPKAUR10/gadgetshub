import type { Product, ProductCategory, ProductSpecs } from "../types/product";

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

const isValidCategory = (value: string): value is ProductCategory => {
  return ["Smartphone", "Laptop", "Headphones", "Accessories"].includes(value);
};

export const mapBackendProductToFrontend = (p: BackendProduct): Product => {
  const specs: ProductSpecs = {
    display: p.display ?? undefined,
    chip: p.chip ?? undefined,
    ram: p.ram ?? undefined,
    storage: p.storage ?? undefined,
    battery: p.battery ?? undefined,
    camera: p.camera ?? undefined,
    os: p.os ?? undefined,
    connectivity: p.connectivity ?? undefined,
  };

  return {
    id: p.id,
    name: p.name,
    brand: p.brand,
    category: isValidCategory(p.category) ? p.category : "Accessories",
    price: p.price,
    image: p.image,
    colors: p.colors,
    taglineLines: p.taglineLines,
    specs,
  };
};