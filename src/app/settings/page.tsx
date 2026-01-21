"use client";

import { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import { BsSun, BsMoon } from "react-icons/bs";
import { FaUser, FaBell, FaLock, FaPalette, FaGlobe, FaSave } from "react-icons/fa";

interface UserSettings {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  language: string;
  timezone: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
  weeklyDigest: boolean;
  marketingEmails: boolean;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState("profile");
  const [saved, setSaved] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const [settings, setSettings] = useState<UserSettings>({
    fullName: "Gabriel Johnson",
    email: "gabriel@example.com",
    phone: "+1 (555) 123-4567",
    company: "ProdLens Inc.",
    language: "en",
    timezone: "America/New_York",
    emailNotifications: true,
    pushNotifications: true,
    weeklyDigest: false,
    marketingEmails: false,
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const saved = localStorage.getItem("userSettings");
    if (saved) {
      setSettings(JSON.parse(saved));
    }
  }, []);

  const validateProfile = (): boolean => {
    const newErrors: FormErrors = {};

    if (!settings.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (settings.fullName.trim().length < 2) {
      newErrors.fullName = "Name must be at least 2 characters";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!settings.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(settings.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (settings.phone) {
      const phoneRegex = /^[\d\s\-+()]+$/;
      if (!phoneRegex.test(settings.phone)) {
        newErrors.phone = "Please enter a valid phone number";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePassword = (): boolean => {
    const newErrors: FormErrors = {};

    if (!passwordForm.currentPassword) {
      newErrors.currentPassword = "Current password is required";
    }

    if (!passwordForm.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (passwordForm.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(passwordForm.newPassword)) {
      newErrors.newPassword = "Password must contain uppercase, lowercase, and number";
    }

    if (!passwordForm.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveProfile = () => {
    if (!validateProfile()) return;

    localStorage.setItem("userSettings", JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleSavePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePassword()) return;

    // In a real app, this would call an API
    setSaved(true);
    setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    setTimeout(() => setSaved(false), 3000);
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: FaUser },
    { id: "notifications", label: "Notifications", icon: FaBell },
    { id: "security", label: "Security", icon: FaLock },
    { id: "appearance", label: "Appearance", icon: FaPalette },
    { id: "preferences", label: "Preferences", icon: FaGlobe },
  ];

  return (
    <div className="p-8 bg-background min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#051F61] dark:text-white mb-2">
          Settings
        </h1>
        <p className="text-custom-text">Manage your account settings and preferences</p>
      </div>

      {saved && (
        <div className="mb-6 p-4 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-lg flex items-center gap-2">
          <FaSave /> Settings saved successfully!
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Tabs */}
        <div className="lg:w-64 flex-shrink-0">
          <div className="bg-card-bg rounded-lg shadow-lg border border-border-color overflow-hidden">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setErrors({});
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                    activeTab === tab.id
                      ? "bg-primary text-white"
                      : "text-custom-text hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1">
          <div className="bg-card-bg rounded-lg shadow-lg border border-border-color p-6">
            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-[#051F61] dark:text-white mb-4">
                  Profile Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-custom-text mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={settings.fullName}
                      onChange={(e) => {
                        setSettings({ ...settings, fullName: e.target.value });
                        if (errors.fullName) setErrors({ ...errors, fullName: undefined });
                      }}
                      className={`w-full px-3 py-2 border rounded-lg bg-card-bg text-custom-text focus:outline-none focus:ring-2 focus:ring-primary ${
                        errors.fullName ? "input-error border-red-500" : "border-border-color"
                      }`}
                    />
                    {errors.fullName && <p className="error-message">{errors.fullName}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-custom-text mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={settings.email}
                      onChange={(e) => {
                        setSettings({ ...settings, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: undefined });
                      }}
                      className={`w-full px-3 py-2 border rounded-lg bg-card-bg text-custom-text focus:outline-none focus:ring-2 focus:ring-primary ${
                        errors.email ? "input-error border-red-500" : "border-border-color"
                      }`}
                    />
                    {errors.email && <p className="error-message">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-custom-text mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={settings.phone}
                      onChange={(e) => {
                        setSettings({ ...settings, phone: e.target.value });
                        if (errors.phone) setErrors({ ...errors, phone: undefined });
                      }}
                      className={`w-full px-3 py-2 border rounded-lg bg-card-bg text-custom-text focus:outline-none focus:ring-2 focus:ring-primary ${
                        errors.phone ? "input-error border-red-500" : "border-border-color"
                      }`}
                    />
                    {errors.phone && <p className="error-message">{errors.phone}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-custom-text mb-1">
                      Company
                    </label>
                    <input
                      type="text"
                      value={settings.company}
                      onChange={(e) => setSettings({ ...settings, company: e.target.value })}
                      className="w-full px-3 py-2 border border-border-color rounded-lg bg-card-bg text-custom-text focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
                <button
                  onClick={handleSaveProfile}
                  className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors flex items-center gap-2"
                >
                  <FaSave /> Save Changes
                </button>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === "notifications" && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-[#051F61] dark:text-white mb-4">
                  Notification Preferences
                </h2>
                <div className="space-y-4">
                  {[
                    { key: "emailNotifications", label: "Email Notifications", desc: "Receive notifications via email" },
                    { key: "pushNotifications", label: "Push Notifications", desc: "Receive push notifications in browser" },
                    { key: "weeklyDigest", label: "Weekly Digest", desc: "Receive a weekly summary of activity" },
                    { key: "marketingEmails", label: "Marketing Emails", desc: "Receive updates about new features and offers" },
                  ].map((item) => (
                    <div
                      key={item.key}
                      className="flex items-center justify-between p-4 border border-border-color rounded-lg"
                    >
                      <div>
                        <h3 className="font-medium text-custom-text">{item.label}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings[item.key as keyof UserSettings] as boolean}
                          onChange={(e) => {
                            setSettings({ ...settings, [item.key]: e.target.checked });
                          }}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                      </label>
                    </div>
                  ))}
                </div>
                <button
                  onClick={handleSaveProfile}
                  className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors flex items-center gap-2"
                >
                  <FaSave /> Save Preferences
                </button>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === "security" && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-[#051F61] dark:text-white mb-4">
                  Change Password
                </h2>
                <form onSubmit={handleSavePassword} className="space-y-4 max-w-md">
                  <div>
                    <label className="block text-sm font-medium text-custom-text mb-1">
                      Current Password *
                    </label>
                    <input
                      type="password"
                      value={passwordForm.currentPassword}
                      onChange={(e) => {
                        setPasswordForm({ ...passwordForm, currentPassword: e.target.value });
                        if (errors.currentPassword) setErrors({ ...errors, currentPassword: undefined });
                      }}
                      className={`w-full px-3 py-2 border rounded-lg bg-card-bg text-custom-text focus:outline-none focus:ring-2 focus:ring-primary ${
                        errors.currentPassword ? "input-error border-red-500" : "border-border-color"
                      }`}
                    />
                    {errors.currentPassword && <p className="error-message">{errors.currentPassword}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-custom-text mb-1">
                      New Password *
                    </label>
                    <input
                      type="password"
                      value={passwordForm.newPassword}
                      onChange={(e) => {
                        setPasswordForm({ ...passwordForm, newPassword: e.target.value });
                        if (errors.newPassword) setErrors({ ...errors, newPassword: undefined });
                      }}
                      className={`w-full px-3 py-2 border rounded-lg bg-card-bg text-custom-text focus:outline-none focus:ring-2 focus:ring-primary ${
                        errors.newPassword ? "input-error border-red-500" : "border-border-color"
                      }`}
                    />
                    {errors.newPassword && <p className="error-message">{errors.newPassword}</p>}
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Must be at least 8 characters with uppercase, lowercase, and number
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-custom-text mb-1">
                      Confirm New Password *
                    </label>
                    <input
                      type="password"
                      value={passwordForm.confirmPassword}
                      onChange={(e) => {
                        setPasswordForm({ ...passwordForm, confirmPassword: e.target.value });
                        if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: undefined });
                      }}
                      className={`w-full px-3 py-2 border rounded-lg bg-card-bg text-custom-text focus:outline-none focus:ring-2 focus:ring-primary ${
                        errors.confirmPassword ? "input-error border-red-500" : "border-border-color"
                      }`}
                    />
                    {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors flex items-center gap-2"
                  >
                    <FaLock /> Update Password
                  </button>
                </form>
              </div>
            )}

            {/* Appearance Tab */}
            {activeTab === "appearance" && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-[#051F61] dark:text-white mb-4">
                  Appearance Settings
                </h2>
                <div className="space-y-4">
                  <div className="p-4 border border-border-color rounded-lg">
                    <h3 className="font-medium text-custom-text mb-4">Theme Mode</h3>
                    <div className="flex gap-4">
                      <button
                        onClick={() => setTheme("light")}
                        className={`flex-1 flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-colors ${
                          theme === "light"
                            ? "border-primary bg-primary/10"
                            : "border-border-color hover:border-primary/50"
                        }`}
                      >
                        <div className="w-16 h-16 rounded-lg bg-white border border-gray-200 flex items-center justify-center">
                          <BsSun className="w-8 h-8 text-yellow-500" />
                        </div>
                        <span className="font-medium text-custom-text">Light</span>
                      </button>
                      <button
                        onClick={() => setTheme("dark")}
                        className={`flex-1 flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-colors ${
                          theme === "dark"
                            ? "border-primary bg-primary/10"
                            : "border-border-color hover:border-primary/50"
                        }`}
                      >
                        <div className="w-16 h-16 rounded-lg bg-gray-800 border border-gray-600 flex items-center justify-center">
                          <BsMoon className="w-8 h-8 text-blue-300" />
                        </div>
                        <span className="font-medium text-custom-text">Dark</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Preferences Tab */}
            {activeTab === "preferences" && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-[#051F61] dark:text-white mb-4">
                  Regional Preferences
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-custom-text mb-1">
                      Language
                    </label>
                    <select
                      value={settings.language}
                      onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                      className="w-full px-3 py-2 border border-border-color rounded-lg bg-card-bg text-custom-text focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                      <option value="zh">Chinese</option>
                      <option value="ja">Japanese</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-custom-text mb-1">
                      Timezone
                    </label>
                    <select
                      value={settings.timezone}
                      onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
                      className="w-full px-3 py-2 border border-border-color rounded-lg bg-card-bg text-custom-text focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="America/New_York">Eastern Time (ET)</option>
                      <option value="America/Chicago">Central Time (CT)</option>
                      <option value="America/Denver">Mountain Time (MT)</option>
                      <option value="America/Los_Angeles">Pacific Time (PT)</option>
                      <option value="Europe/London">London (GMT)</option>
                      <option value="Europe/Paris">Paris (CET)</option>
                      <option value="Asia/Tokyo">Tokyo (JST)</option>
                    </select>
                  </div>
                </div>
                <button
                  onClick={handleSaveProfile}
                  className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors flex items-center gap-2"
                >
                  <FaSave /> Save Preferences
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
