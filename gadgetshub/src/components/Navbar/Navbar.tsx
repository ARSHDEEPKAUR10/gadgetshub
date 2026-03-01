import { NavLink } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <header className="navbar">
      <h1 className="navbar__title">GadgetsHub</h1>

      <nav className="navbar__links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/wishlist">Wishlist</NavLink>
        <NavLink to="/explore">Explore</NavLink>
      </nav>
    </header>
  );
}