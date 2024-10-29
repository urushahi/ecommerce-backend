import { Request, Response, NextFunction } from "express";
import * as userService from "../services/user.service";

export const addAddress = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const address = await userService.createAddressService({
      ...req.body,
      userId: req.user?.id,
    });
    res.json(address);
  } catch (err) {
    next(err);
  }
};

export const deleteAddress = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await userService.deleteAddressService(+req.params.id);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

export const listAddress = async (req: Request, res: Response) => {
  const addresses = await userService.listAddressesByUser(req.user.id);
  res.json(addresses);
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const updatedUser = await userService.updateUserService(
      req.user.id,
      req.body
    );
    res.json(updatedUser);
  } catch (err) {
    next(err);
  }
};

export const listUsers = async (req: Request, res: Response) => {
  const skip = Number(req.query.skip) || 0;
  const users = await userService.listUsersService(skip, 5);
  res.json(users);
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userService.getUserByIdService(+req.params.id);
    res.json(user);
  } catch (err) {
    next(err);
  }
};

export const changeUserRole = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userService.changeUserRoleService(
      +req.params.id,
      req.body.role
    );
    res.json(user);
  } catch (err) {
    next(err);
  }
};
