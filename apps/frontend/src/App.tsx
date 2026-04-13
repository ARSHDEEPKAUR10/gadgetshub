import { Routes, Route, Navigate } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ExplorePage from "./pages/ExplorePage";
import CategoryBrandsPage from "./pages/CategoryBrandsPage";
import BrandProductsPage from "./pages/BrandProductsPage";
import ProductDetailsPage from "./pages/ProductDetailPage";
import WishlistPage from "./pages/Wishlist";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="/explore" element={<ExplorePage />} />
      <Route path="/explore/:categorySlug" element={<CategoryBrandsPage />} />
      <Route path="/explore/:categorySlug/:brandSlug" element={<BrandProductsPage />} />
      <Route path="/product/:id" element={<ProductDetailsPage />} />

      {/* Protected Route */}
      <Route path="/wishlist" element={<ProtectedRoute><WishlistPage /></ProtectedRoute>} />

      {/* Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}