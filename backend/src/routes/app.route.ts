import { Router } from "express";
import { authRouter } from "./auth.route.js";
import { productRouter } from "./product.route.js";
import { portfolioRouter } from "./portfolio.route.js";
import { transactionRouter } from "./transaction.route.js";
import { watchListRouter } from "./watchlist.route.js";
import { userRouter } from "./user.route.js";

// /src/routes/auth.route.ts
export const appRouter = Router();

appRouter.use('/auth', authRouter);
appRouter.use('/products', productRouter);
appRouter.use("/transactions", transactionRouter);
appRouter.use("/portfolio", portfolioRouter);
appRouter.use("/watchlist", watchListRouter);
appRouter.use("/users", userRouter);

