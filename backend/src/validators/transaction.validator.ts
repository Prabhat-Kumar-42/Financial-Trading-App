import { z } from "zod";

// /server/validators/transaction.validators.ts
export const createTransactionSchema = z.object({
  productId: z.uuid({ message: "Invalid product ID format" }),
  units: z
    .number()
    .int()
    .min(1, { message: "Units must be at least 1" })
    .max(100000, { message: "Units too large" }),
});
