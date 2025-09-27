import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { nonExistingRoutesErrorHandler } from "./error-handlers/non-existing-route.error-handler.js";
import { jwtErrorHandler } from "./error-handlers/jwt.error-handler.js";
import { globalErrorHandler } from "./error-handlers/global.error-handler.js";

// /src/app.ts
dotenv.config();
export const app = express();

app.use(cors());
app.use(express.json());

app.get("/healthz", (req, res) => res.send("Mini Finance API running"));

// Handle non-existing routes
app.use(nonExistingRoutesErrorHandler);

// JWT error handling
app.use(jwtErrorHandler);

// Global error handler
app.use(globalErrorHandler);
