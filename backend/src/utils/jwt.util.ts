import jwt from "jsonwebtoken";

// /src/utils/jwt.util.ts
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  console.error("FATAL: JWT_SECRET is not set. Aborting.");
  process.exit(1);
}

export const generateToken = (userId: string) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1d" });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET) as {
    userId: string;
    iat?: number;
    exp?: number;
  };
};
