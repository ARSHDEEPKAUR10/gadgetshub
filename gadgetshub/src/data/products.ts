export type Product = {
  id: number;
  name: string;
  brand: string;
  category: "Smartphone" | "Laptop" | "Headphones";
  price: number;
};
 
export const products: Product[] = [

  // Smartphones
  { id: 1, name: "iPhone 15", brand: "Apple", category: "Smartphone", price: 1099 },
  { id: 2, name: "iPhone 14", brand: "Apple", category: "Smartphone", price: 999 },
  { id: 3, name: "Galaxy S24", brand: "Samsung", category: "Smartphone", price: 999 },
  { id: 4, name: "Galaxy A54", brand: "Samsung", category: "Smartphone", price: 549 },
  { id: 5, name: "Pixel 8", brand: "Google", category: "Smartphone", price: 899 },
  { id: 6, name: "OnePlus 12", brand: "OnePlus", category: "Smartphone", price: 799 },
  { id: 7, name: "Redmi Note 13", brand: "Xiaomi", category: "Smartphone", price: 399 },
  { id: 8, name: "Moto G Power", brand: "Motorola", category: "Smartphone", price: 299 },
 
  // Laptops

  { id: 9, name: "MacBook Air M2", brand: "Apple", category: "Laptop", price: 1399 },
  { id: 10, name: "MacBook Pro 14", brand: "Apple", category: "Laptop", price: 1999 },
  { id: 11, name: "XPS 13", brand: "Dell", category: "Laptop", price: 1299 },
  { id: 12, name: "Inspiron 15", brand: "Dell", category: "Laptop", price: 799 },
  { id: 13, name: "ThinkPad X1 Carbon", brand: "Lenovo", category: "Laptop", price: 1499 },
  { id: 14, name: "Pavilion 14", brand: "HP", category: "Laptop", price: 749 },
  { id: 15, name: "ZenBook 14", brand: "Asus", category: "Laptop", price: 999 },
  { id: 16, name: "Swift 3", brand: "Acer", category: "Laptop", price: 699 },
 
  //  Headphones

  { id: 17, name: "WH-1000XM5", brand: "Sony", category: "Headphones", price: 399 },
  { id: 18, name: "WH-1000XM4", brand: "Sony", category: "Headphones", price: 349 },
  { id: 19, name: "AirPods Pro (2nd Gen)", brand: "Apple", category: "Headphones", price: 329 },
  { id: 20, name: "AirPods Max", brand: "Apple", category: "Headphones", price: 549 },
  { id: 21, name: "QuietComfort 45", brand: "Bose", category: "Headphones", price: 379 },
  { id: 22, name: "Tune 760NC", brand: "JBL", category: "Headphones", price: 199 },
  { id: 23, name: "Momentum 4", brand: "Sennheiser", category: "Headphones", price: 349 },
  { id: 24, name: "Crusher Evo", brand: "Skullcandy", category: "Headphones", price: 229 },
];

export default products;
