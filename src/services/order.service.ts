import * as orderRepository from "../repository/order.repository";
import * as cartRepository from "../repository/cart.repository";
import * as addressRepository from "../repository/address.repository";
import * as orderEventRepository from "../repository/orderEvent.repository";
import { OrderEventStatus } from "@prisma/client";

export const createOrder = async (userId: number) => {
  const cartItems = await cartRepository.findCartItemsByUser(userId);
  if (cartItems.length === 0) throw new Error("Cart is empty");

  const netAmount = cartItems.reduce(
    (sum, item) => sum + item.quantity * +item.product.price,
    0
  );

  const address = await addressRepository.findUserDefaultAddress(userId);
  const order = await orderRepository.createOrder(
    userId,
    netAmount,
    address?.formattedAddress ?? "",
    cartItems
  );

  await orderEventRepository.createOrderEvent(order.id, "PENDING");
  await cartRepository.deleteCartItemsByUser(userId);

  return order;
};

export const listOrders = async (userId: number) => {
  return orderRepository.findOrdersByUser(userId);
};

export const cancelOrder = async (orderId: number) => {
  const order = await orderRepository.updateOrderStatus(orderId, "CANCELLED");
  await orderEventRepository.createOrderEvent(order.id, "CANCELLED");
  return order;
};

export const getOrderById = async (orderId: number) => {
  return orderRepository.findOrderById(orderId);
};

export const changeStatus = async (
  orderId: number,
  status: OrderEventStatus
) => {
  const order = await orderRepository.updateOrderStatus(orderId, status);
  await orderEventRepository.createOrderEvent(order.id, status);
  return order;
};

export const listUserOrders = async (
  userId: number,
  status?: string,
  skip?: number
) => {
  const filters: any = { where: { userId } };
  if (status) filters.where.status = status;
  filters.skip = skip;
  filters.take = 5;

  return orderRepository.findAllOrders(filters);
};
