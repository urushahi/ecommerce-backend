import { hashSync } from "bcrypt";
import { prismaClient } from "..";
import { Address, Role, User } from "@prisma/client";

export const createUser = async (data: {
  email: string;
  password: string;
  name: string;
}) => {
  const { email, password, name } = data;
  return await prismaClient.user.create({
    data: {
      email,
      password: hashSync(password, 10),
      name,
    },
  });
};

export const getUserByEmail = async (email: string) => {
  return await prismaClient.user.findFirst({
    where: {
      email,
    },
  });
};

export const updateUser = async (userId: number, data: any): Promise<User> => {
  return prismaClient.user.update({
    where: { id: userId },
    data,
  });
};

export const findUserById = async (userId: number) => {
  return prismaClient.user.findFirstOrThrow({
    where: { id: userId },
    include: { addresses: true },
  });
};

export const listUsers = async (skip: number, take: number) => {
  return prismaClient.user.findMany({ skip, take });
};

export const changeUserRole = async (userId: number, role: Role) => {
  return prismaClient.user.update({
    where: { id: userId },
    data: { role },
  });
};

export const findAddressById = async (id: number): Promise<Address> => {
  return prismaClient.address.findFirstOrThrow({ where: { id } });
};
