"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProductsByCategoryAndBrand = exports.getProductsByCategory = exports.getProductById = exports.getAllProducts = void 0;
const prisma_1 = __importDefault(require("../../../lib/prisma"));
const mapProduct = (p) => ({
    id: p.id,
    name: p.name,
    brand: p.brand,
    category: p.category,
    price: p.price,
    image: p.image,
    colors: p.colors,
    taglineLines: p.taglineLines,
    specs: {
        display: p.display,
        chip: p.chip,
        ram: p.ram,
        storage: p.storage,
        battery: p.battery,
        camera: p.camera,
        os: p.os,
        connectivity: p.connectivity,
    },
});
const getAllProducts = async () => {
    const products = await prisma_1.default.product.findMany({
        orderBy: { id: "asc" },
    });
    return products.map(mapProduct);
};
exports.getAllProducts = getAllProducts;
const getProductById = async (id) => {
    const product = await prisma_1.default.product.findUnique({
        where: { id },
    });
    if (!product)
        return null;
    return mapProduct(product);
};
exports.getProductById = getProductById;
const getProductsByCategory = async (category) => {
    const products = await prisma_1.default.product.findMany({
        where: { category },
        orderBy: { id: "asc" },
    });
    return products.map(mapProduct);
};
exports.getProductsByCategory = getProductsByCategory;
const getProductsByCategoryAndBrand = async (category, brand) => {
    const products = await prisma_1.default.product.findMany({
        where: {
            category,
            brand: {
                equals: brand,
                mode: "insensitive",
            },
        },
        orderBy: { id: "asc" },
    });
    return products.map(mapProduct);
};
exports.getProductsByCategoryAndBrand = getProductsByCategoryAndBrand;
const createProduct = async (data) => {
    const product = await prisma_1.default.product.create({ data });
    return mapProduct(product);
};
exports.createProduct = createProduct;
const updateProduct = async (id, data) => {
    const product = await prisma_1.default.product.update({
        where: { id },
        data,
    });
    return mapProduct(product);
};
exports.updateProduct = updateProduct;
const deleteProduct = async (id) => {
    return prisma_1.default.product.delete({
        where: { id },
    });
};
exports.deleteProduct = deleteProduct;
