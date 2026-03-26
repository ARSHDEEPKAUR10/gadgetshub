import "dotenv/config";
import prisma from "../src/lib/prisma";

async function main() {
  console.log("Seeding ALL products...");

  const products = [
    // ================= SMARTPHONES =================
    { id: 1, name: "iPhone 16", brand: "Apple", category: "Smartphone", price: 1099, image: "/products/iphone16.png", colors: ["#fff"], taglineLines: ["Next-gen iPhone"] },
    { id: 2, name: "iPhone 16 Pro", brand: "Apple", category: "Smartphone", price: 1299, image: "/products/iphone16pro.png", colors: ["#ccc"], taglineLines: ["Pro power"] },
    { id: 3, name: "iPhone 17", brand: "Apple", category: "Smartphone", price: 1199, image: "/products/iphone17.png", colors: ["#eee"], taglineLines: ["Future phone"] },
    { id: 4, name: "iPhone 17 Pro", brand: "Apple", category: "Smartphone", price: 1399, image: "/products/iphone17pro.png", colors: ["#999"], taglineLines: ["Ultimate Pro"] },
    { id: 5, name: "iPhone 17 Pro Max", brand: "Apple", category: "Smartphone", price: 1499, image: "/products/iphone17promax.png", colors: ["#000"], taglineLines: ["Max performance"] },

    { id: 6, name: "Galaxy S24", brand: "Samsung", category: "Smartphone", price: 999, image: "/products/galaxy-s24.png", colors: ["#000"], taglineLines: ["Smooth speed"] },
    { id: 7, name: "Galaxy S24+", brand: "Samsung", category: "Smartphone", price: 1099, image: "/products/galaxy-s24-plus.png", colors: ["#111"], taglineLines: ["Bigger display"] },
    { id: 8, name: "Galaxy S24 Ultra", brand: "Samsung", category: "Smartphone", price: 1399, image: "/products/galaxy-s24-ultra.png", colors: ["#222"], taglineLines: ["Ultra flagship"] },
    { id: 9, name: "Galaxy A55", brand: "Samsung", category: "Smartphone", price: 599, image: "/products/galaxy-a55.png", colors: ["#333"], taglineLines: ["Affordable power"] },
    { id: 10, name: "Galaxy Z Fold 6", brand: "Samsung", category: "Smartphone", price: 1799, image: "/products/galaxy-zfold6.png", colors: ["#444"], taglineLines: ["Foldable future"] },

    // ================= LAPTOPS =================
    { id: 11, name: "MacBook Air M3", brand: "Apple", category: "Laptop", price: 1299, image: "/products/macbook-air-m3.png", colors: ["#fff"], taglineLines: ["Light & fast"] },
    { id: 12, name: "Dell XPS 13", brand: "Dell", category: "Laptop", price: 1199, image: "/products/dell-xps-13.png", colors: ["#000"], taglineLines: ["Compact performance"] },
    { id: 13, name: "HP Pavilion", brand: "HP", category: "Laptop", price: 899, image: "/products/hp-pavilion.png", colors: ["#ccc"], taglineLines: ["Daily laptop"] },
    { id: 14, name: "ThinkPad X1", brand: "Lenovo", category: "Laptop", price: 1499, image: "/products/thinkpad-x1.png", colors: ["#000"], taglineLines: ["Business class"] },
    { id: 15, name: "Asus Zenbook", brand: "Asus", category: "Laptop", price: 999, image: "/products/asus-zenbook.png", colors: ["#111"], taglineLines: ["Slim & powerful"] },

    // ================= HEADPHONES =================
    { id: 16, name: "AirPods Pro", brand: "Apple", category: "Headphones", price: 249, image: "/products/airpods-pro.png", colors: ["#fff"], taglineLines: ["Apple audio"] },
    { id: 17, name: "Sony XM5", brand: "Sony", category: "Headphones", price: 399, image: "/products/sony-xm5.png", colors: ["#000"], taglineLines: ["Noise cancelling"] },
    { id: 18, name: "Bose QC45", brand: "Bose", category: "Headphones", price: 349, image: "/products/bose-qc45.png", colors: ["#eee"], taglineLines: ["Comfort sound"] },
    { id: 19, name: "JBL 760NC", brand: "JBL", category: "Headphones", price: 199, image: "/products/jbl-760nc.png", colors: ["#000"], taglineLines: ["Bass boost"] },
    { id: 20, name: "Momentum 4", brand: "Sennheiser", category: "Headphones", price: 379, image: "/products/momentum-4.png", colors: ["#ddd"], taglineLines: ["Premium sound"] },

    // ================= ACCESSORIES =================
    { id: 21, name: "MagSafe Charger", brand: "Apple", category: "Accessories", price: 49, image: "/products/magsafe.png", colors: ["#fff"], taglineLines: ["Snap charge"] },
    { id: 22, name: "Anker 20W Charger", brand: "Anker", category: "Accessories", price: 29, image: "/products/anker-20w.png", colors: ["#fff"], taglineLines: ["Fast charging"] },
    { id: 23, name: "Belkin 3-in-1", brand: "Belkin", category: "Accessories", price: 99, image: "/products/belkin-3in1.png", colors: ["#fff"], taglineLines: ["All in one"] },
    { id: 24, name: "Samsung SSD", brand: "Samsung", category: "Accessories", price: 149, image: "/products/samsung-ssd.png", colors: ["#000"], taglineLines: ["Fast storage"] },
    { id: 25, name: "MX Master 3S", brand: "Logitech", category: "Accessories", price: 99, image: "/products/mx-master-3s.png", colors: ["#333"], taglineLines: ["Best mouse"] },
  ];

  await prisma.product.deleteMany(); 

  const result = await prisma.product.createMany({
    data: products,
  });

  console.log(`Seeded ${result.count} products`);
}

main()
  .catch((e) => {
    console.error("Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });