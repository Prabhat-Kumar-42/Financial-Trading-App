import { getMe } from "@/controllers/user.controller.js";
import { authenticate } from "@/middlewares/auth.middleware.js";
import { Router } from "express";

// /src/routes/user.route.ts
export const userRouter = Router();

userRouter.get("/me", authenticate, getMe);

