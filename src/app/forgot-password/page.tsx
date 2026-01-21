"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "../assets/logo.png";
import { FaEnvelope, FaArrowLeft, FaCheck } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

interface FormErrors {
  email?: string;
}

export default function ForgotPasswordPage() {
  const { forgotPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [generalError, setGeneralError] = useState("");

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setGeneralError("");

    const result = await forgotPassword(email);

    if (result.success) {
      setSubmitted(true);
    } else {
      setGeneralError(result.error || "Failed to send reset email. Please try again.");
    }

    setLoading(false);
  };

  const handleResend = async () => {
    setLoading(true);
    const result = await forgotPassword(email);
    if (!result.success) {
      setGeneralError(result.error || "Failed to resend email. Please try again.");
    }
    setLoading(false);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-8">
        <div className="w-full max-w-md text-center">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaCheck className="w-10 h-10 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold text-[#051F61] dark:text-white mb-4">
            Check your email
          </h1>
          <p className="text-custom-text mb-2">
            We&apos;ve sent a password reset link to:
          </p>
          <p className="text-primary font-medium mb-6">{email}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
            Click the link in the email to reset your password. If you don&apos;t see the email, check your spam folder.
          </p>

          <div className="space-y-4">
            <button
              onClick={handleResend}
              disabled={loading}
              className="w-full py-3 border border-border-color text-custom-text rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-medium disabled:opacity-50"
            >
              {loading ? "Sending..." : "Resend email"}
            </button>
            <Link
              href="/login"
              className="block w-full py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium text-center"
            >
              Back to login
            </Link>
          </div>

          <p className="mt-8 text-sm text-gray-500 dark:text-gray-400">
            Wrong email?{" "}
            <button
              onClick={() => setSubmitted(false)}
              className="text-primary hover:underline"
            >
              Try again
            </button>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/">
            <Image src={Logo} alt="ProdLens" width={120} height={120} className="mx-auto mb-4" />
          </Link>
          <h1 className="text-2xl font-bold text-[#051F61] dark:text-white">
            Forgot your password?
          </h1>
          <p className="text-custom-text mt-2">
            No worries! Enter your email and we&apos;ll send you a reset link.
          </p>
        </div>

        {generalError && (
          <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 text-red-700 dark:text-red-300 rounded-lg text-sm">
            {generalError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-custom-text mb-1">
              Email address
            </label>
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors({});
                }}
                placeholder="you@example.com"
                className={`w-full pl-12 pr-4 py-3 border rounded-lg bg-card-bg text-custom-text focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.email ? "input-error border-red-500" : "border-border-color"
                }`}
              />
            </div>
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Sending...
              </>
            ) : (
              "Send reset link"
            )}
          </button>
        </form>

        <Link
          href="/login"
          className="mt-6 flex items-center justify-center gap-2 text-custom-text hover:text-primary transition-colors"
        >
          <FaArrowLeft className="w-4 h-4" />
          Back to login
        </Link>
      </div>
    </div>
  );
}
