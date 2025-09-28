import { getPortfolio } from "@/controllers/portfolio.controller.js";
import { authenticate } from "@/middlewares/auth.middleware.js";
import { Router } from "express";

// /src/routes/portfolio.route.ts
export const portfolioRouter = Router();

portfolioRouter.get("/", authenticate, getPortfolio);
