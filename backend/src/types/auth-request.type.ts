import type { Request } from "express";

// /src/types/auth-request.type.ts
export interface AuthRequest extends Request {
  user?: { id: string };
}
