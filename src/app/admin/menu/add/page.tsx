// src/app/admin/menu/add/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAddMenuItem } from '@/hooks/useAddMenuItem';
import { MenuItemForm, MenuItemType } from '@/types/menuForm';
import { ArrowLeft, Save, Loader2, Coffee, HelpCircle, Image } from 'lucide-react';
import toast from 'react-hot-toast';

// Available menu item types
const menuTypes: MenuItemType[] = [
  "hot", "cold", "blended", "iced", "snack", "dessert", 
  "specialty", "seasonal", "espresso-based", "alcoholic",
  "caffeine-free", "regional", "non-coffee", "decaffeinated", "spiced"
];

const initialFormData: MenuItemForm = {
  name: '',
  type: 'hot',
  price: '',
  description: '',
  image_url: ''
};

export default function AddMenuItemPage() {
  const router = useRouter();
  const { addMenuItem, isSubmitting } = useAddMenuItem();
  const [formData, setFormData] = useState<MenuItemForm>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Handle form changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when field is modified
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    const price = parseFloat(formData.price);
    if (isNaN(price) || price <= 0) {
      newErrors.price = 'Please enter a valid price';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (formData.image_url && !isValidUrl(formData.image_url)) {
      newErrors.image_url = 'Please enter a valid URL';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // URL validation helper
  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    const success = await addMenuItem(formData);
    if (success) {
      router.push('/admin/menu');
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <button
        onClick={() => router.back()}
        className="flex items-center text-gray-600 hover:text-amber-600 
                 transition-colors mb-8"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Menu
      </button>

      <div className="bg-white text-black rounded-xl shadow-md p-6">
        <div className="flex items-center space-x-4 mb-6">
          <Coffee className="w-8 h-8 text-amber-600" />
          <h1 className="text-2xl font-bold text-gray-900">Add New Menu Item</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Input */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Item Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Cappuccino"
              className={`w-full p-2 border rounded-md ${
                errors.name ? 'border-red-300' : 'border-gray-300'
              }`}
            />
            {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
          </div>

          {/* Type Select */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Item Type
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              {menuTypes.map(type => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Price Input */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Price (BDT)
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="0.00"
              min="0"
              step="0.01"
              className={`w-full p-2 border rounded-md ${
                errors.price ? 'border-red-300' : 'border-gray-300'
              }`}
            />
            {errors.price && <p className="text-sm text-red-600">{errors.price}</p>}
          </div>

          {/* Image URL Input */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Image URL (Optional)
            </label>
            <input
              type="url"
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className={`w-full p-2 border rounded-md ${
                errors.image_url ? 'border-red-300' : 'border-gray-300'
              }`}
            />
            {errors.image_url && (
              <p className="text-sm text-red-600">{errors.image_url}</p>
            )}
          </div>

          {/* Description Input */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              placeholder="Describe your menu item..."
              className={`w-full p-2 border rounded-md ${
                errors.description ? 'border-red-300' : 'border-gray-300'
              }`}
            />
            {errors.description && (
              <p className="text-sm text-red-600">{errors.description}</p>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2 border border-gray-300 rounded-lg 
                       text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-amber-600 text-white rounded-lg 
                       hover:bg-amber-700 transition-colors flex items-center
                       space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin w-5 h-5" />
                  <span>Adding...</span>
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  <span>Add Item</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}