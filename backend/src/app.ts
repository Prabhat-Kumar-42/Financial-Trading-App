import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// /src/app.ts
dotenv.config();
export const app = express();

app.use(cors());
app.use(express.json());

app.get("/healthz", (req, res) => res.send("Mini Finance API running"));

