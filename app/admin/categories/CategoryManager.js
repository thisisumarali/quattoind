"use client";

import { useState } from "react";
import { createCategory, deleteCategory } from "@/app/actions";
import { FolderPlus, Trash2, Tag, Calendar, Layers } from "lucide-react";

export default function CategoryManager({ initialCategories }) {
  const [categories, setCategories] = useState(initialCategories);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;

    setLoading(true);
    try {
      const res = await createCategory(newCategoryName);
      if (res.success) {
        // Simple reload to refresh all server/client states
        window.location.reload();
      } else {
        alert(res.error || "Failed to create category");
      }
    } catch (err) {
      alert("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCategory = async (id, name) => {
    if (!confirm(`Are you sure you want to delete the category "${name}"? Existing products with this category slug will not be deleted, but they will no longer match this category filter.`)) return;

    try {
      const res = await deleteCategory(id);
      if (res.success) {
        setCategories(categories.filter((cat) => cat.id !== id));
      } else {
        alert(res.error || "Failed to delete category");
      }
    } catch (err) {
      alert("An unexpected error occurred");
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 flex items-center gap-2">
          <Layers className="w-8 h-8 text-sky-600" />
          Product Categories
        </h1>
        <p className="text-sm text-slate-500 max-w-xl">
          Manage product categories dynamically. Added categories will appear in the product creation forms and public catalog filtering tabs.
        </p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
        
        {/* Left Form Panel */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 sm:p-6 space-y-4">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <FolderPlus className="w-4 h-4 text-sky-600" />
            Add New Category
          </h2>
          <form onSubmit={handleAddCategory} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Category Name
              </label>
              <input
                type="text"
                required
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="e.g. DuPont Filmtec, Pumps, Vessels"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-sky-500 text-sm font-medium"
              />
              <p className="text-[10px] text-slate-400 leading-normal">
                Slug will be generated automatically (e.g. "DuPont Filmtec" becomes "dupont-filmtec").
              </p>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-xl bg-slate-950 hover:bg-sky-600 text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-sm disabled:bg-slate-400 cursor-pointer"
            >
              {loading ? "Adding..." : "Add Category"}
            </button>
          </form>
        </div>

        {/* Right List Panel */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Tag className="w-4 h-4 text-sky-600" />
              Existing Categories ({categories.length})
            </h2>
          </div>

          {categories.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-sm font-medium">
              No categories found. Add your first custom category using the form.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="px-6 py-3.5 text-xs font-bold text-slate-700 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3.5 text-xs font-bold text-slate-700 uppercase tracking-wider">Slug (Ref ID)</th>
                    <th className="px-6 py-3.5 text-xs font-bold text-slate-700 uppercase tracking-wider hidden sm:table-cell">Added On</th>
                    <th className="px-6 py-3.5 text-xs font-bold text-slate-700 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {categories.map((cat) => (
                    <tr key={cat.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 text-sm font-semibold text-slate-900">{cat.name}</td>
                      <td className="px-6 py-4 text-xs font-mono text-slate-500">
                        <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded">
                          {cat.slug}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs text-slate-500 hidden sm:table-cell">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          {new Date(cat.createdAt).toLocaleDateString()}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleDeleteCategory(cat.id, cat.name)}
                          className="p-1.5 hover:bg-rose-50 hover:text-rose-600 text-slate-400 rounded-lg transition-colors cursor-pointer"
                          title="Delete Category"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
