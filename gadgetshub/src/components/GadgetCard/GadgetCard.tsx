import "./GadgetCard.css";

type GadgetCardProps = {
  name: string;
  brand: string;
  category: string;
  price: number;
};

export default function GadgetCard(props: GadgetCardProps) {
  const {
    name,
    brand,
    category,
    price = false,
  } = props;

  return (
    <article className="gadget-card">
      <div className="gadget-card__info">
        <h3 className="gadget-card__name">{name}</h3>

        <p className="gadget-card__meta">
          <strong>{brand}</strong> • {category}
        </p>

        <p className="gadget-card__price">${price}</p>
      </div>

    </article>
  );
}