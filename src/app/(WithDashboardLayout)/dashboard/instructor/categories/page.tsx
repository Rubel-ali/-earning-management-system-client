"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, Edit2, Trash2, Search, X } from "lucide-react";
import {
  useAllCategoriesQuery,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} from "@/redux/features/category/categoryApi";

export default function ManageCategoriesPage() {
  const { data, isLoading } = useAllCategoriesQuery(undefined);

  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const categories = data?.data || [];

  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "" });

  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    categoryId: string | null;
    categoryName: string;
  }>({
    isOpen: false,
    categoryId: null,
    categoryName: "",
  });

  // 🔍 Filter
  const filteredCategories = categories.filter((cat: any) =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenModal = (category?: any) => {
    if (category) {
      setEditingId(category.id);
      setFormData({ name: category.name });
    } else {
      setEditingId(null);
      setFormData({ name: "" });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingId(null);
    setFormData({ name: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) return;

    try {
      if (editingId) {
        await updateCategory({
          id: editingId,
          body: { name: formData.name },
        }).unwrap();
      } else {
        await createCategory({
          name: formData.name,
        }).unwrap();
      }

      handleCloseModal();
    } catch (error: any) {
      alert(error?.data?.message || "Something went wrong");
    }
  };

  const openDeleteModal = (id: string, name: string) => {
    setDeleteModal({
      isOpen: true,
      categoryId: id,
      categoryName: name,
    });
  };

  const closeDeleteModal = () => {
    setDeleteModal({
      isOpen: false,
      categoryId: null,
      categoryName: "",
    });
  };

  const handleDeleteCategory = async () => {
    if (!deleteModal.categoryId) return;

    try {
      await deleteCategory(deleteModal.categoryId).unwrap();
      closeDeleteModal();
    } catch (error: any) {
      alert(error?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard/instructor"
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Manage Categories</h1>
            <p className="text-muted-foreground">
              Create and organize course categories
            </p>
          </div>
        </div>

        <button
          onClick={() => handleOpenModal()}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white"
        >
          <Plus className="h-4 w-4" />
          Add Category
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search categories..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-lg border"
        />
      </div>

      {/* Loading */}
      {isLoading && <p>Loading categories...</p>}

      {/* Categories Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredCategories.map((category: any) => (
          <div key={category.id} className="rounded-lg border p-6">
            <h3 className="text-lg font-semibold mb-4">
              {category.name}
            </h3>

            <div className="flex gap-2">
              <button
                onClick={() => handleOpenModal(category)}
                className="flex-1 px-3 py-2 rounded-lg bg-blue-100 text-blue-600 text-sm"
              >
                <Edit2 className="h-4 w-4 inline mr-1" />
                Edit
              </button>

              <button
                onClick={() =>
                  openDeleteModal(category.id, category.name)
                }
                className="flex-1 px-3 py-2 rounded-lg bg-red-100 text-red-600 text-sm"
              >
                <Trash2 className="h-4 w-4 inline mr-1" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty */}
      {!isLoading && filteredCategories.length === 0 && (
        <div className="text-center py-10">
          <p>No categories found</p>
        </div>
      )}

      {/* Create / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-lg w-full max-w-sm p-6">
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-semibold">
                {editingId ? "Edit Category" : "Add Category"}
              </h2>
              <button onClick={handleCloseModal}>
                <X />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value,
                  })
                }
                placeholder="Category name"
                className="w-full px-4 py-2 border rounded-lg"
              />

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 border rounded-lg py-2"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex-1 bg-primary text-white rounded-lg py-2"
                >
                  {editingId ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deleteModal.isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-card border rounded-lg shadow-lg max-w-sm w-full">
            <div className="p-6 space-y-4">
              <h2 className="text-lg font-semibold">
                Delete Category?
              </h2>
              <p className="text-sm">
                Are you sure you want to delete `<span className="font-semibold">{deleteModal.categoryName}</span>`?
                {deleteModal.categoryName}`?
              </p>

              <div className="flex gap-3">
                <button
                  onClick={closeDeleteModal}
                  className="flex-1 px-4 py-2 rounded-lg border"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteCategory}
                  className="flex-1 px-4 py-2 rounded-lg bg-destructive text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}