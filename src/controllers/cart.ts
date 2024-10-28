import { Request, Response } from "express";
import { AddToCartSchema, ChangeQuantitySchema } from "../schema/cart";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root";
import { CartItem, Product } from "@prisma/client";
import { prismaClient } from "..";

export const addItemToCart = async (req: Request, res: Response) => {
  const validatedData = AddToCartSchema.parse(req.body);
  let product: Product;
  let cart: CartItem;
  try {
    const cartItem = await prismaClient.cartItem.findFirst({
      where: {
        productId: validatedData.productId,
        userId: req.user.id,
      },
    });

    product = await prismaClient.product.findFirstOrThrow({
      where: {
        id: validatedData.productId,
      },
    });

    if (cartItem) {
      cart = await prismaClient.cartItem.update({
        where: {
          id: cartItem.id,
        },
        data: {
          quantity: cartItem.quantity + validatedData.quantity,
        },
      });
    } else {
      cart = await prismaClient.cartItem.create({
        data: {
          userId: req.user.id,
          productId: product.id,
          quantity: validatedData.quantity,
        },
      });
    }
  } catch (err) {
    throw new NotFoundException(
      "Product not found",
      ErrorCode.PRODUCT_NOT_FOUND
    );
  }

  res.json(cart);
};

export const deleteItemFromCart = async (req: Request, res: Response) => {
  try {
    const cartItem = await prismaClient.cartItem.findFirstOrThrow({
      where: {
        id: +req.params.id,
      },
    });

    if (cartItem.userId !== req.user.id) {
      throw new NotFoundException(
        "Cart item not found",
        ErrorCode.CART_ITEM_NOT_FOUND
      );
    }
  } catch (err) {
    throw err;
  }

  await prismaClient.cartItem.delete({
    where: {
      id: +req.params.id,
    },
  });
  res.json({ success: true });
};

export const changeQuantity = async (req: Request, res: Response) => {
  try {
    const cartItem = await prismaClient.cartItem.findFirstOrThrow({
      where: {
        id: +req.params.id,
      },
    });
    const productId = req.body.productId;
    const checkProduct = await prismaClient.product.findFirstOrThrow({
      where: {
        id: productId,
      },
    });
    if (checkProduct) {
      if (cartItem.userId === req.user.id) {
        const validatedData = ChangeQuantitySchema.parse(req.body);
        const updatedCart = await prismaClient.cartItem.update({
          where: {
            id: +req.params.id,
          },
          data: {
            quantity: validatedData.quantity,
          },
        });
        res.json({
          success: true,
        });
      } else {
        throw new NotFoundException(
          "Cart item not found",
          ErrorCode.CART_ITEM_NOT_FOUND
        );
      }
    } else {
      throw new NotFoundException(
        "Product not found",
        ErrorCode.PRODUCT_NOT_FOUND
      );
    }
  } catch (err) {
    throw new NotFoundException(
      "Cart item not found",
      ErrorCode.CART_ITEM_NOT_FOUND
    );
  }
};

export const getCart = async (req: Request, res: Response) => {
  const cart = await prismaClient.cartItem.findMany({
    where: {
      userId: req.user.id,
    },
    include: {
      product: true,
    },
  });
  res.json(cart);
};
