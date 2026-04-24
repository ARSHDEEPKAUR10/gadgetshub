import { useAuth } from "@clerk/clerk-react";
import { useEffect, useMemo, useState } from "react";
import type { WishlistItem } from "../types/WishlistItem";
import { WishlistRepository } from "../repositories/WishlistRepository";
import { WishlistService } from "../services/WishlistService";

const repo = new WishlistRepository();
const service = new WishlistService(repo);

export function useWishlist() {
  const { getToken, isSignedIn } = useAuth();

  const [items, setItems] = useState<WishlistItem[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function refresh() {
    if (!isSignedIn) {
      setItems([]);
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const token = await getToken();
      if (!token) return;

      const data = await service.list(token);
      setItems(data);
    } catch (error) {
      console.error("Failed to load wishlist:", error);
      setMessage("Failed to load wishlist.");
    } finally {
      setLoading(false);
    }
  }

  async function toggle(item: WishlistItem) {
    if (!isSignedIn) {
      setMessage("Please log in first.");
      return false;
    }

    setLoading(true);
    setMessage("");

    try {
      const token = await getToken();
      if (!token) return;

      const res = await service.toggle(item, token);
      setMessage(res.message);

      const data = await service.list(token);
      setItems(data);

      return res.inWishlist;
    } catch (error) {
      console.error("Failed to update wishlist:", error);
      setMessage("Failed to update wishlist.");
      return false;
    } finally {
      setLoading(false);
    }
  }

  async function remove(id: string) {
    if (!isSignedIn) {
      setMessage("Please log in first.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const token = await getToken();
      if (!token) return;

      await service.remove(id, token);
      setMessage("Removed from wishlist");

      const data = await service.list(token);
      setItems(data);
    } catch (error) {
      console.error("Failed to remove wishlist item:", error);
      setMessage("Failed to remove item from wishlist.");
    } finally {
      setLoading(false);
    }
  }

  const ids = useMemo(
    () => new Set(items.map((x) => x.id)),
    [items]
  );

  function isWishlisted(id: string) {
    return ids.has(id);
  }

  useEffect(() => {
    let cancelled = false;

    async function loadWishlist() {
      if (!isSignedIn) {
        setItems([]);
        return;
      }

      setLoading(true);
      try {
        const token = await getToken();
        if (!token) return;

        const data = await service.list(token);

        if (!cancelled) setItems(data);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadWishlist();

    return () => {
      cancelled = true;
    };
  }, [getToken]);

  return {
    items,
    count: items.length,
    message,
    loading,
    refresh,
    toggle,
    remove,
    isWishlisted,
  };
}
