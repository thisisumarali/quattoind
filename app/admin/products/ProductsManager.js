"use client";

import { useState } from "react";
import Link from "next/link";
import { createProduct, updateProduct, deleteProduct } from "@/app/actions";
import { Plus, Edit2, Trash2, Search, Link as LinkIcon, FileText } from "lucide-react";

export default function ProductsManager({ initialProducts, initialCategories = [] }) {
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  const defaultCategory = initialCategories.length > 0 ? initialCategories[0].slug : "filmtec";

  // Form State
  const [formData, setFormData] = useState({
    category: defaultCategory,
    name: "",
    desc: "",
    specLink: "",
  });

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormData({
      category: defaultCategory,
      name: "",
      desc: "",
      specLink: "",
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      category: product.category,
      name: product.name,
      desc: product.desc,
      specLink: product.specLink,
    });
    setModalOpen(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const submitData = new FormData(e.currentTarget);

    try {
      if (editingProduct) {
        // Update product
        const res = await updateProduct(editingProduct.id, submitData);
        if (res.success) {
          window.location.reload();
        } else {
          alert(res.error || "Failed to update product");
        }
      } else {
        // Create product
        const res = await createProduct(submitData);
        if (res.success) {
          window.location.reload();
        } else {
          alert(res.error || "Failed to create product");
        }
      }
    } catch (err) {
      alert("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await deleteProduct(id);
      if (res.success) {
        setProducts(products.filter((p) => p.id !== id));
      } else {
        alert(res.error || "Failed to delete product");
      }
    } catch (err) {
      alert("An unexpected error occurred");
    }
  };

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.desc.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  const getCategoryLabel = (category) => {
    switch (category) {
      case "filmtec":
        return "DuPont Filmtec";
      case "toray":
        return "Toray Membranes";
      case "awc":
        return "AWC Chemicals";
      case "media":
        return "CLACK Media";
      default:
        return category;
    }
  };

  return (
    <div className="space-y-6">
      {/* Title Header with Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Products Catalog</h1>
          <p className="text-sm text-slate-500">
            Create, read, update, and delete entries in the Quattro Industries product catalog.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-md shadow-sky-600/10 cursor-pointer w-fit"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search catalog products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-sky-500 text-sm font-medium transition-all"
          />
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 text-slate-400 font-semibold text-sm">
            No products match your search query.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-200">
                  <th className="p-4 sm:p-5">Product Name</th>
                  <th className="p-4 sm:p-5">Category</th>
                  <th className="p-4 sm:p-5">Description</th>
                  <th className="p-4 sm:p-5">Datasheet</th>
                  <th className="p-4 sm:p-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filteredProducts.map((prod) => (
                  <tr key={prod.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4 sm:p-5 font-bold text-slate-900 min-w-[200px]">{prod.name}</td>
                    <td className="p-4 sm:p-5">
                      <span className="inline-flex px-2.5 py-1 rounded-md text-[10px] font-bold bg-slate-100 text-slate-600 uppercase tracking-wider">
                        {getCategoryLabel(prod.category)}
                      </span>
                    </td>
                    <td className="p-4 sm:p-5 text-xs text-slate-500 max-w-sm font-medium leading-relaxed">
                      <p className="line-clamp-2">{prod.desc}</p>
                    </td>
                    <td className="p-4 sm:p-5">
                      <a
                        href={prod.specLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-600 hover:text-sky-700"
                      >
                        <FileText className="w-4 h-4" />
                        View PDF
                      </a>
                    </td>
                    <td className="p-4 sm:p-5 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEdit(prod)}
                          className="p-2 rounded-lg bg-slate-50 border border-slate-200 hover:bg-sky-50 hover:border-sky-200 hover:text-sky-600 text-slate-500 transition-colors cursor-pointer"
                          title="Edit Product"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(prod.id)}
                          className="p-2 rounded-lg bg-slate-50 border border-slate-200 hover:bg-rose-50 hover:border-rose-200 hover:text-rose-600 text-slate-500 transition-colors cursor-pointer"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Edit / Add Product Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-slate-950/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden animate-fade-in">
            {/* Modal Header */}
            <div className="bg-slate-900 text-white p-6 flex justify-between items-center">
              <h2 className="text-lg font-black">
                {editingProduct ? "Edit Product Details" : "Add New Catalog Product"}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                Cancel
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Name */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Product Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleFormChange}
                  placeholder="e.g. DuPont FilmTec BW30 PRO-400"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-sky-500 text-sm font-medium"
                />
              </div>

              {/* Category Dropdown */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Product Category
                </label>
                <select
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-sky-500 text-sm font-medium bg-white"
                >
                  {initialCategories.map((cat) => (
                    <option key={cat.id} value={cat.slug}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                <p className="text-[10px] text-slate-400 font-semibold italic leading-normal">
                  Don't see your category? You can add and manage categories from the <Link href="/admin/categories" className="text-sky-600 hover:underline font-bold">Manage Categories</Link> section.
                </p>
              </div>

              {/* PDF File Upload */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Upload PDF Datasheet {editingProduct ? "(Optional)" : <span className="text-rose-500">*</span>}
                </label>
                <div className="relative">
                  <input
                    type="file"
                    name="pdfFile"
                    accept="application/pdf"
                    required={!editingProduct}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-sky-500 text-sm font-medium file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-sky-50 file:text-sky-700 hover:file:bg-sky-100"
                  />
                </div>
                {editingProduct && (
                  <p className="text-[10px] text-slate-400 font-semibold italic">
                    Current PDF file: <a href={editingProduct.specLink} target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:underline">{editingProduct.specLink}</a>. Leave blank to retain.
                  </p>
                )}
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Description
                </label>
                <textarea
                  name="desc"
                  required
                  rows={4}
                  value={formData.desc}
                  onChange={handleFormChange}
                  placeholder="Provide high rejection and performance specifications..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-sky-500 text-sm font-medium resize-none"
                />
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-sky-600 disabled:bg-slate-400 text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
                >
                  {loading ? "Saving..." : "Save Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
