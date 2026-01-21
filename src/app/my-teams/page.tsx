"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FaPlus, FaEnvelope, FaPhone, FaEdit, FaTrash } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import Member1 from "../assets/member1.png";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  email: string;
  phone: string;
  skills: string[];
}

interface FormErrors {
  name?: string;
  role?: string;
  email?: string;
}

const initialMembers: TeamMember[] = [
  {
    id: 1,
    name: "John Doe",
    role: "Web Designer",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    skills: ["HTML", "CSS", "UI/UX", "Figma"],
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "Web Developer",
    email: "jane.smith@example.com",
    phone: "+1 (555) 234-5678",
    skills: ["JavaScript", "React", "Node.js", "TypeScript"],
  },
  {
    id: 3,
    name: "Sam Wilson",
    role: "Front-end Developer",
    email: "sam.wilson@example.com",
    phone: "+1 (555) 345-6789",
    skills: ["React", "CSS", "Redux", "Next.js"],
  },
  {
    id: 4,
    name: "Emily Brown",
    role: "Product Manager",
    email: "emily.brown@example.com",
    phone: "+1 (555) 456-7890",
    skills: ["Agile", "Scrum", "Jira", "Strategy"],
  },
];

export default function TeamsPage() {
  const [members, setMembers] = useState<TeamMember[]>(initialMembers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    email: "",
    phone: "",
    skills: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.role.trim()) {
      newErrors.role = "Role is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Please enter a valid email";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const skillsArray = formData.skills
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s);

    if (editingMember) {
      setMembers(
        members.map((m) =>
          m.id === editingMember.id
            ? {
                ...m,
                name: formData.name.trim(),
                role: formData.role.trim(),
                email: formData.email.trim(),
                phone: formData.phone.trim(),
                skills: skillsArray,
              }
            : m
        )
      );
    } else {
      const newMember: TeamMember = {
        id: Date.now(),
        name: formData.name.trim(),
        role: formData.role.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        skills: skillsArray,
      };
      setMembers([...members, newMember]);
    }

    closeModal();
  };

  const handleEdit = (member: TeamMember) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      role: member.role,
      email: member.email,
      phone: member.phone,
      skills: member.skills.join(", "),
    });
    setErrors({});
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    setMembers(members.filter((m) => m.id !== id));
    setDeleteConfirm(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingMember(null);
    setFormData({ name: "", role: "", email: "", phone: "", skills: "" });
    setErrors({});
  };

  return (
    <div className="p-8 bg-background min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#051F61] dark:text-white mb-2">
            My Teams
          </h1>
          <p className="text-custom-text">Manage your team members</p>
        </div>
        <button
          onClick={() => {
            setErrors({});
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
        >
          <FaPlus /> Add Member
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {members.map((member) => (
          <div
            key={member.id}
            className="bg-card-bg rounded-lg shadow-lg border border-border-color overflow-hidden hover:shadow-xl transition-shadow"
          >
            <div className="bg-primary/10 dark:bg-primary/20 p-6 flex flex-col items-center">
              <Image
                src={Member1}
                alt={member.name}
                width={80}
                height={80}
                className="rounded-full border-4 border-white dark:border-gray-700 shadow-lg"
              />
              <h3 className="text-lg font-bold text-[#051F61] dark:text-white mt-4">
                {member.name}
              </h3>
              <p className="text-primary font-medium">{member.role}</p>
            </div>
            <div className="p-4">
              <div className="space-y-2 mb-4">
                <a
                  href={`mailto:${member.email}`}
                  className="flex items-center gap-2 text-sm text-custom-text hover:text-primary transition-colors"
                >
                  <FaEnvelope className="text-gray-400" />
                  <span className="truncate">{member.email}</span>
                </a>
                <div className="flex items-center gap-2 text-sm text-custom-text">
                  <FaPhone className="text-gray-400" />
                  {member.phone}
                </div>
              </div>
              <div className="mb-4">
                <h4 className="text-sm font-medium text-custom-text mb-2">Skills</h4>
                <div className="flex flex-wrap gap-1">
                  {member.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs text-custom-text rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(member)}
                  className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors text-sm"
                >
                  <FaEdit /> Edit
                </button>
                {deleteConfirm === member.id ? (
                  <div className="flex-1 flex gap-1">
                    <button
                      onClick={() => handleDelete(member.id)}
                      className="flex-1 px-2 py-2 bg-red-500 text-white rounded-lg text-xs hover:bg-red-600"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(null)}
                      className="flex-1 px-2 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg text-xs"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setDeleteConfirm(member.id)}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-lg hover:bg-red-200 dark:hover:bg-red-800 transition-colors text-sm"
                  >
                    <FaTrash /> Remove
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {members.length === 0 && (
        <div className="text-center py-12">
          <p className="text-custom-text text-lg">No team members yet</p>
          <p className="text-gray-400 mt-2">Click "Add Member" to get started</p>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-card-bg rounded-lg shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center p-4 border-b border-border-color">
              <h2 className="text-xl font-bold text-[#051F61] dark:text-white">
                {editingMember ? "Edit Member" : "Add Member"}
              </h2>
              <button
                onClick={closeModal}
                className="text-custom-text hover:text-red-500 transition-colors"
              >
                <IoClose size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-custom-text mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (errors.name) setErrors({ ...errors, name: undefined });
                  }}
                  className={`w-full px-3 py-2 border rounded-lg bg-card-bg text-custom-text focus:outline-none focus:ring-2 focus:ring-primary ${
                    errors.name ? "input-error border-red-500" : "border-border-color"
                  }`}
                  placeholder="John Doe"
                />
                {errors.name && <p className="error-message">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-custom-text mb-1">
                  Role *
                </label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => {
                    setFormData({ ...formData, role: e.target.value });
                    if (errors.role) setErrors({ ...errors, role: undefined });
                  }}
                  className={`w-full px-3 py-2 border rounded-lg bg-card-bg text-custom-text focus:outline-none focus:ring-2 focus:ring-primary ${
                    errors.role ? "input-error border-red-500" : "border-border-color"
                  }`}
                  placeholder="Web Developer"
                />
                {errors.role && <p className="error-message">{errors.role}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-custom-text mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (errors.email) setErrors({ ...errors, email: undefined });
                  }}
                  className={`w-full px-3 py-2 border rounded-lg bg-card-bg text-custom-text focus:outline-none focus:ring-2 focus:ring-primary ${
                    errors.email ? "input-error border-red-500" : "border-border-color"
                  }`}
                  placeholder="john@example.com"
                />
                {errors.email && <p className="error-message">{errors.email}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-custom-text mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-border-color rounded-lg bg-card-bg text-custom-text focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-custom-text mb-1">
                  Skills (comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.skills}
                  onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                  className="w-full px-3 py-2 border border-border-color rounded-lg bg-card-bg text-custom-text focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="React, TypeScript, Node.js"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-4 py-2 border border-border-color text-custom-text rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                >
                  {editingMember ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
