import { Address, Role } from "@prisma/client";
import { createAddress, deleteAddress } from "../repository/address.repository";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root";
import * as userRepository from "../repository/user.repository";
import { UpdateUserSchema } from "../schema/users";
import { BadRequestsException } from "../exceptions/bad-requests";

export const createAddressService = async (data: {
  userId: number;
  street: string;
  pincode: string;
  country: string;
  city: string;
}): Promise<Address> => {
  return await createAddress(data);
};

export const deleteAddressService = async (id: number): Promise<boolean> => {
  try {
    await deleteAddress(id);
    return true;
  } catch (err: any) {
    if (err instanceof NotFoundException) {
      throw new NotFoundException(
        "Address not found",
        ErrorCode.ADDRESS_NOT_FOUND
      );
    }
    if (err?.code === "P2025") {
      throw new NotFoundException(
        "Address not found",
        ErrorCode.ADDRESS_NOT_FOUND
      );
    }
    throw err;
  }
};

export const listAddressesByUser = async (userId: number) => {
  return userRepository.findAddressById(userId);
};

export const updateUserService = async (userId: number, data: any) => {
  const validatedData = UpdateUserSchema.parse(data);
  const { defaultShippingAddress, defaultBillingAddress } = validatedData;

  if (defaultShippingAddress) {
    const shippingAddress = await userRepository.findAddressById(
      defaultShippingAddress
    );
    if (shippingAddress.userId !== userId) {
      throw new BadRequestsException(
        "Address does not belong to user",
        ErrorCode.ADDRESS_DOES_NOT_BELONG_TO_USER
      );
    }
  }

  if (defaultBillingAddress) {
    const billingAddress = await userRepository.findAddressById(
      defaultBillingAddress
    );
    if (billingAddress.userId !== userId) {
      throw new BadRequestsException(
        "Address does not belong to user",
        ErrorCode.ADDRESS_DOES_NOT_BELONG_TO_USER
      );
    }
  }

  return userRepository.updateUser(userId, validatedData);
};

export const getUserByIdService = async (userId: number) => {
  try {
    return await userRepository.findUserById(userId);
  } catch {
    throw new NotFoundException("User not found", ErrorCode.USER_NOT_FOUND);
  }
};

export const listUsersService = async (skip = 0, take = 5) => {
  return userRepository.listUsers(skip, take);
};

export const changeUserRoleService = async (userId: number, role: Role) => {
  try {
    return await userRepository.changeUserRole(userId, role);
  } catch {
    throw new NotFoundException("User not found", ErrorCode.USER_NOT_FOUND);
  }
};
