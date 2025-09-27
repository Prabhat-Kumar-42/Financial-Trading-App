import { add, list, remove } from "@/controllers/watchlist.controller.js";
import { authenticate } from "@/middlewares/auth.middleware.js";
import { Router } from "express";

// /src/routes/watchlist.route.ts
export const watchListRouter = Router();

watchListRouter.post("/", authenticate, add);
watchListRouter.delete("/", authenticate, remove);
watchListRouter.get("/", authenticate, list);
