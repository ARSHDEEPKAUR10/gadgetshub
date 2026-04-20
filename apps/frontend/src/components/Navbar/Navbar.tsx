import { NavLink, useLocation } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/clerk-react";
import "./Navbar.css";

export default function Navbar() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  return (
    <header className={`navbar ${isHome ? "navbar--home" : "navbar--default"}`}>
      {!isHome && <h1 className="navbar__title">GadgetsHub</h1>}

      <nav className="navbar__links">
        <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
          Home
        </NavLink>

        <NavLink
          to="/explore"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Explore
        </NavLink>

        <SignedIn>
          <NavLink
            to="/wishlist"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Wishlist
          </NavLink>
        </SignedIn>

       <SignedOut>
      <SignInButton mode="modal">
        <button className="login-btn" type="button">
          Login
        </button>
      </SignInButton>

      <SignUpButton mode="modal">
        <button className="signup-btn" type="button">
          Sign Up
        </button>
      </SignUpButton>
      </SignedOut>

        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </nav>
    </header>
  );
}