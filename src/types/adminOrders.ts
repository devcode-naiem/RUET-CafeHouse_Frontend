// src/types/adminOrders.ts
export interface AdminOrder {
    id: number;
    user_id: number;
    total_amount: string;
    status: 'pending' | 'processing' | 'completed' | 'cancelled';
    delivery_address: string;
    phone: string;
    special_instructions: string;
    created_at: string;
    updated_at: string;
    user_name: string;
    user_email: string;
    total_count: number;
  }
  
  export interface AdminOrdersResponse {
    success: boolean;
    data: AdminOrder[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalItems: number;
    };
  }// src/types/orderDetails.ts
export interface OrderItem {
  id: number;
  order_id: number;
  menu_item_id: number;
  quantity: number;
  unit_price: string;
  subtotal: string;
  item_name: string;
  item_type: string;
}

export interface OrderDetails {
  id: number;
  user_id: number;
  total_amount: string;
  status: string;
  delivery_address: string;
  phone: string;
  special_instructions: string;
  created_at: string;
  updated_at: string;
  user_name: string;
  user_email: string;
  items: OrderItem[];
}

export interface OrderDetailsResponse {
  success: boolean;
  data: OrderDetails;
}

export interface UpdateStatusResponse {
  success: boolean;
  message: string;
}

export type OrderStatus = 'pending' | 'processing' | 'completed' | 'cancelled';