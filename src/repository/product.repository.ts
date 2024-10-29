import { Product } from "@prisma/client";
import { prismaClient } from "..";

export const findProductById = async (id: number): Promise<Product> => {
  return prismaClient.product.findFirstOrThrow({
    where: { id },
  });
};

export const createProduct = async (data: any): Promise<Product> => {
  return prismaClient.product.create({ data });
};

export const updateProduct = async (
  id: number,
  data: any
): Promise<Product> => {
  return prismaClient.product.update({
    where: { id },
    data,
  });
};

export const deleteProduct = async (id: number): Promise<Product> => {
  return prismaClient.product.delete({
    where: { id },
  });
};

export const getAllProducts = async (skip: number, take: number) => {
  const count = await prismaClient.product.count();
  const products = await prismaClient.product.findMany({
    skip,
    take,
  });
  return { count, products };
};

export const searchProducts = async (query: string) => {
  return prismaClient.product.findMany({
    where: {
      OR: [
        { name: { search: query } },
        { description: { search: query } },
        { tag: { search: query } },
      ],
    },
  });
};
