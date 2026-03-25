import { NavLink, useLocation } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  return (
    <header className={`navbar ${isHome ? "navbar--home" : "navbar--default"}`}>
      {!isHome && <h1 className="navbar__title">GadgetsHub</h1>}

      <nav className="navbar__links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/explore">Explore</NavLink>
        <NavLink to="/wishlist">Wishlist</NavLink>
      </nav>
    </header>
  );
}
