import multer from "multer";
import path from "path";
import { createClient } from "@supabase/supabase-js";
import { HttpError } from "@/utils/http-error.util.js";

// /src/middlewares/upload.middleware.ts
const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_KEY = process.env.SUPABASE_KEY!;
const SUPABASE_BUCKET = process.env.SUPABASE_BUCKET!;
const FILE_SIZE_LIMIT_MB = Number(process.env.SUPABASE_FILE_SIZE_LIMIT_MB) || 5;

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const isLocal = process.env.NODE_ENV === "local";

const fileFilter = (req: any, file: any, cb: any) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new HttpError(400, "Only images are allowed"), false);
  }
};

const localStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const localUpload = multer({
  storage: localStorage,
  fileFilter,
  limits: { fileSize: FILE_SIZE_LIMIT_MB * 1024 * 1024 }, // dynamic size limit
});

const supabaseStorage = multer({
  storage: multer.memoryStorage(),
  fileFilter,
  limits: { fileSize: FILE_SIZE_LIMIT_MB * 1024 * 1024 },
});

const supabaseUpload = async (req: any, res: any, next: any) => {
  const file = req.file;
  if (!file) {
    return next(new HttpError(400, "KYC document is required"));
  }

  const filePath = `kyc-docs/${Date.now()}-${Math.round(
    Math.random() * 1e9
  )}${path.extname(file.originalname)}`;

  const blob = new Blob([file.buffer], { type: file.mimetype });

  const { error } = await supabase.storage
    .from(SUPABASE_BUCKET)
    .upload(filePath, blob, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    console.error("Supabase upload error:", error);
    return next(new HttpError(500, "Supabase upload failed", error));
  }

  const { data: publicData } = supabase.storage
    .from(SUPABASE_BUCKET)
    .getPublicUrl(filePath);

  req.fileUrl = publicData.publicUrl;
  next();
};

export const uploadKycDoc = (req: any, res: any, next: any) => {
  const multerHandler = isLocal
    ? localUpload.single("kycDoc")
    : supabaseStorage.single("kycDoc");

  multerHandler(req, res, (err: any) => {
    if (err) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return next(
          new HttpError(
            400,
            `File size exceeds limit of ${FILE_SIZE_LIMIT_MB} MB`
          )
        );
      }
      return next(new HttpError(400, err.message));
    }

    if (!req.file) {
      return next(new HttpError(400, "KYC document is required"));
    }

    if (isLocal) {
      req.fileUrl = `/uploads/${req.file.filename}`;
      next();
    } else {
      supabaseUpload(req, res, next);
    }
  });
};
