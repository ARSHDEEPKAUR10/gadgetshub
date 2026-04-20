import "dotenv/config";
import express from "express";
import cors from "cors";
import productRoutes from "./api/v1/routes/productRoutes";
import wishlistRoutes from "./api/v1/routes/wishlistRoutes";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
  })
);

app.get("/", (_req, res) => {
  res.send("Backend is running");
});

app.use("/api/v1/products", productRoutes);

app.use("/api/wishlist", wishlistRoutes);

export default app;