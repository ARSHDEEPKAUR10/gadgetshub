import prisma from "../../../lib/prisma";

export const getAllProducts = async () => {
  return prisma.product.findMany({
    orderBy: { id: "asc" },
  });
};

export const getProductById = async (id: number) => {
  return prisma.product.findUnique({
    where: { id },
  });
};

export const getProductsByCategory = async (category: string) => {
  return prisma.product.findMany({
    where: { category },
    orderBy: { id: "asc" },
  });
};

export const getProductsByCategoryAndBrand = async (
  category: string,
  brand: string
) => {
  return prisma.product.findMany({
    where: {
      category,
      brand: {
        equals: brand,
        mode: "insensitive",
      },
    },
    orderBy: { id: "asc" },
  });
};

export const createProduct = async (data: {
  id: number;
  name: string;
  brand: string;
  category: string;
  price: number;
  image: string;
  colors: string[];
  taglineLines: string[];
  display?: string;
  chip?: string;
  ram?: string;
  storage?: string;
  battery?: string;
  camera?: string;
  os?: string;
  connectivity?: string;
}) => {
  return prisma.product.create({
    data,
  });
};

export const updateProduct = async (
  id: number,
  data: {
    id?: number;
    name?: string;
    brand?: string;
    category?: string;
    price?: number;
    image?: string;
    colors?: string[];
    taglineLines?: string[];
    display?: string;
    chip?: string;
    ram?: string;
    storage?: string;
    battery?: string;
    camera?: string;
    os?: string;
    connectivity?: string;
  }
) => {
  return prisma.product.update({
    where: { id },
    data,
  });
};

export const deleteProduct = async (id: number) => {
  return prisma.product.delete({
    where: { id },
  });
};