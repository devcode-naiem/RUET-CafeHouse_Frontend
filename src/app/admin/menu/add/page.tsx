// src/app/admin/menu/add/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAddMenuItem } from '@/hooks/useAddMenuItem';
import { MenuItemForm, MenuItemType } from '@/types/menuForm';
import { 
  ArrowLeft, Save, Loader2, Coffee, 
  HelpCircle 
} from 'lucide-react';
import toast from 'react-hot-toast';

// Available menu item types
const menuTypes: MenuItemType[] = [
  "hot", "cold", "blended", "iced", "snack", "dessert", 
  "specialty", "seasonal", "espresso-based", "alcoholic",
  "caffeine-free", "regional", "non-coffee", "decaffeinated", "spiced"
];

export default function AddMenuItemPage() {
  const router = useRouter();
  const { addMenuItem, isSubmitting } = useAddMenuItem();

  // Form state
  const [formData, setFormData] = useState<MenuItemForm>({
    name: '',
    type: 'hot',
    price: '',
    description: ''
  });

  // Validation state
// Update errors state to accommodate string messages
const [errors, setErrors] = useState<Partial<Record<keyof MenuItemForm, string>>>({});

  // Form validation
  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof MenuItemForm, string>> = {};
  
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
  
    if (!menuTypes.includes(formData.type as MenuItemType)) {
      newErrors.type = 'Please select a valid type';
    }
  
    const price = parseFloat(formData.price);
    if (isNaN(price) || price <= 0) {
      newErrors.price = 'Please enter a valid price';
    }
  
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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

  // Input field component
  const InputField = ({ 
    label, 
    name, 
    type = 'text', 
    error, 
    tooltip,
    ...props 
  }: {
    label: string;
    name: keyof MenuItemForm;
    type?: string;
    error?: string;
    tooltip?: string;
  }) => (
    <div className="space-y-1">
      <div className="flex items-center space-x-2">
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        {tooltip && (
          <div className="group relative">
            <HelpCircle className="w-4 h-4 text-gray-400" />
            <div className="absolute bottom-full mb-2 hidden group-hover:block
                          bg-gray-900 text-white text-xs rounded p-2 w-48">
              {tooltip}
            </div>
          </div>
        )}
      </div>
      {type === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          value={formData[name]}
          onChange={e => setFormData(prev => ({
            ...prev,
            [name]: e.target.value
          }))}
          className={`mt-1 block w-full rounded-md border-gray-300 
                     shadow-sm focus:border-amber-500 focus:ring-amber-500
                     ${error ? 'border-red-300' : ''}`}
          rows={3}
          {...props}
        />
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          value={formData[name]}
          onChange={e => setFormData(prev => ({
            ...prev,
            [name]: e.target.value
          }))}
          className={`mt-1 block w-full rounded-md border-gray-300 
                     shadow-sm focus:border-amber-500 focus:ring-amber-500
                     ${error ? 'border-red-300' : ''}`}
          {...props}
        />
      )}
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="mb-8">
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-600 hover:text-amber-600 
                   transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Menu
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center space-x-4 mb-6">
          <Coffee className="w-8 h-8 text-amber-600" />
          <h1 className="text-2xl font-bold text-gray-900">
            Add New Menu Item
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField
            label="Item Name"
            name="name"
             
            error={errors.name}
          />

          <div className="space-y-1">
            <label htmlFor="type" className="block text-sm font-medium text-gray-700">
              Item Type
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={e => setFormData(prev => ({
                ...prev,
                type: e.target.value as MenuItemType
              }))}
              className="mt-1 block w-full rounded-md border-gray-300 
                       shadow-sm focus:border-amber-500 focus:ring-amber-500"
            >
              {menuTypes.map(type => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
            {errors.type && (
              <p className="mt-1 text-sm text-red-600">{errors.type}</p>
            )}
          </div>

          <InputField
            label="Price"
            name="price"
            type="number"
           
            
            error={errors.price}
            tooltip="Enter the price in BDT"
          />

          <InputField
            label="Description"
            name="description"
            type="textarea"
          
            error={errors.description}
          />

          <div className="flex justify-end space-x-4">
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