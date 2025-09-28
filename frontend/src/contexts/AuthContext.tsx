"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

// /src/contexts/AuthContext.tsx
type User = {
  id: string;
  name: string;
  email: string;
  walletBalance?: number;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  loading: boolean; 
  login: (token: string, user: Partial<User>) => void;
  logout: () => void;
  updateWallet: (balance: number) => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // new
  const router = useRouter();

  // Restore session from localStorage (client-side only)
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
    setLoading(false); // restoration done
  }, []);

  const login = (tokenStr: string, userData: Partial<User>) => {
    const normalized: User = {
      id: userData.id ?? "",
      name: userData.name ?? "",
      email: userData.email ?? "",
      walletBalance: userData.walletBalance ?? 100000,
    };
    setToken(tokenStr);
    setUser(normalized);
    localStorage.setItem("token", tokenStr);
    localStorage.setItem("user", JSON.stringify(normalized));
    toast.success("Logged in successfully!");
    router.push("/products");
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast("Logged out.");
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
    <AuthContext.Provider
      value={{ user, token, loading, login, logout, updateWallet }}
    >
      {children}
    </AuthContext.Provider>
  );
}
