import { Address } from "@prisma/client";
import { prismaClient } from "..";

export const createAddress = async (data: {
  userId: number;
  street: string;
  pincode: string;
  country: string;
  city: string;
}): Promise<Address> => {
  return await prismaClient.address.create({
    data,
  });
};

export const deleteAddress = async (id: number): Promise<Address> => {
  return await prismaClient.address.delete({
    where: {
      id,
    },
  });
};

export const findUserDefaultAddress = async (addressId: number) => {
  return prismaClient.address.findFirst({
    where: { id: addressId },
  });
};
