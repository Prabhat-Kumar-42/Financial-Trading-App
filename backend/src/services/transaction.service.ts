import prisma from "@/db/prisma.js";
import type { CreateTransactionDTO } from "@/types/transaction-request.type.js";
import { HttpError } from "@/utils/http-error.util.js";

// /src/services/transaction.service.ts
export const transactionService = {
  createTransaction: async function (
    userId: string,
    dto: CreateTransactionDTO
  ) {
    const product = await prisma.product.findUnique({
      where: { id: dto.productId },
    });
    if (!product) throw new HttpError(404, "Product not found");

    const amount = product.pricePerUnit * dto.units;

    const [updatedUser, transaction] = await prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({ where: { id: userId } });
      if (!user) throw new HttpError(404, "User not found");

      if (user.walletBalance < amount) {
        throw new HttpError(400, "Insufficient wallet balance");
      }

      // Deduct wallet balance
      const updated = await tx.user.update({
        where: { id: userId },
        data: { walletBalance: user.walletBalance - amount },
      });

      // Check if a transaction already exists for this product
      const existingTx = await tx.transaction.findFirst({
        where: { userId, productId: dto.productId },
      });

      let trans;
      if (existingTx) {
        // Update existing transaction
        trans = await tx.transaction.update({
          where: { id: existingTx.id },
          data: {
            units: existingTx.units + dto.units,
            amount: existingTx.amount + amount,
          },
        });
      } else {
        // Create new transaction
        trans = await tx.transaction.create({
          data: {
            userId,
            productId: dto.productId,
            units: dto.units,
            amount,
          },
        });
      }

      return [updated, trans] as const;
    });

    return { transaction, updatedBalance: updatedUser.walletBalance };
  },
};
