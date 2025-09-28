import { getProduct, listProducts } from "@/controllers/product.controller.js";
import { authenticate } from "@/middlewares/auth.middleware.js";
import { Router } from "express";

// /src/routes/product.route.ts
export const productRouter = Router();

productRouter.get("/", authenticate, listProducts);
productRouter.get("/:id", authenticate, getProduct);

