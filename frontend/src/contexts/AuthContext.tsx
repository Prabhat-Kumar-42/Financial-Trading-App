"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";

// /src/contexts/AuthContext.tsx

type User = {
  id: string;
  name: string;
  email: string;
  walletBalance?: number; // added
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  login: (token: string, user: Partial<User>) => void;
  logout: () => void;
  updateWallet: (balance: number) => void; // new
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  // Restore session from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (storedToken && storedUser) {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem("user");
      }
    }
  }, []);

  const login = (tokenStr: string, userData: Partial<User>) => {
    // Accept partial user and normalise
    const normalized: User = {
      id: userData.id ?? "",
      name: userData.name ?? "",
      email: userData.email ?? "",
      walletBalance: userData.walletBalance ?? 100000, // fallback if backend not returning it
    };
    setToken(tokenStr);
    setUser(normalized);
    localStorage.setItem("token", tokenStr);
    localStorage.setItem("user", JSON.stringify(normalized));
    router.push("/products");
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  const updateWallet = (balance: number) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, walletBalance: balance };
      localStorage.setItem("user", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, updateWallet }}>
      {children}
    </AuthContext.Provider>
  );
}
