import { Request, Response } from "express";
import * as cartService from "../services/cart.service";
import { AddToCartSchema, ChangeQuantitySchema } from "../schema/cart";

export const addItemToCart = async (req: Request, res: Response) => {
  const validatedData = AddToCartSchema.parse(req.body);
  const cartItem = await cartService.addItemToCart(
    req.user.id,
    validatedData.productId,
    validatedData.quantity
  );
  res.json(cartItem);
};

export const deleteItemFromCart = async (req: Request, res: Response) => {
  await cartService.deleteItemFromCart(req.user.id, +req.params.id);
  res.json({ success: true });
};

export const changeQuantity = async (req: Request, res: Response) => {
  const validatedData = ChangeQuantitySchema.parse(req.body);
  const updatedCart = await cartService.changeCartItemQuantity(
    req.user.id,
    +req.params.id,
    validatedData.quantity
  );
  res.json(updatedCart);
};

export const getCart = async (req: Request, res: Response) => {
  const cart = await cartService.getUserCart(req.user.id);
  res.json(cart);
};
