"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Logo from "../assets/logo.png";
import { FaEye, FaEyeSlash, FaCheck, FaLock, FaExclamationTriangle } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

interface FormErrors {
  password?: string;
  confirmPassword?: string;
}

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { resetPassword, verifyResetToken } = useAuth();

  const [token, setToken] = useState<string | null>(null);
  const [tokenValid, setTokenValid] = useState<boolean | null>(null);
  const [tokenEmail, setTokenEmail] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [generalError, setGeneralError] = useState("");

  const passwordRequirements = [
    { met: formData.password.length >= 8, text: "At least 8 characters" },
    { met: /[A-Z]/.test(formData.password), text: "One uppercase letter" },
    { met: /[a-z]/.test(formData.password), text: "One lowercase letter" },
    { met: /\d/.test(formData.password), text: "One number" },
  ];

  useEffect(() => {
    const tokenParam = searchParams.get("token");
    setToken(tokenParam);

    if (tokenParam) {
      verifyResetToken(tokenParam).then((result) => {
        setTokenValid(result.valid);
        if (result.email) {
          setTokenEmail(result.email);
        }
      });
    } else {
      // For demo, check localStorage
      const demoToken = localStorage.getItem("demo_reset_token");
      if (demoToken) {
        setToken(demoToken);
        verifyResetToken(demoToken).then((result) => {
          setTokenValid(result.valid);
          if (result.email) {
            setTokenEmail(result.email);
          }
        });
      } else {
        setTokenValid(false);
      }
    }
  }, [searchParams, verifyResetToken]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!passwordRequirements.every((req) => req.met)) {
      newErrors.password = "Password does not meet requirements";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm() || !token) return;

    setLoading(true);
    setGeneralError("");

    const result = await resetPassword(token, formData.password);

    if (result.success) {
      setSuccess(true);
    } else {
      setGeneralError(result.error || "Failed to reset password. Please try again.");
    }

    setLoading(false);
  };

  // Loading state
  if (tokenValid === null) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-8">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-custom-text">Verifying reset link...</p>
        </div>
      </div>
    );
  }

  // Invalid token
  if (tokenValid === false) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-8">
        <div className="w-full max-w-md text-center">
          <div className="w-20 h-20 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaExclamationTriangle className="w-10 h-10 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold text-[#051F61] dark:text-white mb-4">
            Invalid or expired link
          </h1>
          <p className="text-custom-text mb-8">
            This password reset link is invalid or has expired. Please request a new one.
          </p>
          <div className="space-y-4">
            <Link
              href="/forgot-password"
              className="block w-full py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium text-center"
            >
              Request new link
            </Link>
            <Link
              href="/login"
              className="block w-full py-3 border border-border-color text-custom-text rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-medium text-center"
            >
              Back to login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Success state
  if (success) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-8">
        <div className="w-full max-w-md text-center">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaCheck className="w-10 h-10 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold text-[#051F61] dark:text-white mb-4">
            Password reset successful!
          </h1>
          <p className="text-custom-text mb-8">
            Your password has been successfully reset. You can now sign in with your new password.
          </p>
          <Link
            href="/login"
            className="block w-full py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium text-center"
          >
            Sign in
          </Link>
        </div>
      </div>
    );
  }

  // Reset form
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/">
            <Image src={Logo} alt="ProdLens" width={120} height={120} className="mx-auto mb-4" />
          </Link>
          <h1 className="text-2xl font-bold text-[#051F61] dark:text-white">
            Create new password
          </h1>
          {tokenEmail && (
            <p className="text-custom-text mt-2">
              for <span className="text-primary font-medium">{tokenEmail}</span>
            </p>
          )}
        </div>

        {generalError && (
          <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 text-red-700 dark:text-red-300 rounded-lg text-sm">
            {generalError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-custom-text mb-1">
              New Password
            </label>
            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value });
                  if (errors.password) setErrors({ ...errors, password: undefined });
                }}
                placeholder="Enter new password"
                className={`w-full pl-12 pr-12 py-3 border rounded-lg bg-card-bg text-custom-text focus:outline-none focus:ring-2 focus:ring-primary ${
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

            {/* Password requirements */}
            <div className="mt-3 grid grid-cols-2 gap-2">
              {passwordRequirements.map((req, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-2 text-xs ${
                    req.met ? "text-green-600 dark:text-green-400" : "text-gray-400"
                  }`}
                >
                  <FaCheck className={`w-3 h-3 ${req.met ? "opacity-100" : "opacity-30"}`} />
                  {req.text}
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-custom-text mb-1">
              Confirm New Password
            </label>
            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={(e) => {
                  setFormData({ ...formData, confirmPassword: e.target.value });
                  if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: undefined });
                }}
                placeholder="Confirm new password"
                className={`w-full pl-12 pr-12 py-3 border rounded-lg bg-card-bg text-custom-text focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.confirmPassword ? "input-error border-red-500" : "border-border-color"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-custom-text"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
            {formData.confirmPassword && formData.password === formData.confirmPassword && (
              <p className="text-xs text-green-600 dark:text-green-400 mt-1 flex items-center gap-1">
                <FaCheck /> Passwords match
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Resetting password...
              </>
            ) : (
              "Reset password"
            )}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          Remember your password?{" "}
          <Link href="/login" className="text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center p-8">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-custom-text">Loading...</p>
          </div>
        </div>
      }
    >
      <ResetPasswordContent />
    </Suspense>
  );
}
