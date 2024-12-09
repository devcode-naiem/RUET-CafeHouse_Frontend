// src/app/admin/menu/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useAdminMenu } from '@/hooks/useAdminMenu';
import Image from 'next/image';
import { 
  Loader2, AlertCircle, Plus, Trash2, 
  Coffee, Edit 
} from 'lucide-react';
import { useState } from 'react';
 

export default function AdminMenuPage() {
  const router = useRouter();
  const { menu, isLoading, isDeleting, error, deleteMenuItem } = useAdminMenu();
  const [selectedType, setSelectedType] = useState<string>('all');

  // Confirm deletion
  const handleDelete = async (itemId: number, itemName: string) => {
    if (window.confirm(`Are you sure you want to delete "${itemName}"?`)) {
      await deleteMenuItem(itemId);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin text-amber-600" />
          <p className="text-gray-600">Loading menu items...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto" />
          <p className="text-red-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-amber-600 text-white rounded-lg 
                     hover:bg-amber-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const categories = menu ? ['all', ...Object.keys(menu)] : ['all'];
  const itemsToDisplay = selectedType === 'all'
    ? Object.values(menu || {}).flat()
    : menu?.[selectedType] || [];

  return (
    <div className=" max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 overflow-y-auto-scroll">
      <div className="flex justify-between items-center mb-8 mt-12">
        <h1 className="text-3xl font-bold text-gray-900">Manage Menu</h1>
        <button
          onClick={() => router.push('/admin/menu/add')}
          className="px-4 py-2 bg-amber-600 text-white rounded-lg 
                   hover:bg-amber-700 transition-colors flex items-center 
                   space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add New Item</span>
        </button>
      </div>

      {/* Category Filter */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          {categories.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-4 py-2 rounded-full transition-colors
                         ${selectedType === type
                           ? 'bg-amber-600 text-white'
                           : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                         }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {itemsToDisplay.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-md overflow-hidden 
                     hover:shadow-lg transition-shadow duration-200"
          >
            {/* Item Image */}
            <div className="relative h-48 bg-amber-100">
              {item.image_url ? (
                <Image
                  src={item.image_url}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Coffee className="w-12 h-12 text-amber-300" />
                </div>
              )}
              <div className="absolute top-2 right-2 space-x-2">
                <button
                  onClick={() => router.push(`/admin/menu/edit/${item.id}`)}
                  className="p-2 bg-white rounded-full shadow-md 
                           hover:bg-gray-100 transition-colors"
                >
                  <Edit className="w-4 h-4 text-amber-600" />
                </button>
                <button
                  onClick={() => handleDelete(item.id, item.name)}
                  disabled={isDeleting}
                  className="p-2 bg-white rounded-full shadow-md 
                           hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              </div>
            </div>

            {/* Item Details */}
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-900">
                  {item.name}
                </h3>
                <span className="text-lg font-bold text-amber-600">
                  ৳{parseFloat(item.price).toFixed(2)}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                {item.description}
              </p>
              <div className="flex justify-between items-center">
                <span className="px-3 py-1 bg-amber-100 text-amber-800 
                               rounded-full text-sm">
                  {item.type}
                </span>
                <span className={`text-sm ${
                  item.is_available 
                    ? 'text-green-600' 
                    : 'text-red-600'
                }`}>
                  {item.is_available ? 'Available' : 'Unavailable'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}