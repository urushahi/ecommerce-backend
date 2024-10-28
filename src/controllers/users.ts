import { Response, Request } from "express";
import { AddressSchema, UpdateUserSchema } from "../schema/users";
import { prismaClient } from "..";
import { ErrorCode } from "../exceptions/root";
import { NotFoundException } from "../exceptions/not-found";
import { BadRequestsException } from "../exceptions/bad-requests";
import { Address } from "@prisma/client";

export const addAddress = async (req: Request, res: Response) => {
  AddressSchema.parse(req.body);

  console.log(req);
  const address = await prismaClient.address.create({
    data: {
      ...req.body,
      userId: req.user?.id,
    },
  });
  res.json(address);
};

export const deleteAddress = async (req: Request, res: Response) => {
  try {
    await prismaClient.address.delete({
      where: {
        id: +req.params.id,
      },
    });
    res.json({ success: true });
  } catch (err) {
    throw new NotFoundException(
      "Address not found",
      ErrorCode.ADDRESS_NOT_FOUND
    );
  }
};

export const listAddress = async (req: Request, res: Response) => {
  const addresses = await prismaClient.address.findMany({
    where: {
      userId: req.user?.id,
    },
  });
  res.json(addresses);
};

export const updateUser = async (req: Request, res: Response) => {
  const validatedData = UpdateUserSchema.parse(req.body);
  let shippingAdress: Address;
  let billingAdress: Address;
  if (validatedData.defaultShippingAddress) {
    try {
      shippingAdress = await prismaClient.address.findFirstOrThrow({
        where: {
          id: validatedData.defaultShippingAddress,
        },
      });
    } catch (err) {
      throw new NotFoundException(
        "Address not found",
        ErrorCode.ADDRESS_NOT_FOUND
      );
    }
    if (shippingAdress.userId !== req.user?.id) {
      throw new BadRequestsException(
        "Address doesn/t belong to user",
        ErrorCode.ADDRESS_DOES_NOT_BELONG_TO_USER
      );
    }
  }
  if (validatedData.defaultBillingAddress) {
    try {
      billingAdress = await prismaClient.address.findFirstOrThrow({
        where: {
          id: validatedData.defaultBillingAddress,
        },
      });
    } catch (err) {
      throw new NotFoundException(
        "Address not found",
        ErrorCode.ADDRESS_NOT_FOUND
      );
    }
    if (billingAdress.userId !== req.user?.id) {
      throw new BadRequestsException(
        "Address doesn/t belong to user",
        ErrorCode.ADDRESS_DOES_NOT_BELONG_TO_USER
      );
    }
  }

  const updatedUser = await prismaClient.user.update({
    where: {
      id: req.user?.id,
    },
    data: validatedData,
  });

  res.json(updatedUser);
};
