import { NavLink, useLocation } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  return (
    <header className="navbar">
      {/* Hide brand on home page */}
      {!isHome && <h1 className="brand">GadgetsHub</h1>}

      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/wishlist">Wishlist</NavLink>
      </nav>
    </header>
  );
}
