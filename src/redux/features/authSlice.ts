// src/redux/features/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, LoginResponse } from '@/types/auth';

const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Start loading state for any auth action
    setLoading: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    
    // Handle successful login/registration
    setCredentials: (state, action: PayloadAction<LoginResponse>) => {
      const { data } = action.payload;
      state.user = {
        userId: data.userId,
        name: data.name,
        email: data.email,
        phone: data.phone,
        role: data.role,
      };
      state.token = data.token;
      state.isLoading = false;
      state.error = null;
    },
    
    // Handle authentication errors
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    
    // Handle logout
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isLoading = false;
      state.error = null;
    },
    
    // Clear error state
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setLoading,
  setCredentials,
  setError,
  logout,
  clearError,
} = authSlice.actions;

export default authSlice.reducer;