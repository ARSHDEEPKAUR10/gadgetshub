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