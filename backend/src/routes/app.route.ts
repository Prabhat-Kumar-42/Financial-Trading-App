import { Router } from "express";
import { authRouter } from "./auth.route.js";
import { productRouter } from "./product.route.js";

// /src/routes/auth.route.ts
export const appRouter = Router();

appRouter.use('/auth', authRouter);
appRouter.use('/products', productRouter);
