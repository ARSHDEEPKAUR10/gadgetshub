import { Routes, Route, useLocation, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import HomePage from "./pages/HomePage";
import WishlistPage from "./pages/Wishlist";

import ExplorePage from "./pages/ExplorePage";
import CategoryBrandsPage from "./pages/CategoryBrandsPage";
import BrandProductsPage from "../src/pages/BrandSmartphonesPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";


export default function App() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <>
      {!isHome && <Navbar />}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/wishlist" element={<WishlistPage />} />

        <Route path="/explore" element={<ExplorePage />} />

        <Route path="/explore/:categorySlug" element={<CategoryBrandsPage />} />

        <Route
          path="/explore/:categorySlug/:brandSlug"
          element={<BrandProductsPage />}
        />

        <Route path="/product/:id" element={<ProductDetailsPage />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}