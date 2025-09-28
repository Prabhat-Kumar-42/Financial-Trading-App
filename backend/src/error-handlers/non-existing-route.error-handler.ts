import type { Request, Response, NextFunction } from "express";
import { HttpError } from "../utils/http-error.util.js";

// /src/error-handlers/non-existing-route.error-handler.ts
export function nonExistingRoutesErrorHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const error = new HttpError(
    404,
    "Not Found: The route you requested does not exist."
  );
  next(error);
}