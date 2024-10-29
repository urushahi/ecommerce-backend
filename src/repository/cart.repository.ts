// src/repositories/cart.repository.ts
import { prismaClient } from "..";
import { CartItem, Product } from "@prisma/client";

type cartItem = CartItem & { product: Product };

export const findCartItemByUserAndProduct = async (
  userId: number,
  productId: number
): Promise<CartItem | null> => {
  return prismaClient.cartItem.findFirst({
    where: { userId, productId },
  });
};

export const createCartItem = async (
  userId: number,
  productId: number,
  quantity: number
): Promise<CartItem> => {
  return prismaClient.cartItem.create({
    data: { userId, productId, quantity },
  });
};

export const updateCartItemQuantity = async (
  cartItemId: number,
  quantity: number
): Promise<CartItem> => {
  return prismaClient.cartItem.update({
    where: { id: cartItemId },
    data: { quantity },
  });
};

export const deleteCartItem = async (cartItemId: number): Promise<void> => {
  await prismaClient.cartItem.delete({
    where: { id: cartItemId },
  });
};

export const getUserCartItems = async (userId: number): Promise<CartItem[]> => {
  return prismaClient.cartItem.findMany({
    where: { userId },
    include: { product: true },
  });
};

export const deleteCartItemsByUser = async (userId: number): Promise<void> => {
  await prismaClient.cartItem.deleteMany({
    where: { userId },
  });
};

export const findCartItemsByUser = async (
  userId: number
): Promise<cartItem[]> => {
  return prismaClient.cartItem.findMany({
    where: { userId },
    include: { product: true },
  });
};
