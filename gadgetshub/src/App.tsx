import { Routes, Route, Navigate } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ExplorePage from "./pages/ExplorePage";
import CategoryBrandsPage from "./pages/CategoryBrandsPage";
import BrandProductsPage from "./pages/BrandProductsPage";
import ProductDetailsPage from "./pages/ProductDetailPage";
import WishlistPage from "./pages/Wishlist";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="/explore" element={<ExplorePage />} />
      <Route path="/explore/:categorySlug" element={<CategoryBrandsPage />} />
      <Route path="/explore/:categorySlug/:brandSlug" element={<BrandProductsPage />} />
      <Route path="/product/:id" element={<ProductDetailsPage />} />

      <Route path="/wishlist" element={<WishlistPage />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}