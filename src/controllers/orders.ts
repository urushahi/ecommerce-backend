import { Request, Response } from "express";
import * as orderService from "../services/order.service";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root";

export const createOrder = async (req: Request, res: Response) => {
  try {
    const order = await orderService.createOrder(req.user.id);
    res.json(order);
  } catch (err) {
    res.status(400).json({ message: "Cart is empty" });
  }
};

export const listOrders = async (req: Request, res: Response) => {
  const orders = await orderService.listOrders(req.user.id);
  res.json(orders);
};

export const cancelOrder = async (req: Request, res: Response) => {
  try {
    const order = await orderService.cancelOrder(+req.params.id);
    res.json(order);
  } catch (err) {
    throw new NotFoundException("Order not found", ErrorCode.ORDER_NOT_FOUND);
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  try {
    const order = await orderService.getOrderById(+req.params.id);
    res.json(order);
  } catch (err) {
    throw new NotFoundException("Order not found", ErrorCode.ORDER_NOT_FOUND);
  }
};

export const changeStatus = async (req: Request, res: Response) => {
  try {
    const order = await orderService.changeStatus(+req.params.id, req.body.status);
    res.json(order);
  } catch (err) {
    throw new NotFoundException("Order not found", ErrorCode.ORDER_NOT_FOUND);
  }
};

export const listUserOrders = async (req: Request, res: Response) => {
  const orders = await orderService.listUserOrders(+req.params.id, req.params.status, Number(req.query.skip));
  res.json(orders);
};
