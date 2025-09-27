import {type Request } from "express";

// /src/types/signup.type.ts
export interface SignupRequest extends Request {
  fileUrl?: string; // Added by uploadKycDoc middleware
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
  pan: string;
  kycDocPath: string | null;
}
