import { OrderEventStatus } from "@prisma/client";
import { prismaClient } from "..";

export const createOrderEvent = async (
  orderId: number,
  status: OrderEventStatus
): Promise<{ orderId: number; status: OrderEventStatus }> => {
  return prismaClient.orderEvent.create({
    data: { orderId, status },
  });
};
