import "./GadgetCard.css";

type GadgetCardProps = {
  name: string;
  brand: string;
  category: string;
  price: number;

  image?: string;
  taglineLines?: string[];
  colors?: string[];

  wishlisted?: boolean;
  onToggleWishlist?: () => void;

  onLearnMore?: () => void;
  onBuy?: () => void;
};

export default function GadgetCard({
  name,
  brand,
  category,
  price,
  image,
  taglineLines,
  colors,
  wishlisted = false,
  onToggleWishlist,
  onLearnMore,
  onBuy,
}: GadgetCardProps) {
  const safeTaglines = taglineLines ?? [];
  const safeColors = colors ?? [];

  return (
    <article className="apple-card">
      {image ? (
        <div className="apple-card__media">
          <img className="apple-card__img" src={image} alt={`${name} by ${brand}`} />
          <div className="apple-card__top-actions">
            {onToggleWishlist && (
              <button
                className="apple-card__star"
                type="button"
                onClick={onToggleWishlist}
                aria-label="Toggle wishlist"
                title={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
              >
                {wishlisted ? "★" : "☆" }
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="apple-card__media apple-card__media--noimg">
          <div className="apple-card__top-actions">
            {onToggleWishlist && (
              <button
                className="apple-card__star"
                type="button"
                onClick={onToggleWishlist}
                aria-label="Toggle wishlist"
                title={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
              >
                {wishlisted ? "★" : "☆"}
              </button>
            )}
          </div>
        </div>
      )}

      {safeColors.length > 0 && (
        <div className="apple-card__dots" aria-label="Available colors">
          {safeColors.map((c) => (
            <span key={c} className="apple-card__dot" style={{ backgroundColor: c }} />
          ))}
        </div>
      )}

      <div className="apple-card__body">
        <h3 className="apple-card__title">{name}</h3>

        {safeTaglines.length > 0 && (
          <div className="apple-card__taglines">
            {safeTaglines.map((t, i) => (
              <p key={i} className="apple-card__tagline">
                {t}
              </p>
            ))}
          </div>
        )}

        <p className="apple-card__price">
          From <strong>${price}</strong>
        </p>

        {(onLearnMore || onBuy) && (
          <div className="apple-card__cta">
            {onLearnMore && (
              <button className="apple-card__learn" type="button" onClick={onLearnMore}>
                Learn more
              </button>
            )}
            {onBuy && (
              <button className="apple-card__buy" type="button" onClick={onBuy}>
                Buy <span aria-hidden="true">›</span>
              </button>
            )}
          </div>
        )}

        <p className="apple-card__meta">
          {brand} • {category}
        </p>
      </div>
    </article>
  );
}