import { transactionService } from "@/services/transaction.service.js";
import type { AuthRequest } from "@/types/auth-request.type.js";
import type { CreateTransactionDTO } from "@/types/transaction-request.type.js";
import { type Response } from "express";

// /src/controllers/transaction.controller.ts
export async function createTransaction(req: AuthRequest, res: Response) {
  try {
    const userId = req.user.id;
    const dto: CreateTransactionDTO = req.body;

    const transaction = await transactionService.createTransaction(userId, dto);
    res.status(201).json(transaction);
  } catch (err: any) {
    res.status(err.status || 500).json({ error: err.message });
  }
}
