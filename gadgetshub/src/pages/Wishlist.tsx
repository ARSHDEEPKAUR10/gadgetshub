import { useWishlist } from "../hooks/useWishlist";

export default function WishlistPage() {
  const { items, loading, message, remove, count } = useWishlist();

  return (
    <main style={{ padding: "1.5rem" }}>
      <h2>Wishlist ({count})</h2>
      {message && <p>{message}</p>}
      {loading && <p>Loading...</p>}

      {!loading && (
        <ul>
          {items.map((x) => (
            <li key={x.id} style={{ marginBottom: "0.75rem" }}>
              <strong>{x.title}</strong> — {x.category} — ${x.priceCAD} — {x.rating}
              <button style={{ marginLeft: "12px" }} onClick={() => remove(x.id)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}