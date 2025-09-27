import { authService } from "@/services/auth.service.js";
import type { SignupData, SignupRequest } from "@/types/signup.type.js";
import { HttpError } from "@/utils/http-error.util.js";
import { loginSchema, signupSchema } from "@/validators/auth.validator.js";
import type { NextFunction, Response } from "express";

// /src/controllers/auth.controller.ts
export const signup = async (req: SignupRequest, res: Response, next: NextFunction) => {
  try {
    const parsed = signupSchema.parse(req.body);
    const kycDocPath = req.fileUrl;

    const signupData: any = { ...parsed };
    if (kycDocPath) signupData.kycDocPath = kycDocPath;

    const result = await authService.signup(signupData);
    res.status(201).json({ success: true, data: result });
  } catch (error: any) {
    if (error.name === "ZodError") {
      return next(new HttpError(400, "Validation Error", error.errors));
    }
    next(new HttpError(400, error.message));
  }
};

export const login = async (req: SignupRequest, res: Response, next: NextFunction) => {
  try {
    const parsed = loginSchema.parse(req.body);
    const result = await authService.login(parsed.email, parsed.password);
    res.json({ success: true, data: result });
  } catch (error: any) {
    if (error.name === "ZodError") {
      return next(new HttpError(400, "Validation Error", error.errors));
    }
    next(new HttpError(400, error.message));
  }
};