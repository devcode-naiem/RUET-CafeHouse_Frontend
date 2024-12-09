// src/app/menu/page.tsx
'use client';

import { useState } from 'react';
import { useMenu } from '@/hooks/useMenu';
import { useCartOperations } from '@/hooks/useCartOperations';
import { MenuCard } from '@/components/menu/MenuCard';
import { MenuItem, MenuItemType } from '@/types/menu';
import { Coffee, Loader2 } from 'lucide-react';

const categoryLabels: Record<MenuItemType, string> = {
  hot: '🔥 Hot Coffee',
  cold: '❄️ Cold Coffee',
  blended: '🌪️ Blended Drinks',
  dessert: '🍰 Coffee Desserts',
  seasonal: '🍂 Seasonal Specials',
  specialty: '✨ Specialty Coffee'
};

export default function MenuPage() {
  const { menu, isLoading, error } = useMenu();
  const { handleAddToCart } = useCartOperations();
  const [selectedCategory, setSelectedCategory] = useState<MenuItemType | 'all'>('all');

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin text-amber-600" />
          <p className="text-gray-600">Loading our delicious menu...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <Coffee className="w-16 h-16 mx-auto text-amber-600" />
          <p className="text-red-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-amber-600 text-white rounded-lg 
                     hover:bg-amber-700 transition-colors duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const menuData = menu?.data || {};
  const categories = selectedCategory === 'all' 
    ? Object.entries(menuData)
    : [[selectedCategory, menuData[selectedCategory] || []]];

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
          Our Menu
        </h1>

        {/* Category Navigation */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-full transition-colors duration-300
                       ${selectedCategory === 'all'
                         ? 'bg-amber-600 text-white shadow-md'
                         : 'bg-amber-100 text-amber-800 hover:bg-amber-200'}`}
          >
            All Items
          </button>
          {Object.keys(menuData).map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category as MenuItemType)}
              className={`px-4 py-2 rounded-full transition-colors duration-300
                         ${selectedCategory === category
                           ? 'bg-amber-600 text-white shadow-md'
                           : 'bg-amber-100 text-amber-800 hover:bg-amber-200'}`}
            >
              {categoryLabels[category as MenuItemType]}
            </button>
          ))}
        </div>

        {/* Menu Sections */}
        <div className="space-y-12">
          {categories.map(([category, items]) => items && (
            <div key={`category-${category}`} className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800 pl-4 
                           border-l-4 border-amber-500">
                {categoryLabels[category as MenuItemType]}
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {(items as MenuItem[]).map((item: MenuItem) => (
                  <MenuCard
                    key={`item-${item.id}`}
                    item={item}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}