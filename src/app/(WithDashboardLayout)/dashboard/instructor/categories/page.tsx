'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Plus, Edit2, Trash2, Search, X } from 'lucide-react';

export default function ManageCategoriesPage() {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Web Development' },
    { id: 2, name: 'Mobile Development' },
    { id: 3, name: 'Data Science'},
    { id: 4, name: 'UI/UX Design'},
    { id: 5, name: 'Cloud Computing'},
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: '' });

  const filteredCategories = categories.filter(cat =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenModal = (category?: typeof categories[0]) => {
    if (category) {
      setEditingId(category.id);
      setFormData({ name: category.name});
    } else {
      setEditingId(null);
      setFormData({ name: '' });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingId(null);
    setFormData({ name: '' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    if (editingId) {
      setCategories(categories.map(cat =>
        cat.id === editingId
          ? { ...cat, ...formData }
          : cat
      ));
    } else {
      setCategories([...categories, {
        id: Math.max(...categories.map(c => c.id), 0) + 1,
        ...formData,
      }]);
    }
    handleCloseModal();
  };

  const handleDelete = (id: number) => {
    setCategories(categories.filter(cat => cat.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard/instructor"
            className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Manage Categories</h1>
            <p className="text-muted-foreground">Create and organize course categories</p>
          </div>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium"
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
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Categories Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredCategories.map(category => (
          <div key={category.id} className="rounded-lg border border-border bg-card p-6 hover:border-primary/50 transition-colors">
            

            <h3 className="text-lg font-semibold text-foreground mb-2">{category.name}</h3>

      

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={() => handleOpenModal(category)}
                className="flex-1 px-3 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors font-medium text-sm flex items-center justify-center gap-2"
              >
                <Edit2 className="h-4 w-4" />
                Edit
              </button>
              <button
                onClick={() => handleDelete(category.id)}
                className="flex-1 px-3 py-2 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors font-medium text-sm flex items-center justify-center gap-2"
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredCategories.length === 0 && (
        <div className="rounded-lg border border-dashed border-border bg-muted/30 p-12 text-center">
          <h3 className="text-lg font-semibold text-foreground mb-2">No categories found</h3>
          <p className="text-sm text-muted-foreground">
            {searchQuery ? 'Try adjusting your search' : 'Create your first category to get started'}
          </p>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-card border border-border rounded-lg shadow-lg max-w-sm w-full">
            <div className="p-6 space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-foreground">
                  {editingId ? 'Edit Category' : 'Add Category'}
                </h2>
                <button
                  onClick={handleCloseModal}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Category Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Web Development"
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t border-border">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="flex-1 px-4 py-2 rounded-lg border border-border bg-background text-foreground hover:bg-muted transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium"
                  >
                    {editingId ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
