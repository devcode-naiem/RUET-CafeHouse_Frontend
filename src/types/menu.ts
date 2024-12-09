// src/types/menu.ts
export interface MenuItem {
  id: number;
  name: string;
  type: MenuItemType;
  price: string;
  description: string;
  image_url: string | null;
  is_available: number;
  created_at: string;
  updated_at: string;
}

export type MenuItemType = 'hot' | 'cold' | 'blended' | 'dessert' | 'seasonal' | 'specialty';

export interface MenuResponse {
  success: boolean;
  data: {
    [K in MenuItemType]?: MenuItem[];
  };
}