import { useUser } from "@clerk/clerk-react";
import { useWishlist } from "../hooks/useWishlist";

export default function WishlistPage() {
  const { isSignedIn } = useUser();
  const { items, loading, message, remove, count } = useWishlist();

  if (!isSignedIn) {
    return (
      <main style={{ padding: "1.5rem" }}>
        <h2>Please login to view your wishlist</h2>
      </main>
    );
  }

  return (
    <main style={{ padding: "1.5rem" }}>
      <h2>Wishlist ({count})</h2>

      {message && <p>{message}</p>}
      {loading && <p>Loading...</p>}

      {!loading && items.length === 0 && <p>Your wishlist is empty.</p>}

      {!loading && items.length > 0 && (
        <ul style={{ paddingLeft: "1.25rem" }}>
          {items.map((x) => (
            <li key={x.id} style={{ marginBottom: "0.75rem" }}>
              <strong>{x.title}</strong> — {x.category} — ${x.priceCAD} — {x.rating}
              <button
                type="button"
                style={{ marginLeft: "12px" }}
                onClick={() => remove(x.id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}