"use client";

import { useState } from "react";
import { FaBug, FaLightbulb, FaExclamationTriangle, FaPaperPlane, FaCheck } from "react-icons/fa";

interface FormErrors {
  type?: string;
  subject?: string;
  description?: string;
  email?: string;
}

type ReportType = "bug" | "feature" | "other";

export default function ReportPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    type: "" as ReportType | "",
    subject: "",
    description: "",
    email: "",
    priority: "medium",
    attachScreenshot: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const reportTypes = [
    {
      id: "bug",
      label: "Bug Report",
      icon: FaBug,
      description: "Something isn't working correctly",
      color: "text-red-500",
    },
    {
      id: "feature",
      label: "Feature Request",
      icon: FaLightbulb,
      description: "Suggest a new feature or improvement",
      color: "text-yellow-500",
    },
    {
      id: "other",
      label: "Other Feedback",
      icon: FaExclamationTriangle,
      description: "General feedback or questions",
      color: "text-blue-500",
    },
  ];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.type) {
      newErrors.type = "Please select a report type";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    } else if (formData.subject.trim().length < 5) {
      newErrors.subject = "Subject must be at least 5 characters";
    } else if (formData.subject.trim().length > 100) {
      newErrors.subject = "Subject must be less than 100 characters";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.trim().length < 20) {
      newErrors.description = "Please provide more details (at least 20 characters)";
    } else if (formData.description.trim().length > 2000) {
      newErrors.description = "Description must be less than 2000 characters";
    }

    if (formData.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Please enter a valid email address";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    // In a real app, this would send the report to a server
    console.log("Report submitted:", formData);
    setSubmitted(true);
  };

  const resetForm = () => {
    setFormData({
      type: "",
      subject: "",
      description: "",
      email: "",
      priority: "medium",
      attachScreenshot: false,
    });
    setErrors({});
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className="p-8 bg-background min-h-screen flex items-center justify-center">
        <div className="bg-card-bg rounded-lg shadow-lg border border-border-color p-8 max-w-md text-center">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaCheck className="w-8 h-8 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-[#051F61] dark:text-white mb-2">
            Report Submitted!
          </h2>
          <p className="text-custom-text mb-6">
            Thank you for your feedback. Our team will review your report and get back to you
            within 24-48 hours if a response is needed.
          </p>
          <button
            onClick={resetForm}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            Submit Another Report
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-background min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#051F61] dark:text-white mb-2">
          Report an Issue
        </h1>
        <p className="text-custom-text">
          Help us improve by reporting bugs or suggesting new features
        </p>
      </div>

      <div className="max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Report Type Selection */}
          <div>
            <label className="block text-sm font-medium text-custom-text mb-3">
              What would you like to report? *
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {reportTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => {
                      setFormData({ ...formData, type: type.id as ReportType });
                      if (errors.type) setErrors({ ...errors, type: undefined });
                    }}
                    className={`p-4 rounded-lg border-2 text-left transition-all ${
                      formData.type === type.id
                        ? "border-primary bg-primary/10"
                        : "border-border-color hover:border-primary/50 bg-card-bg"
                    }`}
                  >
                    <Icon className={`w-8 h-8 ${type.color} mb-2`} />
                    <h3 className="font-medium text-custom-text">{type.label}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {type.description}
                    </p>
                  </button>
                );
              })}
            </div>
            {errors.type && <p className="error-message mt-2">{errors.type}</p>}
          </div>

          {/* Subject */}
          <div>
            <label className="block text-sm font-medium text-custom-text mb-1">
              Subject *
            </label>
            <input
              type="text"
              value={formData.subject}
              onChange={(e) => {
                setFormData({ ...formData, subject: e.target.value });
                if (errors.subject) setErrors({ ...errors, subject: undefined });
              }}
              placeholder="Brief summary of the issue"
              className={`w-full px-3 py-2 border rounded-lg bg-card-bg text-custom-text focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.subject ? "input-error border-red-500" : "border-border-color"
              }`}
            />
            {errors.subject && <p className="error-message">{errors.subject}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-custom-text mb-1">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => {
                setFormData({ ...formData, description: e.target.value });
                if (errors.description) setErrors({ ...errors, description: undefined });
              }}
              rows={6}
              placeholder={
                formData.type === "bug"
                  ? "Please describe the issue in detail. Include steps to reproduce, expected behavior, and actual behavior."
                  : formData.type === "feature"
                  ? "Describe the feature you'd like to see. Explain how it would benefit you and others."
                  : "Please provide details about your feedback or question."
              }
              className={`w-full px-3 py-2 border rounded-lg bg-card-bg text-custom-text focus:outline-none focus:ring-2 focus:ring-primary resize-none ${
                errors.description ? "input-error border-red-500" : "border-border-color"
              }`}
            />
            <div className="flex justify-between mt-1">
              {errors.description ? (
                <p className="error-message">{errors.description}</p>
              ) : (
                <span></span>
              )}
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {formData.description.length}/2000
              </span>
            </div>
          </div>

          {/* Priority (for bugs) */}
          {formData.type === "bug" && (
            <div>
              <label className="block text-sm font-medium text-custom-text mb-1">
                Priority Level
              </label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                className="w-full px-3 py-2 border border-border-color rounded-lg bg-card-bg text-custom-text focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="low">Low - Minor issue, not blocking</option>
                <option value="medium">Medium - Affects functionality but has workaround</option>
                <option value="high">High - Major issue, significantly affects work</option>
                <option value="critical">Critical - System unusable, data loss risk</option>
              </select>
            </div>
          )}

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-custom-text mb-1">
              Email (optional)
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
                if (errors.email) setErrors({ ...errors, email: undefined });
              }}
              placeholder="your@email.com"
              className={`w-full px-3 py-2 border rounded-lg bg-card-bg text-custom-text focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.email ? "input-error border-red-500" : "border-border-color"
              }`}
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Provide your email if you'd like us to follow up with you
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium"
          >
            <FaPaperPlane /> Submit Report
          </button>
        </form>
      </div>
    </div>
  );
}
