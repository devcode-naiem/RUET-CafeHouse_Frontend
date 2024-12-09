// src/types/order.ts
export interface Order {
    id: number;
    user_id: number;
    total_amount: string;
    status: 'pending' | 'processing' | 'completed' | 'cancelled';
    delivery_address: string;
    phone: string;
    special_instructions: string;
    created_at: string;
    updated_at: string;
    total_count: number;
  }
  
  export interface OrdersResponse {
    success: boolean;
    data: Order[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalItems: number;
    };
  }