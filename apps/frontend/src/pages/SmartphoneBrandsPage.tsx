import { Link } from "react-router-dom";
import "./SmartphoneBrandsPage.css";

import appleImg from "../assets/apple.jpg";
import samsungImg from "../assets/samsung.jpg";

const BRANDS = [
  {
    name: "Apple",
    slug: "apple",
    tagline: "iPhone • iOS • Premium build",
    img: appleImg,
  },
  {
    name: "Samsung",
    slug: "samsung",
    tagline: "Galaxy • Android • AMOLED",
    img: samsungImg,
  },
];

export default function SmartphoneBrandsPage() {
  return (
    <main className="brands_page">
      <header className="brands_header">
        <h1 className="brands_title">Smartphone Brands</h1>
        <p className="brands_subtitle">Pick a brand to explore models and specs.</p>

        <Link className="brands_back" to="/explore">
          ← Back to Explore
        </Link>
      </header>

      <section className="brands_grid">
        {BRANDS.map((b) => (
          <Link
            key={b.slug}
            to={`/explore/smartphones/${b.slug}`}
            className="brand_card"
          >
            <div className="brand_imgWrap">
              <img className="brand_img" src={b.img} alt={b.name} />
            </div>

            <div className="brand_body">
              <h2 className="brand_name">{b.name}</h2>
              <p className="brand_tagline">{b.tagline}</p>
              <span className="brand_cta">Explore →</span>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}