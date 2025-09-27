import prisma from "@/db/prisma.js";

// /src/scripts/product-seed.ts
async function main() {
  await prisma.product.createMany({
    data: [
      { name: "Stock A", category: "Stock", pricePerUnit: 1200, metric: "P/E: 15" },
      { name: "Stock B", category: "Stock", pricePerUnit: 800, metric: "P/E: 12" },
      { name: "Mutual Fund X", category: "Mutual Fund", pricePerUnit: 500, metric: "NAV: 25" },
      { name: "Mutual Fund Y", category: "Mutual Fund", pricePerUnit: 1500, metric: "NAV: 30" },
      { name: "Stock C", category: "Stock", pricePerUnit: 2500, metric: "P/E: 20" },
    ],
  });
}
main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
