"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Logo from "../assets/logo.png";
import { FaEye, FaEyeSlash, FaGoogle, FaGithub, FaMicrosoft, FaBuilding } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

interface FormErrors {
  email?: string;
  password?: string;
  sso?: string;
}

export default function LoginPage() {
  const router = useRouter();
  const { login, socialLogin, ssoLogin } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showSSO, setShowSSO] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
    ssoDomain: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);
  const [generalError, setGeneralError] = useState("");

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateSSO = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.ssoDomain.trim()) {
      newErrors.sso = "Company domain is required";
    } else if (!formData.ssoDomain.includes(".")) {
      newErrors.sso = "Please enter a valid domain (e.g., company.com)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setGeneralError("");

    const result = await login(formData.email, formData.password, formData.rememberMe);

    if (result.success) {
      router.push("/");
    } else {
      setGeneralError(result.error || "Login failed. Please try again.");
    }

    setLoading(false);
  };

  const handleSocialLogin = async (provider: "google" | "github" | "microsoft") => {
    setSocialLoading(provider);
    setGeneralError("");

    const result = await socialLogin(provider);

    if (result.success) {
      router.push("/");
    } else {
      setGeneralError(result.error || `${provider} login failed. Please try again.`);
    }

    setSocialLoading(null);
  };

  const handleSSOLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateSSO()) return;

    setLoading(true);
    setGeneralError("");

    const result = await ssoLogin(formData.ssoDomain);

    if (result.success) {
      if ("redirectUrl" in result && result.redirectUrl) {
        // In real app, redirect to IdP
        console.log("Redirecting to:", result.redirectUrl);
      }
      router.push("/");
    } else {
      setGeneralError(result.error || "SSO login failed. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link href="/">
              <Image src={Logo} alt="ProdLens" width={120} height={120} className="mx-auto mb-4" />
            </Link>
            <h1 className="text-2xl font-bold text-[#051F61] dark:text-white">
              Welcome back
            </h1>
            <p className="text-custom-text mt-2">
              Sign in to continue to ProdLens
            </p>
          </div>

          {generalError && (
            <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 text-red-700 dark:text-red-300 rounded-lg text-sm">
              {generalError}
            </div>
          )}

          {!showSSO ? (
            <>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-custom-text mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (errors.email) setErrors({ ...errors, email: undefined });
                    }}
                    placeholder="you@example.com"
                    className={`w-full px-4 py-3 border rounded-lg bg-card-bg text-custom-text focus:outline-none focus:ring-2 focus:ring-primary ${
                      errors.email ? "input-error border-red-500" : "border-border-color"
                    }`}
                  />
                  {errors.email && <p className="error-message">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-custom-text mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => {
                        setFormData({ ...formData, password: e.target.value });
                        if (errors.password) setErrors({ ...errors, password: undefined });
                      }}
                      placeholder="Enter your password"
                      className={`w-full px-4 py-3 pr-12 border rounded-lg bg-card-bg text-custom-text focus:outline-none focus:ring-2 focus:ring-primary ${
                        errors.password ? "input-error border-red-500" : "border-border-color"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-custom-text"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {errors.password && <p className="error-message">{errors.password}</p>}
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.rememberMe}
                      onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                      className="w-4 h-4 text-primary border-border-color rounded focus:ring-primary"
                    />
                    <span className="text-sm text-custom-text">Remember me</span>
                  </label>
                  <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </button>
              </form>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border-color" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-background text-gray-500">Or continue with</span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => handleSocialLogin("google")}
                    disabled={!!socialLoading}
                    className="flex items-center justify-center gap-2 px-4 py-3 border border-border-color rounded-lg bg-card-bg text-custom-text hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
                  >
                    {socialLoading === "google" ? (
                      <div className="w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <FaGoogle className="text-red-500" />
                    )}
                    <span className="hidden sm:inline">Google</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSocialLogin("github")}
                    disabled={!!socialLoading}
                    className="flex items-center justify-center gap-2 px-4 py-3 border border-border-color rounded-lg bg-card-bg text-custom-text hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
                  >
                    {socialLoading === "github" ? (
                      <div className="w-5 h-5 border-2 border-gray-500 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <FaGithub />
                    )}
                    <span className="hidden sm:inline">GitHub</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSocialLogin("microsoft")}
                    disabled={!!socialLoading}
                    className="flex items-center justify-center gap-2 px-4 py-3 border border-border-color rounded-lg bg-card-bg text-custom-text hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
                  >
                    {socialLoading === "microsoft" ? (
                      <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <FaMicrosoft className="text-blue-500" />
                    )}
                    <span className="hidden sm:inline">Microsoft</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setShowSSO(true)}
                  className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-3 border border-border-color rounded-lg bg-card-bg text-custom-text hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <FaBuilding className="text-primary" />
                  Sign in with SSO
                </button>
              </div>
            </>
          ) : (
            <>
              <form onSubmit={handleSSOLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-custom-text mb-1">
                    Company Domain
                  </label>
                  <input
                    type="text"
                    value={formData.ssoDomain}
                    onChange={(e) => {
                      setFormData({ ...formData, ssoDomain: e.target.value });
                      if (errors.sso) setErrors({ ...errors, sso: undefined });
                    }}
                    placeholder="yourcompany.com"
                    className={`w-full px-4 py-3 border rounded-lg bg-card-bg text-custom-text focus:outline-none focus:ring-2 focus:ring-primary ${
                      errors.sso ? "input-error border-red-500" : "border-border-color"
                    }`}
                  />
                  {errors.sso && <p className="error-message">{errors.sso}</p>}
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Enter your company domain to sign in with your organization&apos;s identity provider
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Connecting...
                    </>
                  ) : (
                    <>
                      <FaBuilding />
                      Continue with SSO
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowSSO(false);
                    setErrors({});
                  }}
                  className="w-full py-3 border border-border-color text-custom-text rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-medium"
                >
                  Back to login
                </button>
              </form>
            </>
          )}

          <p className="mt-8 text-center text-custom-text">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-primary font-medium hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>

      {/* Right side - Decoration */}
      <div className="hidden lg:flex flex-1 bg-primary items-center justify-center p-8">
        <div className="max-w-md text-white text-center">
          <h2 className="text-3xl font-bold mb-4">
            Manage Your Projects with Ease
          </h2>
          <p className="text-lg opacity-90 mb-8">
            ProdLens helps you stay organized, collaborate with your team, and deliver projects on time.
          </p>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-4xl font-bold">500+</div>
              <div className="text-sm opacity-75">Teams</div>
            </div>
            <div>
              <div className="text-4xl font-bold">10K+</div>
              <div className="text-sm opacity-75">Projects</div>
            </div>
            <div>
              <div className="text-4xl font-bold">99%</div>
              <div className="text-sm opacity-75">Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
