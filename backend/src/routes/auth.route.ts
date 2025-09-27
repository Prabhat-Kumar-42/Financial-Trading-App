import { login, signup } from "@/controllers/auth.controller.js";
import { uploadKycDoc } from "@/middlewares/upload.middleware.js";
import { Router } from "express";

// /src/routes/auth.route.ts
export const authRouter = Router();

authRouter.post("/signup", uploadKycDoc, signup);
authRouter.post("/login", login);