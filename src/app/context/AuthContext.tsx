"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  provider?: "email" | "google" | "github" | "microsoft" | "okta";
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<{ success: boolean; error?: string }>;
  signup: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  socialLogin: (provider: "google" | "github" | "microsoft") => Promise<{ success: boolean; error?: string }>;
  ssoLogin: (domain: string) => Promise<{ success: boolean; error?: string; redirectUrl?: string }>;
  forgotPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
  resetPassword: (token: string, password: string) => Promise<{ success: boolean; error?: string }>;
  verifyResetToken: (token: string) => Promise<{ valid: boolean; email?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Simulated user database
const MOCK_USERS: Record<string, { password: string; user: User }> = {
  "demo@prodlens.com": {
    password: "Demo1234",
    user: {
      id: "1",
      name: "Demo User",
      email: "demo@prodlens.com",
      provider: "email",
    },
  },
};

// Simulated reset tokens
const RESET_TOKENS: Record<string, { email: string; expires: number }> = {};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem("auth_user");
    const sessionExpiry = localStorage.getItem("auth_expiry");

    if (savedUser && sessionExpiry) {
      const expiry = parseInt(sessionExpiry);
      if (Date.now() < expiry) {
        setUser(JSON.parse(savedUser));
      } else {
        localStorage.removeItem("auth_user");
        localStorage.removeItem("auth_expiry");
      }
    }
    setIsLoading(false);
  }, []);

  const saveSession = (user: User, rememberMe: boolean = false) => {
    const expiry = rememberMe
      ? Date.now() + 30 * 24 * 60 * 60 * 1000 // 30 days
      : Date.now() + 24 * 60 * 60 * 1000; // 1 day

    localStorage.setItem("auth_user", JSON.stringify(user));
    localStorage.setItem("auth_expiry", expiry.toString());
    setUser(user);
  };

  const login = async (
    email: string,
    password: string,
    rememberMe: boolean = false
  ): Promise<{ success: boolean; error?: string }> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const normalizedEmail = email.toLowerCase();
    const mockUser = MOCK_USERS[normalizedEmail];

    if (mockUser && mockUser.password === password) {
      saveSession(mockUser.user, rememberMe);
      return { success: true };
    }

    // For demo purposes, allow any login with valid format
    if (password.length >= 8) {
      const newUser: User = {
        id: Date.now().toString(),
        name: email.split("@")[0],
        email: normalizedEmail,
        provider: "email",
      };
      saveSession(newUser, rememberMe);
      return { success: true };
    }

    return { success: false, error: "Invalid email or password" };
  };

  const signup = async (
    name: string,
    email: string,
    password: string
  ): Promise<{ success: boolean; error?: string }> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const normalizedEmail = email.toLowerCase();

    // Check if user already exists
    if (MOCK_USERS[normalizedEmail]) {
      return { success: false, error: "An account with this email already exists" };
    }

    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      name,
      email: normalizedEmail,
      provider: "email",
    };

    // Save to mock database
    MOCK_USERS[normalizedEmail] = { password, user: newUser };

    // Auto login after signup
    saveSession(newUser, false);
    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem("auth_user");
    localStorage.removeItem("auth_expiry");
    setUser(null);
    router.push("/login");
  };

  const socialLogin = async (
    provider: "google" | "github" | "microsoft"
  ): Promise<{ success: boolean; error?: string }> => {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Simulate successful social login
    const mockSocialUser: User = {
      id: Date.now().toString(),
      name: `${provider.charAt(0).toUpperCase() + provider.slice(1)} User`,
      email: `user@${provider}.com`,
      provider,
    };

    saveSession(mockSocialUser, true);
    return { success: true };
  };

  const ssoLogin = async (
    domain: string
  ): Promise<{ success: boolean; error?: string; redirectUrl?: string }> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Simulate SSO discovery
    const validDomains = ["company.com", "enterprise.org", "acme.io"];
    const normalizedDomain = domain.toLowerCase();

    if (validDomains.some((d) => normalizedDomain.includes(d))) {
      // In real app, this would redirect to IdP
      return {
        success: true,
        redirectUrl: `https://sso.${normalizedDomain}/auth?client=prodlens`,
      };
    }

    // For demo, simulate successful SSO
    const ssoUser: User = {
      id: Date.now().toString(),
      name: "SSO User",
      email: `user@${normalizedDomain}`,
      provider: "okta",
    };

    saveSession(ssoUser, true);
    return { success: true };
  };

  const forgotPassword = async (
    email: string
  ): Promise<{ success: boolean; error?: string }> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const normalizedEmail = email.toLowerCase();

    // Generate reset token
    const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    RESET_TOKENS[token] = {
      email: normalizedEmail,
      expires: Date.now() + 60 * 60 * 1000, // 1 hour
    };

    // In real app, send email here
    console.log(`Password reset link: /reset-password?token=${token}`);

    // Store token in localStorage for demo purposes
    localStorage.setItem("demo_reset_token", token);
    localStorage.setItem("demo_reset_email", normalizedEmail);

    return { success: true };
  };

  const verifyResetToken = async (
    token: string
  ): Promise<{ valid: boolean; email?: string }> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const tokenData = RESET_TOKENS[token];

    // For demo, also check localStorage
    const demoToken = localStorage.getItem("demo_reset_token");
    const demoEmail = localStorage.getItem("demo_reset_email");

    if (token === demoToken && demoEmail) {
      return { valid: true, email: demoEmail };
    }

    if (tokenData && tokenData.expires > Date.now()) {
      return { valid: true, email: tokenData.email };
    }

    return { valid: false };
  };

  const resetPassword = async (
    token: string,
    password: string
  ): Promise<{ success: boolean; error?: string }> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const { valid, email } = await verifyResetToken(token);

    if (!valid || !email) {
      return { success: false, error: "Invalid or expired reset link" };
    }

    // Update password (in real app, this would update database)
    if (MOCK_USERS[email]) {
      MOCK_USERS[email].password = password;
    }

    // Clear reset token
    delete RESET_TOKENS[token];
    localStorage.removeItem("demo_reset_token");
    localStorage.removeItem("demo_reset_email");

    return { success: true };
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        socialLogin,
        ssoLogin,
        forgotPassword,
        resetPassword,
        verifyResetToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    // Return default values when used outside provider
    return {
      user: null,
      isLoading: false,
      isAuthenticated: false,
      login: async () => ({ success: false, error: "Auth not initialized" }),
      signup: async () => ({ success: false, error: "Auth not initialized" }),
      logout: () => {},
      socialLogin: async () => ({ success: false, error: "Auth not initialized" }),
      ssoLogin: async () => ({ success: false, error: "Auth not initialized" }),
      forgotPassword: async () => ({ success: false, error: "Auth not initialized" }),
      resetPassword: async () => ({ success: false, error: "Auth not initialized" }),
      verifyResetToken: async () => ({ valid: false, email: undefined }),
    };
  }
  return context;
}
