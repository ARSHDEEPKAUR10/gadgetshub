import { Link } from "react-router-dom";
import "./HomePage.css";

export default function HomePage() {
  return (
    <main className="home_full">
      <section
        className="hero_full"
      >
        <div className="hero_overlay_full">
          {/* simple top button to go to app pages */}
          <div className="hero_topbar">
            <Link className="hero_homebtn" to="/explore">
              Enter App →
            </Link>
          </div>

          <p className="hero_small">WELCOME TO</p>
          <h1 className="hero_title">Gadgets Hub</h1>

          <p className="hero_subtitle">
            Discover trending tech, compare specs, and build your wishlist in one place.
          </p>

          <div className="hero_chips">
            <Link className="chip" to="/category/Smartphones">📱 Smartphones</Link>
            <Link className="chip" to="/category/Laptops">💻 Laptops</Link>
            <Link className="chip" to="/category/Headphones">🎧 Headphones</Link>
          </div>

          <p className="hero_footer">
            Explore the gadgets — smart choices made simple.
          </p>

          <Link className="hero_btn" to="/explore">
            View Featured Gadgets →
          </Link>
        </div>
      </section>
    </main>
  );
}