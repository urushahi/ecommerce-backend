import { Request, Response } from "express";
import * as productService from "../services/product.service";

export const createProduct = async (req: Request, res: Response) => {
  const product = await productService.createProduct(req.body);
  res.json(product);
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const updatedProduct = await productService.updateProduct(
      +req.params.id,
      req.body
    );
    res.json({ product: updatedProduct });
  } catch (err) {
    res.status(404).json({ error: "Product not found" });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await productService.deleteProduct(+req.params.id);
    res.json(product);
  } catch (err) {
    res.status(404).json({ error: "Product not found" });
  }
};

export const getAllProducts = async (req: Request, res: Response) => {
  const skip = Number(req.query.skip) || 0;
  const products = await productService.getAllProducts(skip, 5);
  res.json(products);
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await productService.getProductById(+req.params.id);
    res.json(product);
  } catch (err) {
    res.status(404).json({ error: "Product not found" });
  }
};

export const searchProducts = async (req: Request, res: Response) => {
  const query = req.query.q?.toString() || "";
  const products = await productService.searchProducts(query);
  res.json(products);
};
