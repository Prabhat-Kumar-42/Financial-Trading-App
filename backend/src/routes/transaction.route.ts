import { createTransaction } from "@/controllers/transaction.controller.js";
import { authenticate } from "@/middlewares/auth.middleware.js";
import { Router } from "express";

// /src/routes/transaction.route.ts
export const transactionRouter = Router();

transactionRouter.post("/", authenticate, createTransaction);

