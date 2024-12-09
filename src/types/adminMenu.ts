// src/types/adminMenu.ts
export interface MenuItem {
    id: number;
    name: string;
    type: string;
    price: string;
    description: string;
    image_url: string | null;
    is_available: number;
    created_at: string;
    updated_at: string;
  }
  
  export interface DeleteResponse {
    success: boolean;
    message: string;
  }