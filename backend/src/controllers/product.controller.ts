import { productService } from "@/services/product.service.js";
import { HttpError } from "@/utils/http-error.util.js";
import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

// /src/controllers/product.controller.ts
export async function listProducts(req: Request, res: Response, next: NextFunction) {
  try {
    const products = await productService.getAllProducts();
    res.json(products);
  } catch (error: any) {
    if (error instanceof ZodError) {
      next(new HttpError(400, "validation error", error));
    }
    next(error)
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
   if (error.name === "ZodError") {
      return res.status(400).json({
        error: "Validation failed",
        details: error.errors,
      });
    }
    res.status(error.status || 500).json({ error: error.message });
  }
}
