export type WishlistItem = {
  id: string;
  title: string;
  category: "smartphones" | "laptops" | "headphones" | "accessories";
  priceCAD: number;
  rating: number; 
};