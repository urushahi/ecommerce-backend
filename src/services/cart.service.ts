// src/services/cart.service.ts
import { CartItem } from "@prisma/client";
import * as cartRepository from "../repository/cart.repository";
import * as productRepository from "../repository/product.repository";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root";

export const addItemToCart = async (
  userId: number,
  productId: number,
  quantity: number
): Promise<CartItem> => {
  const product = await productRepository.findProductById(productId);
  if (!product)
    throw new NotFoundException(
      "Product not found",
      ErrorCode.PRODUCT_NOT_FOUND
    );

  const cartItem = await cartRepository.findCartItemByUserAndProduct(
    userId,
    productId
  );
  if (cartItem) {
    return cartRepository.updateCartItemQuantity(
      cartItem.id,
      cartItem.quantity + quantity
    );
  }

  return cartRepository.createCartItem(userId, productId, quantity);
};

export const deleteItemFromCart = async (
  userId: number,
  cartItemId: number
): Promise<void> => {
  const cartItem = await cartRepository.findCartItemByUserAndProduct(
    userId,
    cartItemId
  );
  if (!cartItem || cartItem.userId !== userId)
    throw new NotFoundException(
      "Cart item not found",
      ErrorCode.CART_ITEM_NOT_FOUND
    );

  await cartRepository.deleteCartItem(cartItemId);
};

export const changeCartItemQuantity = async (
  userId: number,
  cartItemId: number,
  quantity: number
): Promise<CartItem> => {
    console.log(cartItemId, userId);
  const cartItem = await cartRepository.findCartItemByUserAndProduct(
    userId,
    cartItemId
  );
  console.log(cartItem, userId);
  if (!cartItem || cartItem.userId !== userId)
    throw new NotFoundException(
      "Cart item not found",
      ErrorCode.CART_ITEM_NOT_FOUND
    );

  return cartRepository.updateCartItemQuantity(cartItemId, quantity);
};

export const getUserCart = async (userId: number): Promise<CartItem[]> => {
  return cartRepository.getUserCartItems(userId);
};
