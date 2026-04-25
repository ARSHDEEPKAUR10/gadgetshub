import "dotenv/config";
import express from "express";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";

import productRoutes from "./api/v1/routes/productRoutes";
import wishlistRoutes from "./api/v1/routes/wishlistRoutes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(clerkMiddleware() as unknown as express.RequestHandler);

app.use("/api/v1/products", productRoutes);
app.use("/api/v1/wishlist", wishlistRoutes);

app.get("/", (_req, res) => {
  res.send("Backend is running");
});

export default app;