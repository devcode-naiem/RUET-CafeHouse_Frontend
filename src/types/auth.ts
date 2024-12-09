// src/types/auth.ts
export interface User {
    userId: number;
    name: string;
    email: string;
    phone: string;
    role: 'user' | 'admin';
  }
  
  export interface AuthState {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    error: string | null;
  }
  
  export interface LoginResponse {
    success: boolean;
    message: string;
    data: {
      userId: number;
      name: string;
      email: string;
      phone: string;
      role: 'user' | 'admin';
      token: string;
    };
  }

   