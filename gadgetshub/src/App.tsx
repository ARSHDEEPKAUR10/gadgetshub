import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import GlobalStyles from "./styles/GlobalStyles";

import HomePage from "./pages/HomePage";
import ExplorePage from "./pages/ExplorePage";

export default function App() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <>
      <GlobalStyles />

      {!isHome && <Navbar />}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/explore/:categoryName" element={<ExplorePage />} />
      </Routes>
    </>
  );
}
