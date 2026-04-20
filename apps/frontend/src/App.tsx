import { Routes, Route, Navigate } from "react-router-dom";
import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";

import HomePage from "./pages/HomePage";
import ExplorePage from "./pages/ExplorePage";
import CategoryBrandsPage from "./pages/CategoryBrandsPage";
import BrandProductsPage from "./pages/BrandProductsPage";
import ProductDetailsPage from "./pages/ProductDetailPage";
import WishlistPage from "./pages/Wishlist";

function WishlistRoute() {
  return (
    <>
      <SignedIn>
        <WishlistPage />
      </SignedIn>

      <SignedOut>
        <main style={{ padding: "1.5rem" }}>
          <h2>Wishlist</h2>
          <div
            style={{
              marginTop: "1rem",
              padding: "1rem",
              border: "1px solid #ccc",
              borderRadius: "8px",
              maxWidth: "420px",
            }}
          >
            <p>You must log in to view your wishlist.</p>
            <SignInButton mode="modal">
              <button type="button">Log In</button>
            </SignInButton>
          </div>
        </main>
      </SignedOut>
    </>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/explore" element={<ExplorePage />} />
      <Route path="/explore/:categorySlug" element={<CategoryBrandsPage />} />
      <Route
        path="/explore/:categorySlug/:brandSlug"
        element={<BrandProductsPage />}
      />
      <Route path="/product/:id" element={<ProductDetailsPage />} />
      <Route path="/wishlist" element={<WishlistRoute />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}