import prisma from "../../../lib/prisma";

const mapProduct = (p: any) => ({
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

export const getAllProducts = async () => {
  const products = await prisma.product.findMany({
    orderBy: { id: "asc" },
  });

  return products.map(mapProduct);
};

export const getProductById = async (id: number) => {
  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) return null;

  return mapProduct(product);
};

export const getProductsByCategory = async (category: string) => {
  const products = await prisma.product.findMany({
    where: { category },
    orderBy: { id: "asc" },
  });

  return products.map(mapProduct);
};

export const getProductsByCategoryAndBrand = async (
  category: string,
  brand: string
) => {
  const products = await prisma.product.findMany({
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

export const createProduct = async (data: any) => {
  const product = await prisma.product.create({ data });
  return mapProduct(product);
};

export const updateProduct = async (id: number, data: any) => {
  const product = await prisma.product.update({
    where: { id },
    data,
  });

  return mapProduct(product);
};

export const deleteProduct = async (id: number) => {
  return prisma.product.delete({
    where: { id },
  });
};