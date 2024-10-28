import { z } from "zod";

export const SignupSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const AddressSchema = z.object({
  street: z.string(),
  pincode: z.string().length(6),
  country: z.string(),
  city: z.string(),
});


export const UpdateUserSchema = z.object({
  name: z.string().optional(),
  defaultShippingAddress: z.number().nullable(),
  defaultBillingAddress: z.number().nullable(),
});