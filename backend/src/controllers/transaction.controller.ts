import { transactionService } from "@/services/transaction.service.js";
import type { AuthRequest } from "@/types/auth-request.type.js";
import type { CreateTransactionDTO } from "@/types/transaction-request.type.js";
import { HttpError } from "@/utils/http-error.util.js";
import { createTransactionSchema } from "@/validators/transaction.validator.js";
import { type Response } from "express";

// /src/controllers/transaction.controller.ts

export async function createTransaction(req: AuthRequest, res: Response) {
  try {
    const user = req.user;
    if (!user) throw new HttpError(401, "Not authorized");

    const dto: CreateTransactionDTO = createTransactionSchema.parse(req.body);

    const result = await transactionService.createTransaction(user.id, dto);

    res.status(201).json(result);
  } catch (err: any) {
    if (err.name === "ZodError") {
      return res.status(400).json({
        error: "Validation failed",
        details: err.errors,
      });
    }
    res.status(err.status || 500).json({ error: err.message });
  }
}
