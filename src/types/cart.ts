// src/types/cart.ts
export interface CartItem {
    id: number;
    name: string;
    quantity: number;
    price: number;
  }
  
  export interface OrderPayload {
    items: {
      menuItemId: number;
      quantity: number;
      unitPrice: number;
    }[];
    totalAmount: number;
    deliveryAddress: string;
    phone: string;
    specialInstructions: string;
  }
  
  export interface OrderResponse {
    success: boolean;
    message: string;
  }