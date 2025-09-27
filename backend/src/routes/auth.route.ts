import { login, signup } from "@/controllers/auth.controller.js";
import { uploadKycDoc } from "@/middlewares/upload.middleware.js";
import { Router } from "express";

// /src/routes/auth.route.ts
const router = Router();

router.post("/signup", uploadKycDoc, signup);
router.post("/login", login);

export default router;
