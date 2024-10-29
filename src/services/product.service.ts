// src/services/product.service.ts
import * as productRepository from "../repository/product.repository";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root";

export const createProduct = async (data: any) => {
  const productData = { ...data, tag: data.tag.join(",") };
  return productRepository.createProduct(productData);
};

export const updateProduct = async (id: number, data: any) => {
  try {
    if (data.tag) data.tag = data.tag.join(",");
    return await productRepository.updateProduct(id, data);
  } catch (error) {
    throw new NotFoundException("Product not found", ErrorCode.PRODUCT_NOT_FOUND);
  }
};

export const deleteProduct = async (id: number) => {
  try {
    return await productRepository.deleteProduct(id);
  } catch (error) {
    throw new NotFoundException("Product not found", ErrorCode.PRODUCT_NOT_FOUND);
  }
};

export const getAllProducts = async (skip: number = 0, take: number = 5) => {
  return await productRepository.getAllProducts(skip, take);
};

export const getProductById = async (id: number) => {
  try {
    return await productRepository.findProductById(id);
  } catch (error) {
    throw new NotFoundException("Product not found", ErrorCode.PRODUCT_NOT_FOUND);
  }
};

export const searchProducts = async (query: string) => {
  return await productRepository.searchProducts(query);
};
