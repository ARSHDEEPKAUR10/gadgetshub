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
  specs?: {
    display?: string | null;
    chip?: string | null;
    ram?: string | null;
    storage?: string | null;
    battery?: string | null;
    camera?: string | null;
    os?: string | null;
    connectivity?: string | null;
  };
};

const mapCategory = (value: string): ProductCategory => {
  switch (value.toLowerCase()) {
    case "smartphones":
      return "Smartphone";
    case "laptops":
      return "Laptop";
    case "headphones":
      return "Headphones";
    default:
      return "Accessories";
  }
};

export const mapBackendProductToFrontend = (p: BackendProduct): Product => {
  const specs: ProductSpecs = {
    display: p.specs?.display ?? undefined,
    chip: p.specs?.chip ?? undefined,
    ram: p.specs?.ram ?? undefined,
    storage: p.specs?.storage ?? undefined,
    battery: p.specs?.battery ?? undefined,
    camera: p.specs?.camera ?? undefined,
    os: p.specs?.os ?? undefined,
    connectivity: p.specs?.connectivity ?? undefined,
  };

  return {
    id: p.id,
    name: p.name,
    brand: p.brand,
    category: mapCategory(p.category),
    price: p.price,
    image: p.image,
    colors: p.colors,
    taglineLines: p.taglineLines,
    specs,
  };
};