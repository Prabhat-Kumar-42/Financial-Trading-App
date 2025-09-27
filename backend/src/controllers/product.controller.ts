import { productService } from "@/services/product.service.js";
import { HttpError } from "@/utils/http-error.util.js";
import type { Request, Response } from "express";

// /src/controllers/product.controller.ts
export async function listProducts(req: Request, res: Response) {
  try {
    const products = await productService.getAllProducts();
    res.json(products);
  } catch (error: any) {
    throw new HttpError(500, "Failed to fetch products", error);
  }
}

export async function getProduct(req: Request, res: Response) {
  try {
    const { id } = req.params;
    if(!id) {
      throw new HttpError(400, "Product ID is required");
    }
    const product = await productService.getProductById(id);

    if (!product) {
      throw new HttpError(404, "Product not found");
    }

    res.json(product);
  } catch (error: any) {
    throw new HttpError(500, "Failed to fetch product", error);
  }
}
