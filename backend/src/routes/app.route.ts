import { Router } from "express";
import { authRouter } from "./auth.route.js";

// /src/routes/auth.route.ts
export const appRouter = Router();

appRouter.use('/auth', authRouter);

