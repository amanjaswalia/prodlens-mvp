"use client";

import { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

interface Project {
  id: number;
  name: string;
  description: string;
  status: "active" | "completed" | "on-hold" | "archived";
  progress: number;
  dueDate: string;
  team: string[];
  createdAt: string;
}

interface FormErrors {
  name?: string;
  description?: string;
  dueDate?: string;
}

const initialProjects: Project[] = [
  {
    id: 1,
    name: "Website Redesign",
    description: "Complete overhaul of the company website with modern UI/UX",
    status: "active",
    progress: 65,
    dueDate: "2025-02-15",
    team: ["Alice", "Bob", "Charlie"],
    createdAt: "2024-12-01",
  },
  {
    id: 2,
    name: "Mobile App Development",
    description: "Build native mobile apps for iOS and Android platforms",
    status: "active",
    progress: 40,
    dueDate: "2025-03-30",
    team: ["David", "Eve"],
    createdAt: "2024-11-15",
  },
  {
    id: 3,
    name: "API Integration",
    description: "Integrate third-party APIs for payment and analytics",
    status: "completed",
    progress: 100,
    dueDate: "2024-12-20",
    team: ["Frank", "Grace"],
    createdAt: "2024-10-01",
  },
  {
    id: 4,
    name: "Database Migration",
    description: "Migrate legacy database to cloud infrastructure",
    status: "on-hold",
    progress: 25,
    dueDate: "2025-04-15",
    team: ["Henry"],
    createdAt: "2024-11-20",
  },
  {
    id: 5,
    name: "Security Audit",
    description: "Comprehensive security review and vulnerability assessment",
    status: "archived",
    progress: 100,
    dueDate: "2024-10-30",
    team: ["Ivy", "Jack"],
    createdAt: "2024-09-01",
  },
];

const statusColors = {
  active: { bg: "bg-green-100 dark:bg-green-900", text: "text-green-700 dark:text-green-300" },
  completed: { bg: "bg-blue-100 dark:bg-blue-900", text: "text-blue-700 dark:text-blue-300" },
  "on-hold": { bg: "bg-yellow-100 dark:bg-yellow-900", text: "text-yellow-700 dark:text-yellow-300" },
  archived: { bg: "bg-gray-100 dark:bg-gray-700", text: "text-gray-700 dark:text-gray-300" },
};

export default function MyProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "active" as Project["status"],
    dueDate: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("projects");
    if (saved) {
      setProjects(JSON.parse(saved));
    } else {
      setProjects(initialProjects);
      localStorage.setItem("projects", JSON.stringify(initialProjects));
    }
  }, []);

  const saveProjects = (newProjects: Project[]) => {
    setProjects(newProjects);
    localStorage.setItem("projects", JSON.stringify(newProjects));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Project name is required";
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "Project name must be at least 3 characters";
    } else if (formData.name.trim().length > 50) {
      newErrors.name = "Project name must be less than 50 characters";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.trim().length < 10) {
      newErrors.description = "Description must be at least 10 characters";
    } else if (formData.description.trim().length > 500) {
      newErrors.description = "Description must be less than 500 characters";
    }

    if (!formData.dueDate) {
      newErrors.dueDate = "Due date is required";
    } else {
      const selectedDate = new Date(formData.dueDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today && !editingProject) {
        newErrors.dueDate = "Due date cannot be in the past";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (editingProject) {
      const updated = projects.map((p) =>
        p.id === editingProject.id
          ? { ...p, ...formData, name: formData.name.trim(), description: formData.description.trim() }
          : p
      );
      saveProjects(updated);
    } else {
      const newProject: Project = {
        id: Date.now(),
        name: formData.name.trim(),
        description: formData.description.trim(),
        status: formData.status,
        progress: 0,
        dueDate: formData.dueDate,
        team: [],
        createdAt: new Date().toISOString().split("T")[0],
      };
      saveProjects([...projects, newProject]);
    }

    closeModal();
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      name: project.name,
      description: project.description,
      status: project.status,
      dueDate: project.dueDate,
    });
    setErrors({});
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    const updated = projects.filter((p) => p.id !== id);
    saveProjects(updated);
    setDeleteConfirm(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProject(null);
    setFormData({ name: "", description: "", status: "active", dueDate: "" });
    setErrors({});
  };

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || project.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-8 bg-background min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#051F61] dark:text-white mb-2">
          My Projects
        </h1>
        <p className="text-custom-text">Manage and track your projects</p>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-border-color rounded-lg bg-card-bg text-custom-text focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border border-border-color rounded-lg bg-card-bg text-custom-text focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
          <option value="on-hold">On Hold</option>
          <option value="archived">Archived</option>
        </select>
        <button
          onClick={() => {
            setErrors({});
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
        >
          <FaPlus /> New Project
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="bg-card-bg rounded-lg shadow-lg p-6 border border-border-color hover:shadow-xl transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-bold text-[#051F61] dark:text-white truncate pr-2">
                {project.name}
              </h3>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${statusColors[project.status].bg} ${statusColors[project.status].text}`}
              >
                {project.status.replace("-", " ")}
              </span>
            </div>
            <p className="text-custom-text text-sm mb-4 line-clamp-2">
              {project.description}
            </p>
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-custom-text">Progress</span>
                <span className="text-custom-text font-medium">{project.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>
            <div className="flex justify-between items-center text-sm text-custom-text mb-4">
              <span>Due: {new Date(project.dueDate).toLocaleDateString()}</span>
              <span>{project.team.length} members</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(project)}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
              >
                <FaEdit /> Edit
              </button>
              {deleteConfirm === project.id ? (
                <div className="flex-1 flex gap-1">
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="flex-1 px-2 py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(null)}
                    className="flex-1 px-2 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg text-sm"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setDeleteConfirm(project.id)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-lg hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
                >
                  <FaTrash /> Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-custom-text text-lg">No projects found</p>
          <p className="text-gray-400 mt-2">Try adjusting your search or filters</p>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-card-bg rounded-lg shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center p-4 border-b border-border-color">
              <h2 className="text-xl font-bold text-[#051F61] dark:text-white">
                {editingProject ? "Edit Project" : "New Project"}
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
                  Project Name *
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
                  placeholder="Enter project name"
                />
                {errors.name && <p className="error-message">{errors.name}</p>}
              </div>
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
                  rows={3}
                  className={`w-full px-3 py-2 border rounded-lg bg-card-bg text-custom-text focus:outline-none focus:ring-2 focus:ring-primary resize-none ${
                    errors.description ? "input-error border-red-500" : "border-border-color"
                  }`}
                  placeholder="Enter project description"
                />
                {errors.description && <p className="error-message">{errors.description}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-custom-text mb-1">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value as Project["status"] })
                  }
                  className="w-full px-3 py-2 border border-border-color rounded-lg bg-card-bg text-custom-text focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                  <option value="on-hold">On Hold</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-custom-text mb-1">
                  Due Date *
                </label>
                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => {
                    setFormData({ ...formData, dueDate: e.target.value });
                    if (errors.dueDate) setErrors({ ...errors, dueDate: undefined });
                  }}
                  className={`w-full px-3 py-2 border rounded-lg bg-card-bg text-custom-text focus:outline-none focus:ring-2 focus:ring-primary ${
                    errors.dueDate ? "input-error border-red-500" : "border-border-color"
                  }`}
                />
                {errors.dueDate && <p className="error-message">{errors.dueDate}</p>}
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
                  {editingProject ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
