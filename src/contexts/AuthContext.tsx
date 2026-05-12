import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface UserData {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

interface AuthContextType {
  user: UserData | null;
  loading: boolean;
  login: (email: string, password: string) => string | null;
  signup: (name: string, email: string, password: string) => string | null;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const USERS_KEY = "edualyve_users";
const SESSION_KEY = "edualyve_session";

function getUsers(): Record<string, { name: string; email: string; password: string; id: string; createdAt: string }> {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "{}");
  } catch {
    return {};
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize user from localStorage
    try {
      const session = localStorage.getItem(SESSION_KEY);
      if (session) {
        setUser(JSON.parse(session));
      }
    } catch (error) {
      console.error("Error loading session:", error);
      localStorage.removeItem(SESSION_KEY);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!loading) {
      if (user) {
        localStorage.setItem(SESSION_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(SESSION_KEY);
      }
    }
  }, [user, loading]);

  const signup = (name: string, email: string, password: string): string | null => {
    const users = getUsers();
    const key = email.toLowerCase();
    if (users[key]) return "An account with this email already exists.";
    if (password.length < 6) return "Password must be at least 6 characters.";

    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();
    users[key] = { name, email, password, id, createdAt };
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    setUser({ id, name, email, createdAt });
    return null;
  };

  const login = (email: string, password: string): string | null => {
    const users = getUsers();
    const entry = users[email.toLowerCase()];
    if (!entry || entry.password !== password) return "Invalid email or password.";
    setUser({ id: entry.id, name: entry.name, email: entry.email, createdAt: entry.createdAt });
    return null;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
