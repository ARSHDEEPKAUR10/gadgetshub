import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import "./HomePage.css";

const terms = ["Smartphones", "Laptops", "Headphones", "Accessories"];

export default function HomePage() {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase();
    if (!s) return terms;
    return terms.filter((t) => t.toLowerCase().includes(s));
  }, [search]);

  return (
    <main className="home_full">
      <section className="hero_full">
        <div className="hero_overlay_full">
          <div className="hero_topbar">
            <Link className="hero_homebtn" to="/explore">
            </Link>
          </div>

          <p className="hero_small">WELCOME TO</p>
          <h1 className="hero_title">Gadgets Hub</h1>

          <p className="hero_subtitle">
            Discover trending tech, compare specs, and build your wishlist in one place.
          </p>

          <input
            className="hero_search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search categories..."
          />

          <div className="hero_chips">
            {filtered.includes("Smartphones") && (
              <Link className="chip" to="/explore/smartphones">📱 Smartphones</Link>
            )}
            {filtered.includes("Laptops") && (
              <Link className="chip" to="/explore/laptops">💻 Laptops</Link>
            )}
            {filtered.includes("Headphones") && (
              <Link className="chip" to="/explore/headphones">🎧 Headphones</Link>
            )}
            {filtered.includes("Accessories") && (
              <Link className="chip" to="/explore/accessories">🧩 Accessories</Link>
            )}
          </div>

          <Link className="hero_btn" to="/explore">
          </Link>
        </div>
      </section>
    </main>
  );
}
