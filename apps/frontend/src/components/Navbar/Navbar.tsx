import { NavLink, useLocation } from "react-router-dom";
import { UserButton, useUser } from "@clerk/clerk-react";
import "./Navbar.css";

export default function Navbar() {
  const { pathname } = useLocation();
  const { isSignedIn } = useUser();

  const isHome = pathname === "/";

  return (
    <header className={`navbar ${isHome ? "navbar--home" : "navbar--default"}`}>
      {!isHome && <h1 className="navbar__title">GadgetsHub</h1>}

      <nav className="navbar__links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/explore">Explore</NavLink>
        <NavLink to="/wishlist">Wishlist</NavLink>

        {isSignedIn ? (
          <UserButton afterSignOutUrl="/" />
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/signup">Signup</NavLink>
          </>
        )}
      </nav>
    </header>
  );
}