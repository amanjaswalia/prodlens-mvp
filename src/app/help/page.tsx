"use client";

import { useState } from "react";
import { FaSearch, FaChevronDown, FaChevronUp, FaEnvelope, FaPhone, FaComments } from "react-icons/fa";
import { IoDocumentText, IoVideocam, IoBook } from "react-icons/io5";

interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQ[] = [
  {
    id: 1,
    question: "How do I create a new project?",
    answer: "Navigate to 'My Projects' from the sidebar, then click the 'New Project' button. Fill in the project details including name, description, status, and due date, then click 'Create' to save your project.",
    category: "projects",
  },
  {
    id: 2,
    question: "How do I switch between light and dark mode?",
    answer: "You can toggle between light and dark mode by clicking the sun/moon icon in the sidebar, or by going to Settings > Appearance and selecting your preferred theme.",
    category: "appearance",
  },
  {
    id: 3,
    question: "How do I add team members to a project?",
    answer: "Open the project you want to modify by clicking 'Edit', then in the project details you can manage team members. You can also invite new members through the 'My Teams' section.",
    category: "teams",
  },
  {
    id: 4,
    question: "What are dossiers and how do I use them?",
    answer: "Dossiers are collections of related documents and information for your projects. You can create, view, and manage dossiers from the Dashboard or the 'All Dossiers' page. Each dossier can have different statuses like Draft, In Progress, or Approved.",
    category: "dossiers",
  },
  {
    id: 5,
    question: "How do I change my password?",
    answer: "Go to Settings > Security tab. Enter your current password, then your new password twice to confirm. Your password must be at least 8 characters and include uppercase, lowercase, and numbers.",
    category: "account",
  },
  {
    id: 6,
    question: "How do I manage notification preferences?",
    answer: "Navigate to Settings > Notifications. From there you can toggle email notifications, push notifications, weekly digest emails, and marketing communications on or off.",
    category: "notifications",
  },
  {
    id: 7,
    question: "How do I add items to favorites?",
    answer: "Click the heart icon on any project or dossier card to add it to your favorites. You can view all your favorite items by clicking 'Favorites' in the sidebar.",
    category: "favorites",
  },
  {
    id: 8,
    question: "What payment methods are accepted?",
    answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for annual subscriptions. Visit the Payment page to manage your billing information.",
    category: "billing",
  },
  {
    id: 9,
    question: "How do I report a bug or issue?",
    answer: "Click on 'Report' in the sidebar to submit a bug report or feedback. Provide as much detail as possible including steps to reproduce the issue. Our team will review and respond within 24-48 hours.",
    category: "support",
  },
  {
    id: 10,
    question: "Can I export my project data?",
    answer: "Yes, you can export project data in various formats. Go to the specific project, click the options menu, and select 'Export'. Available formats include PDF, CSV, and JSON.",
    category: "projects",
  },
];

const categories = [
  { id: "all", label: "All Topics" },
  { id: "projects", label: "Projects" },
  { id: "teams", label: "Teams" },
  { id: "dossiers", label: "Dossiers" },
  { id: "account", label: "Account" },
  { id: "billing", label: "Billing" },
  { id: "support", label: "Support" },
];

export default function HelpPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const resources = [
    {
      icon: IoDocumentText,
      title: "Documentation",
      description: "Comprehensive guides and API documentation",
      link: "#",
    },
    {
      icon: IoVideocam,
      title: "Video Tutorials",
      description: "Step-by-step video guides for all features",
      link: "#",
    },
    {
      icon: IoBook,
      title: "Knowledge Base",
      description: "In-depth articles and best practices",
      link: "#",
    },
  ];

  return (
    <div className="p-8 bg-background min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#051F61] dark:text-white mb-2">
          Help Center
        </h1>
        <p className="text-custom-text">Find answers and get support</p>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-2xl mb-8">
        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search for help articles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 border border-border-color rounded-lg bg-card-bg text-custom-text focus:outline-none focus:ring-2 focus:ring-primary text-lg"
        />
      </div>

      {/* Quick Resources */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {resources.map((resource, index) => {
          const Icon = resource.icon;
          return (
            <a
              key={index}
              href={resource.link}
              className="bg-card-bg p-6 rounded-lg shadow-lg border border-border-color hover:shadow-xl hover:border-primary transition-all group"
            >
              <Icon className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-bold text-[#051F61] dark:text-white mb-2">
                {resource.title}
              </h3>
              <p className="text-custom-text text-sm">{resource.description}</p>
            </a>
          );
        })}
      </div>

      {/* FAQ Section */}
      <div className="bg-card-bg rounded-lg shadow-lg border border-border-color p-6 mb-8">
        <h2 className="text-xl font-bold text-[#051F61] dark:text-white mb-4">
          Frequently Asked Questions
        </h2>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category.id
                  ? "bg-primary text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-custom-text hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* FAQ List */}
        <div className="space-y-3">
          {filteredFaqs.map((faq) => (
            <div
              key={faq.id}
              className="border border-border-color rounded-lg overflow-hidden"
            >
              <button
                onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <span className="font-medium text-custom-text pr-4">{faq.question}</span>
                {expandedFaq === faq.id ? (
                  <FaChevronUp className="text-primary flex-shrink-0" />
                ) : (
                  <FaChevronDown className="text-gray-400 flex-shrink-0" />
                )}
              </button>
              {expandedFaq === faq.id && (
                <div className="px-4 pb-4 text-custom-text border-t border-border-color pt-4">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
          {filteredFaqs.length === 0 && (
            <div className="text-center py-8 text-custom-text">
              No results found. Try a different search term.
            </div>
          )}
        </div>
      </div>

      {/* Contact Support */}
      <div className="bg-card-bg rounded-lg shadow-lg border border-border-color p-6">
        <h2 className="text-xl font-bold text-[#051F61] dark:text-white mb-4">
          Still need help?
        </h2>
        <p className="text-custom-text mb-6">
          Our support team is available to assist you with any questions or issues.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="mailto:support@prodlens.com"
            className="flex items-center gap-3 p-4 border border-border-color rounded-lg hover:border-primary hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <FaEnvelope className="w-6 h-6 text-primary" />
            <div>
              <h3 className="font-medium text-custom-text">Email Support</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">support@prodlens.com</p>
            </div>
          </a>
          <a
            href="tel:+1-800-123-4567"
            className="flex items-center gap-3 p-4 border border-border-color rounded-lg hover:border-primary hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <FaPhone className="w-6 h-6 text-primary" />
            <div>
              <h3 className="font-medium text-custom-text">Phone Support</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">1-800-123-4567</p>
            </div>
          </a>
          <a
            href="#"
            className="flex items-center gap-3 p-4 border border-border-color rounded-lg hover:border-primary hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <FaComments className="w-6 h-6 text-primary" />
            <div>
              <h3 className="font-medium text-custom-text">Live Chat</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Available 9am-5pm EST</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
