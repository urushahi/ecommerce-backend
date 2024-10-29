// src/repositories/order.repository.ts
import { OrderEventStatus } from "@prisma/client";
import { prismaClient } from "..";

export const createOrder = async (
  userId: number,
  netAmount: number,
  address: string,
  products: any
) => {
  return prismaClient.order.create({
    data: { userId, netAmount, address, products },
  });
};

export const findOrdersByUser = async (userId: number) => {
  return prismaClient.order.findMany({
    where: { userId },
  });
};

export const updateOrderStatus = async (
  orderId: number,
  status: OrderEventStatus
) => {
  return prismaClient.order.update({
    where: { id: orderId },
    data: { status },
  });
};

export const findOrderById = async (orderId: number) => {
  return prismaClient.order.findFirstOrThrow({
    where: { id: orderId },
    include: { products: true, events: true },
  });
};

export const findAllOrders = async (filters: any) => {
  return prismaClient.order.findMany(filters);
};
