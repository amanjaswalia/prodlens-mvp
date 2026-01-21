"use client";

import { useState } from "react";
import { FaCreditCard, FaPaypal, FaCheck, FaLock } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

interface FormErrors {
  cardNumber?: string;
  cardName?: string;
  expiryDate?: string;
  cvv?: string;
}

const plans = [
  {
    id: "free",
    name: "Free",
    price: 0,
    period: "forever",
    features: [
      "Up to 3 projects",
      "Basic analytics",
      "Email support",
      "1GB storage",
    ],
    current: true,
  },
  {
    id: "pro",
    name: "Pro",
    price: 29,
    period: "month",
    features: [
      "Unlimited projects",
      "Advanced analytics",
      "Priority support",
      "25GB storage",
      "Team collaboration",
      "API access",
    ],
    recommended: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 99,
    period: "month",
    features: [
      "Everything in Pro",
      "Unlimited storage",
      "Dedicated support",
      "Custom integrations",
      "SSO authentication",
      "Audit logs",
      "SLA guarantee",
    ],
  },
];

export default function PaymentPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "paypal">("card");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(" ") : value;
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4);
    }
    return v;
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    const cardNum = formData.cardNumber.replace(/\s/g, "");
    if (!cardNum) {
      newErrors.cardNumber = "Card number is required";
    } else if (cardNum.length < 16) {
      newErrors.cardNumber = "Please enter a valid 16-digit card number";
    }

    if (!formData.cardName.trim()) {
      newErrors.cardName = "Cardholder name is required";
    } else if (formData.cardName.trim().length < 3) {
      newErrors.cardName = "Please enter a valid name";
    }

    if (!formData.expiryDate) {
      newErrors.expiryDate = "Expiry date is required";
    } else {
      const [month, year] = formData.expiryDate.split("/");
      const currentYear = new Date().getFullYear() % 100;
      const currentMonth = new Date().getMonth() + 1;
      if (
        !month ||
        !year ||
        parseInt(month) < 1 ||
        parseInt(month) > 12 ||
        parseInt(year) < currentYear ||
        (parseInt(year) === currentYear && parseInt(month) < currentMonth)
      ) {
        newErrors.expiryDate = "Please enter a valid expiry date";
      }
    }

    if (!formData.cvv) {
      newErrors.cvv = "CVV is required";
    } else if (formData.cvv.length < 3) {
      newErrors.cvv = "CVV must be 3-4 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (paymentMethod === "card" && !validateForm()) return;

    setProcessing(true);
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setProcessing(false);
    setSuccess(true);
  };

  const openCheckout = (planId: string) => {
    if (planId === "free") return;
    setSelectedPlan(planId);
    setIsModalOpen(true);
    setSuccess(false);
    setFormData({ cardNumber: "", cardName: "", expiryDate: "", cvv: "" });
    setErrors({});
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPlan(null);
    setSuccess(false);
  };

  return (
    <div className="p-8 bg-background min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#051F61] dark:text-white mb-2">
          Pricing & Payment
        </h1>
        <p className="text-custom-text">Choose the plan that works best for you</p>
      </div>

      {/* Current Plan Status */}
      <div className="bg-card-bg rounded-lg shadow-lg border border-border-color p-6 mb-8">
        <h2 className="text-lg font-bold text-[#051F61] dark:text-white mb-2">
          Current Plan: Free Trial
        </h2>
        <p className="text-custom-text mb-4">
          Your free trial expires on December 21st, 2024. Upgrade now to continue using all features.
        </p>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
          <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "75%" }} />
        </div>
        <p className="text-sm text-custom-text">75% of trial period used</p>
      </div>

      {/* Pricing Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`bg-card-bg rounded-lg shadow-lg border-2 p-6 relative ${
              plan.recommended
                ? "border-primary"
                : plan.current
                ? "border-green-500"
                : "border-border-color"
            }`}
          >
            {plan.recommended && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                Recommended
              </div>
            )}
            {plan.current && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                Current Plan
              </div>
            )}
            <div className="text-center mb-6 mt-2">
              <h3 className="text-xl font-bold text-[#051F61] dark:text-white mb-2">
                {plan.name}
              </h3>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-4xl font-bold text-primary">${plan.price}</span>
                {plan.price > 0 && (
                  <span className="text-custom-text">/{plan.period}</span>
                )}
              </div>
            </div>
            <ul className="space-y-3 mb-6">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2 text-custom-text">
                  <FaCheck className="text-green-500 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
            <button
              onClick={() => openCheckout(plan.id)}
              disabled={plan.current}
              className={`w-full py-2 rounded-lg font-medium transition-colors ${
                plan.current
                  ? "bg-gray-200 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
                  : plan.recommended
                  ? "bg-primary text-white hover:bg-primary-dark"
                  : "border border-primary text-primary hover:bg-primary hover:text-white"
              }`}
            >
              {plan.current ? "Current Plan" : "Select Plan"}
            </button>
          </div>
        ))}
      </div>

      {/* Payment Methods Info */}
      <div className="bg-card-bg rounded-lg shadow-lg border border-border-color p-6">
        <h2 className="text-lg font-bold text-[#051F61] dark:text-white mb-4">
          Accepted Payment Methods
        </h2>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <FaCreditCard className="text-primary" />
            <span className="text-custom-text">Credit Card</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <FaPaypal className="text-blue-500" />
            <span className="text-custom-text">PayPal</span>
          </div>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 flex items-center gap-2">
          <FaLock /> All transactions are secure and encrypted
        </p>
      </div>

      {/* Payment Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-card-bg rounded-lg shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center p-4 border-b border-border-color">
              <h2 className="text-xl font-bold text-[#051F61] dark:text-white">
                {success ? "Payment Successful" : "Complete Payment"}
              </h2>
              <button
                onClick={closeModal}
                className="text-custom-text hover:text-red-500 transition-colors"
              >
                <IoClose size={24} />
              </button>
            </div>

            {success ? (
              <div className="p-6 text-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaCheck className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-xl font-bold text-[#051F61] dark:text-white mb-2">
                  Thank you for your purchase!
                </h3>
                <p className="text-custom-text mb-4">
                  Your {plans.find((p) => p.id === selectedPlan)?.name} plan is now active.
                </p>
                <button
                  onClick={closeModal}
                  className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                >
                  Continue
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-4 space-y-4">
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg mb-4">
                  <p className="text-sm text-custom-text">
                    Plan: <strong>{plans.find((p) => p.id === selectedPlan)?.name}</strong>
                  </p>
                  <p className="text-lg font-bold text-primary">
                    ${plans.find((p) => p.id === selectedPlan)?.price}/month
                  </p>
                </div>

                {/* Payment Method Selection */}
                <div className="flex gap-4 mb-4">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("card")}
                    className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-lg border-2 transition-colors ${
                      paymentMethod === "card"
                        ? "border-primary bg-primary/10"
                        : "border-border-color"
                    }`}
                  >
                    <FaCreditCard className={paymentMethod === "card" ? "text-primary" : "text-custom-text"} />
                    <span className="text-custom-text">Card</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("paypal")}
                    className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-lg border-2 transition-colors ${
                      paymentMethod === "paypal"
                        ? "border-primary bg-primary/10"
                        : "border-border-color"
                    }`}
                  >
                    <FaPaypal className={paymentMethod === "paypal" ? "text-blue-500" : "text-custom-text"} />
                    <span className="text-custom-text">PayPal</span>
                  </button>
                </div>

                {paymentMethod === "card" ? (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-custom-text mb-1">
                        Card Number *
                      </label>
                      <input
                        type="text"
                        value={formData.cardNumber}
                        onChange={(e) => {
                          setFormData({ ...formData, cardNumber: formatCardNumber(e.target.value) });
                          if (errors.cardNumber) setErrors({ ...errors, cardNumber: undefined });
                        }}
                        maxLength={19}
                        placeholder="1234 5678 9012 3456"
                        className={`w-full px-3 py-2 border rounded-lg bg-card-bg text-custom-text focus:outline-none focus:ring-2 focus:ring-primary ${
                          errors.cardNumber ? "input-error border-red-500" : "border-border-color"
                        }`}
                      />
                      {errors.cardNumber && <p className="error-message">{errors.cardNumber}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-custom-text mb-1">
                        Cardholder Name *
                      </label>
                      <input
                        type="text"
                        value={formData.cardName}
                        onChange={(e) => {
                          setFormData({ ...formData, cardName: e.target.value });
                          if (errors.cardName) setErrors({ ...errors, cardName: undefined });
                        }}
                        placeholder="John Doe"
                        className={`w-full px-3 py-2 border rounded-lg bg-card-bg text-custom-text focus:outline-none focus:ring-2 focus:ring-primary ${
                          errors.cardName ? "input-error border-red-500" : "border-border-color"
                        }`}
                      />
                      {errors.cardName && <p className="error-message">{errors.cardName}</p>}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-custom-text mb-1">
                          Expiry Date *
                        </label>
                        <input
                          type="text"
                          value={formData.expiryDate}
                          onChange={(e) => {
                            setFormData({ ...formData, expiryDate: formatExpiryDate(e.target.value) });
                            if (errors.expiryDate) setErrors({ ...errors, expiryDate: undefined });
                          }}
                          maxLength={5}
                          placeholder="MM/YY"
                          className={`w-full px-3 py-2 border rounded-lg bg-card-bg text-custom-text focus:outline-none focus:ring-2 focus:ring-primary ${
                            errors.expiryDate ? "input-error border-red-500" : "border-border-color"
                          }`}
                        />
                        {errors.expiryDate && <p className="error-message">{errors.expiryDate}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-custom-text mb-1">
                          CVV *
                        </label>
                        <input
                          type="text"
                          value={formData.cvv}
                          onChange={(e) => {
                            const v = e.target.value.replace(/[^0-9]/g, "");
                            setFormData({ ...formData, cvv: v });
                            if (errors.cvv) setErrors({ ...errors, cvv: undefined });
                          }}
                          maxLength={4}
                          placeholder="123"
                          className={`w-full px-3 py-2 border rounded-lg bg-card-bg text-custom-text focus:outline-none focus:ring-2 focus:ring-primary ${
                            errors.cvv ? "input-error border-red-500" : "border-border-color"
                          }`}
                        />
                        {errors.cvv && <p className="error-message">{errors.cvv}</p>}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-4">
                    <FaPaypal className="w-12 h-12 text-blue-500 mx-auto mb-2" />
                    <p className="text-custom-text">
                      You will be redirected to PayPal to complete your purchase.
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={processing}
                  className="w-full py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {processing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <FaLock />
                      Pay ${plans.find((p) => p.id === selectedPlan)?.price}
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
