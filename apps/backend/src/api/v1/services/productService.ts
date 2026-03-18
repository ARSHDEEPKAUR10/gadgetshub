import prisma from "../../../lib/prisma";

export const getAllProducts = async () => {
  return prisma.product.findMany({
    orderBy: {
      createdAt: "desc"
    }
  });
};

export const getProductById = async (id: number) => {
  return prisma.product.findUnique({
    where: { id }
  });
};