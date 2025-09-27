import prisma from "@/db/prisma.js";

// /src/services/product.service.ts
export const productService = {
  getAllProducts: async function () {
    return prisma.product.findMany();
  },

  getProductById: async function (id: string) {
    return prisma.product.findUnique({
      where: { id },
    });
  },
};
