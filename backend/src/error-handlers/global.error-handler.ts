import type { Request, Response, NextFunction } from "express";

// /src/error-handlers/global.error-handler.ts
export function globalErrorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error("Global Error:", err);

  const status = err.status || 500;
  const message = err.message || "Internal server error";
  const details = err.details || undefined;

  res.status(status).json({
    success: false,
    message,
    details,
  });
}