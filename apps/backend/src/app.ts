import "dotenv/config";
import express from "express";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import productRoutes from "./api/v1/routes/productRoutes";
import wishlistRoutes from "./api/v1/routes/wishlistRoutes";

const app = express();

app.use(express.json());
app.use(clerkMiddleware() as unknown as express.RequestHandler);

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/v1/products", productRoutes);
app.use("/wishlist", wishlistRoutes);

app.get("/", (_req, res) => {
  res.send("Backend is running");
});

export default app;