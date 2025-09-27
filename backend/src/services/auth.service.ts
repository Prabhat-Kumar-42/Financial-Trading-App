import prisma from "@/db/prisma.js";
import type { SignupData } from "@/types/signup.type.js";
import { HttpError } from "@/utils/http-error.util.js";
import { generateToken } from "@/utils/jwt.util.js";
import bcrypt from "bcrypt";

// /src/services/auth.service.ts
export const authService = {
  signup: async function (data: SignupData) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        pan: data.pan,
        kycDocPath: data.kycDocPath,
        walletBalance: 100000, // initial wallet
      },
    });

    const token = generateToken(user.id);
    return { user, token };
  },

  login: async function (email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new HttpError(401, "Invalid credentials");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new HttpError(401, "Invalid credentials");

    const token = generateToken(user.id);
    return { user, token };
  },
};
