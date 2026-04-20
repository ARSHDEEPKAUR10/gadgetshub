import { Router, RequestHandler } from "express";
import { requireAuth } from "@clerk/express";
import {
  getWishlist,
  toggleWishlist,
  removeWishlistItem,
} from "../controllers/wishlistController";
import { findOrCreateUser } from "../middleware/findOrCreateUser";

const router = Router();

const clerkAuth = requireAuth() as unknown as RequestHandler;
const ensureUser = findOrCreateUser as unknown as RequestHandler;

router.get("/", clerkAuth, ensureUser, getWishlist);
router.post("/:productId", clerkAuth, ensureUser, toggleWishlist);
router.delete("/:productId", clerkAuth, ensureUser, removeWishlistItem);

export default router;