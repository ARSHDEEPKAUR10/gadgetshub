import { FormEvent, useState } from "react";
import type { ProductCategory } from "../types/Product";
import { ProductService } from "../services/ProductService";

type AddProductFormProps = {
  onProductAdded: () => void;
};

const productService = new ProductService();

const defaultImageByCategory: Record<ProductCategory, string> = {
  Smartphone: "/products/iphone16.png",
  Laptop: "/products/macbook-air-m3.png",
  Headphones: "/products/airpods-pro.png",
  Accessories: "/products/magsafe.png",
};

export default function AddProductForm({ onProductAdded }: AddProductFormProps) {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState<ProductCategory>("Smartphone");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(defaultImageByCategory["Smartphone"]);
  const [colors, setColors] = useState("#111827");
  const [taglineLines, setTaglineLines] = useState("New product");
  const [display, setDisplay] = useState("");
  const [chip, setChip] = useState("");
  const [ram, setRam] = useState("");
  const [storage, setStorage] = useState("");
  const [battery, setBattery] = useState("");
  const [camera, setCamera] = useState("");
  const [os, setOs] = useState("");
  const [connectivity, setConnectivity] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleCategoryChange = (value: ProductCategory) => {
    setCategory(value);
    setImage(defaultImageByCategory[value]);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await productService.create({
        id: Number(id),
        name,
        brand,
        category,
        price: Number(price),
        image,
        colors: colors.split(",").map((c) => c.trim()).filter(Boolean),
        taglineLines: taglineLines
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),

        display: display || undefined,
        chip: chip || undefined,
        ram: ram || undefined,
        storage: storage || undefined,
        battery: battery || undefined,
        camera: camera || undefined,
        os: os || undefined,
        connectivity: connectivity || undefined,
      });

      setSuccess("Product added successfully");

      setId("");
      setName("");
      setBrand("");
      setCategory("Smartphone");
      setPrice("");
      setImage(defaultImageByCategory["Smartphone"]);
      setColors("#111827");
      setTaglineLines("New product");
      setDisplay("");
      setChip("");
      setRam("");
      setStorage("");
      setBattery("");
      setCamera("");
      setOs("");
      setConnectivity("");

      onProductAdded();
    } catch {
      setError("Failed to add product");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 32 }}>
      <h2>Add Product</h2>

      <div style={{ display: "grid", gap: 12, maxWidth: 500 }}>
        <input
          type="number"
          placeholder="ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Product name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          required
        />

        <select
          value={category}
          onChange={(e) => handleCategoryChange(e.target.value as ProductCategory)}
        >
          <option value="Smartphone">Smartphone</option>
          <option value="Laptop">Laptop</option>
          <option value="Headphones">Headphones</option>
          <option value="Accessories">Accessories</option>
        </select>

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Image path"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Colors (comma separated)"
          value={colors}
          onChange={(e) => setColors(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Taglines (comma separated)"
          value={taglineLines}
          onChange={(e) => setTaglineLines(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Display"
          value={display}
          onChange={(e) => setDisplay(e.target.value)}
        />

        <input
          type="text"
          placeholder="Chip"
          value={chip}
          onChange={(e) => setChip(e.target.value)}
        />

        <input
          type="text"
          placeholder="RAM"
          value={ram}
          onChange={(e) => setRam(e.target.value)}
        />

        <input
          type="text"
          placeholder="Storage"
          value={storage}
          onChange={(e) => setStorage(e.target.value)}
        />

        <input
          type="text"
          placeholder="Battery"
          value={battery}
          onChange={(e) => setBattery(e.target.value)}
        />

        <input
          type="text"
          placeholder="Camera"
          value={camera}
          onChange={(e) => setCamera(e.target.value)}
        />

        <input
          type="text"
          placeholder="OS"
          value={os}
          onChange={(e) => setOs(e.target.value)}
        />

        <input
          type="text"
          placeholder="Connectivity"
          value={connectivity}
          onChange={(e) => setConnectivity(e.target.value)}
        />

        <button type="submit">Add Product</button>

        {error && <p>{error}</p>}
        {success && <p>{success}</p>}
      </div>
    </form>
  );
}