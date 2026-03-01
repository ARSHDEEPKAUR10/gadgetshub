import { Link } from "react-router-dom";
import "./GadgetCard.css";
 
type GadgetCardProps = {
  id: number;
  name: string;
  brand: string;
  category: string;
  price: number;
  image: string;
  colors: string[];
};
 
export default function GadgetCard({
  id,
  name,
  brand,
  category,
  price,
  image,
  colors,
}: GadgetCardProps) {
  return (
    <article className="gadget-card">
      <Link to={`/product/${id}`} className="gadget-card__link">
      <div className="gadget-card__media">
        <img className="gadget-card__img" src={image} alt={name} />
        </div>
        
        <div className="gadget-card__info">
          <h3 className="gadget-card__name">{name}</h3>
          <p className="gadget-card__meta">
            <strong>{brand}</strong> • {category}
            </p>

          <p className="gadget-card__price">${price}</p>
          
          <div className="gadget-card__colors">
            {colors.slice(0, 6).map((c) => (
              <span
                key={c}
                className="gadget-card__dot"
                style={{ background: c }}
                aria-label="color"
              />
            ))}
          </div>
        </div>
      </Link>
    </article>
  );
}