import "dotenv/config";
import prisma from "../src/lib/prisma";

async function main() {
  console.log("Seeding ALL products with specs...");

  const products = [
    //SMARTPHONES
    { id: 1, name: "iPhone 16", brand: "Apple", category: "Smartphone", price: 1099, image: "/products/iphone16.png", colors: ["#fff"], taglineLines: ["Next-gen iPhone"], display: "6.1 OLED", chip: "A18", ram: "8GB", storage: "128GB", battery: "3561mAh", camera: "48MP", os: "iOS 18", connectivity: "5G" },
    { id: 2, name: "iPhone 16 Pro", brand: "Apple", category: "Smartphone", price: 1299, image: "/products/iphone16pro.png", colors: ["#ccc"], taglineLines: ["Pro power"], display: "6.3 OLED", chip: "A18 Pro", ram: "8GB", storage: "256GB", battery: "3650mAh", camera: "48MP Triple", os: "iOS 18", connectivity: "5G" },
    { id: 3, name: "iPhone 17", brand: "Apple", category: "Smartphone", price: 1199, image: "/products/iphone17.png", colors: ["#eee"], taglineLines: ["Future phone"], display: "6.2 OLED", chip: "A19", ram: "8GB", storage: "256GB", battery: "3700mAh", camera: "50MP", os: "iOS 19", connectivity: "5G" },
    { id: 4, name: "iPhone 17 Pro", brand: "Apple", category: "Smartphone", price: 1399, image: "/products/iphone17pro.png", colors: ["#999"], taglineLines: ["Ultimate Pro"], display: "6.5 OLED", chip: "A19 Pro", ram: "12GB", storage: "512GB", battery: "4000mAh", camera: "64MP", os: "iOS 19", connectivity: "5G" },
    { id: 5, name: "iPhone 17 Pro Max", brand: "Apple", category: "Smartphone", price: 1499, image: "/products/iphone17promax.png", colors: ["#000"], taglineLines: ["Max performance"], display: "6.7 OLED", chip: "A19 Pro", ram: "12GB", storage: "1TB", battery: "4500mAh", camera: "64MP", os: "iOS 19", connectivity: "5G" },

    { id: 6, name: "Galaxy S24", brand: "Samsung", category: "Smartphone", price: 999, image: "/products/galaxy-s24.png", colors: ["#000"], taglineLines: ["Smooth speed"], display: "6.2 AMOLED", chip: "Snapdragon 8 Gen 3", ram: "8GB", storage: "128GB", battery: "4000mAh", camera: "50MP", os: "Android 14", connectivity: "5G" },
    { id: 7, name: "Galaxy S24+", brand: "Samsung", category: "Smartphone", price: 1099, image: "/products/galaxy-s24-plus.png", colors: ["#111"], taglineLines: ["Bigger display"], display: "6.7 AMOLED", chip: "Snapdragon 8 Gen 3", ram: "12GB", storage: "256GB", battery: "4700mAh", camera: "50MP", os: "Android 14", connectivity: "5G" },
    { id: 8, name: "Galaxy S24 Ultra", brand: "Samsung", category: "Smartphone", price: 1399, image: "/products/galaxy-s24-ultra.png", colors: ["#222"], taglineLines: ["Ultra flagship"], display: "6.8 AMOLED", chip: "Snapdragon 8 Gen 3", ram: "12GB", storage: "512GB", battery: "5000mAh", camera: "200MP", os: "Android 14", connectivity: "5G" },
    { id: 9, name: "Galaxy A55", brand: "Samsung", category: "Smartphone", price: 599, image: "/products/galaxy-a55.png", colors: ["#333"], taglineLines: ["Affordable power"], display: "6.6 AMOLED", chip: "Exynos", ram: "8GB", storage: "128GB", battery: "5000mAh", camera: "48MP", os: "Android 14", connectivity: "5G" },
    { id: 10, name: "Galaxy Z Fold 6", brand: "Samsung", category: "Smartphone", price: 1799, image: "/products/galaxy-zfold6.png", colors: ["#444"], taglineLines: ["Foldable future"], display: "7.6 Foldable", chip: "Snapdragon 8 Gen 3", ram: "12GB", storage: "512GB", battery: "4400mAh", camera: "50MP", os: "Android 14", connectivity: "5G" },

    //LAPTOPS
    { id: 11, name: "MacBook Air M3", brand: "Apple", category: "Laptop", price: 1299, image: "/products/macbook-air-m3.png", colors: ["#fff"], taglineLines: ["Light & fast"], display: "13.6 Retina", chip: "M3", ram: "8GB", storage: "256GB SSD", battery: "18h", camera: "1080p", os: "macOS", connectivity: "Wi-Fi 6E" },
    { id: 12, name: "Dell XPS 13", brand: "Dell", category: "Laptop", price: 1199, image: "/products/dell-xps-13.png", colors: ["#000"], taglineLines: ["Compact performance"], display: "13.4 FHD", chip: "Intel i7", ram: "16GB", storage: "512GB SSD", battery: "12h", camera: "720p", os: "Windows", connectivity: "Wi-Fi 6" },
    { id: 13, name: "HP Pavilion", brand: "HP", category: "Laptop", price: 899, image: "/products/hp-pavilion.png", colors: ["#ccc"], taglineLines: ["Daily laptop"], display: "15.6 FHD", chip: "Ryzen 5", ram: "8GB", storage: "512GB SSD", battery: "10h", camera: "720p", os: "Windows", connectivity: "Wi-Fi 5" },
    { id: 14, name: "ThinkPad X1", brand: "Lenovo", category: "Laptop", price: 1499, image: "/products/thinkpad-x1.png", colors: ["#000"], taglineLines: ["Business class"], display: "14 UHD", chip: "Intel i7", ram: "16GB", storage: "1TB SSD", battery: "14h", camera: "1080p", os: "Windows", connectivity: "Wi-Fi 6E" },
    { id: 15, name: "Asus Zenbook", brand: "Asus", category: "Laptop", price: 999, image: "/products/asus-zenbook.png", colors: ["#111"], taglineLines: ["Slim & powerful"], display: "14 OLED", chip: "Ryzen 7", ram: "16GB", storage: "512GB SSD", battery: "13h", camera: "1080p", os: "Windows", connectivity: "Wi-Fi 6" },

    //HEADPHONES
    { id: 16, name: "AirPods Pro", brand: "Apple", category: "Headphones", price: 249, image: "/products/airpods-pro.png", colors: ["#fff"], taglineLines: ["Apple audio"], display: "N/A", chip: "H2", ram: "N/A", storage: "N/A", battery: "6h", camera: "N/A", os: "N/A", connectivity: "Bluetooth 5.3" },
    { id: 17, name: "Sony XM5", brand: "Sony", category: "Headphones", price: 399, image: "/products/sony-xm5.png", colors: ["#000"], taglineLines: ["Noise cancelling"], display: "N/A", chip: "QN1", ram: "N/A", storage: "N/A", battery: "30h", camera: "N/A", os: "N/A", connectivity: "Bluetooth 5.2" },
    { id: 18, name: "Bose QC45", brand: "Bose", category: "Headphones", price: 349, image: "/products/bose-qc45.png", colors: ["#eee"], taglineLines: ["Comfort sound"], display: "N/A", chip: "Custom", ram: "N/A", storage: "N/A", battery: "24h", camera: "N/A", os: "N/A", connectivity: "Bluetooth 5.1" },
    { id: 19, name: "JBL 760NC", brand: "JBL", category: "Headphones", price: 199, image: "/products/jbl-760nc.png", colors: ["#000"], taglineLines: ["Bass boost"], display: "N/A", chip: "Custom", ram: "N/A", storage: "N/A", battery: "35h", camera: "N/A", os: "N/A", connectivity: "Bluetooth 5.0" },
    { id: 20, name: "Momentum 4", brand: "Sennheiser", category: "Headphones", price: 379, image: "/products/momentum-4.png", colors: ["#ddd"], taglineLines: ["Premium sound"], display: "N/A", chip: "Custom", ram: "N/A", storage: "N/A", battery: "60h", camera: "N/A", os: "N/A", connectivity: "Bluetooth 5.2" },

    //ACCESSORIES
    { id: 21, name: "MagSafe Charger", brand: "Apple", category: "Accessories", price: 49, image: "/products/magsafe.png", colors: ["#fff"], taglineLines: ["Snap charge"], display: "N/A", chip: "N/A", ram: "N/A", storage: "N/A", battery: "N/A", camera: "N/A", os: "N/A", connectivity: "MagSafe" },
    { id: 22, name: "Anker 20W Charger", brand: "Anker", category: "Accessories", price: 29, image: "/products/anker-20w.png", colors: ["#fff"], taglineLines: ["Fast charging"], display: "N/A", chip: "N/A", ram: "N/A", storage: "N/A", battery: "N/A", camera: "N/A", os: "N/A", connectivity: "USB-C" },
    { id: 23, name: "Belkin 3-in-1", brand: "Belkin", category: "Accessories", price: 99, image: "/products/belkin-3in1.png", colors: ["#fff"], taglineLines: ["All in one"], display: "N/A", chip: "N/A", ram: "N/A", storage: "N/A", battery: "N/A", camera: "N/A", os: "N/A", connectivity: "Wireless" },
    { id: 24, name: "Samsung SSD", brand: "Samsung", category: "Accessories", price: 149, image: "/products/samsung-ssd.png", colors: ["#000"], taglineLines: ["Fast storage"], display: "N/A", chip: "N/A", ram: "N/A", storage: "1TB", battery: "N/A", camera: "N/A", os: "N/A", connectivity: "USB 3.2" },
    { id: 25, name: "MX Master 3S", brand: "Logitech", category: "Accessories", price: 99, image: "/products/mx-master-3s.png", colors: ["#333"], taglineLines: ["Best mouse"], display: "N/A", chip: "N/A", ram: "N/A", storage: "N/A", battery: "70 days", camera: "N/A", os: "N/A", connectivity: "Bluetooth" }
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