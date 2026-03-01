export type ProductCategory = "Smartphone" | "Laptop" | "Headphones" | "Accessories";
 
export type ProductSpecs = {
  display?: string;
  chip?: string;
  ram?: string;
  storage?: string;
  battery?: string;
  camera?: string;
  os?: string;
  connectivity?: string;
};
 
export type Product = {
  id: number;
  name: string;
  brand: string;
  category: ProductCategory;
  price: number;
 
  image: string;
  colors: string[];
  taglineLines: string[];
 
  specs?: ProductSpecs;
}