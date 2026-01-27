import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import GlobalStyles from "./styles/GlobalStyles";
import { containerStyle } from "./styles/Utilities";

import HomePage from "./pages/HomePage.tsx";
import ExplorePage from "./pages/ExplorePage.tsx";

export default function App() {
  return (
    <>
      <GlobalStyles />
      <Navbar />

      <main style={containerStyle}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/explore" element={<ExplorePage />} />
        </Routes>
      </main>
    </>
  );
}
