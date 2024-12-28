// src/types/menuForm.ts
export type MenuItemType =
  | "hot"
  | "cold"
  | "blended"
  | "iced"
  | "snack"
  | "dessert"
  | "specialty"
  | "seasonal"
  | "espresso-based"
  | "alcoholic"
  | "caffeine-free"
  | "regional"
  | "non-coffee"
  | "decaffeinated"
  | "spiced";

export interface MenuItemForm {
  name: string;
  type: MenuItemType;
  price: string;
  description: string;
  image_url: string;
}

export interface AddMenuResponse {
  success: boolean;
  message: string;
  data: {
    insertId: number;
    affectedRows: number;
  };
}
