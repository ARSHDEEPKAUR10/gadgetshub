import { useEffect, useMemo, useState } from "react";
import type { WishlistItem } from "../types/WishlistItem";
import { WishlistRepository } from "../repositories/WishlistRepository";
import { WishlistService } from "../services/WishlistService";
 
const repo = new WishlistRepository();
const service = new WishlistService(repo);
 
export function useWishlist() {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
 
  async function refresh() {
    setLoading(true);
    try {
      const data = await service.list();
      setItems(data);
    } finally {
      setLoading(false);
    }
  }
 
  async function toggle(item: WishlistItem) {
    setLoading(true);
    try {
      const res = await service.toggle(item);
      setMessage(res.message);
 
      const data = await service.list();
      setItems(data);
 
      return res.inWishlist;
    } finally {
      setLoading(false);
    }
  }
 
  async function remove(id: string) {
    setLoading(true);
    try {
      await service.remove(id);
      setMessage("Removed from wishlist");
 
      const data = await service.list();
      setItems(data);
    } finally {
      setLoading(false);
    }
  }
 
  const ids = useMemo(() => new Set(items.map((x) => x.id)), [items]);
  function isWishlisted(id: string) {
    return ids.has(id);
  }
 
  useEffect(() => {
    let cancelled = false;
 
    (async () => {
      setLoading(true);
      try {
        const data = await service.list();
        if (!cancelled) setItems(data);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
 
    return () => {
      cancelled = true;
    };
  }, []);
 
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
 