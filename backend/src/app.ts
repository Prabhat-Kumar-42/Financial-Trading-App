import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { nonExistingRoutesErrorHandler } from "./error-handlers/non-existing-route.error-handler.js";
import { jwtErrorHandler } from "./error-handlers/jwt.error-handler.js";
import { globalErrorHandler } from "./error-handlers/global.error-handler.js";
import { appRouter } from "./routes/app.route.js";

// /src/app.ts
dotenv.config();
export const app = express();

app.use(cors());
app.use(express.json());

// Static file serving (uploads)
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api', appRouter);
// health check endpoint 
app.get("/healthz", (req, res) => res.send("Mini Finance API running"));

// Error handlers
app.use(nonExistingRoutesErrorHandler);
app.use(jwtErrorHandler);
app.use(globalErrorHandler);
