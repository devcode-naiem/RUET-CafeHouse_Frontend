// src/redux/features/cartSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

// Define the type for our cart items
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

// Define the cart state interface
interface CartState {
  items: CartItem[];
  isLoading: boolean;
  error: string | null;
}

// Initial state for our cart
const initialState: CartState = {
  items: [],
  isLoading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Add an item to cart
    addItem: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
        existingItem.price = action.payload.price * existingItem.quantity;
        toast.success(`Added another ${action.payload.name} to cart  ${action.payload.quantity}`);
      } else {
        state.items.push({
          ...action.payload,
          quantity: action.payload.quantity,
        });
        toast.success(`${action.payload.name} added to cart ${action.payload.quantity}`);
      }
    },

    // Update item quantity
    updateQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const item = state.items.find((item) => item.id === action.payload.id);

      if (item) {
        const unitPrice = item.price / item.quantity;
        item.quantity = action.payload.quantity;
        item.price = unitPrice * action.payload.quantity;

        if (item.quantity === 0) {
          state.items = state.items.filter(
            (item) => item.id !== action.payload.id
          );
        }

        toast.success("Cart updated");
      }
    },

    // Remove an item from cart
    removeItem: (state, action: PayloadAction<number>) => {
      const itemToRemove = state.items.find(
        (item) => item.id === action.payload
      );
      if (itemToRemove) {
        state.items = state.items.filter((item) => item.id !== action.payload);
        toast.success(`${itemToRemove.name} removed from cart`);
      }
    },

    // Clear the entire cart
    clearCart: (state) => {
      state.items = [];
      toast.success("Cart cleared");
    },

    // Set loading state
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    // Set error state
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      if (action.payload) {
        toast.error(action.payload);
      }
    },
  },
});

// Export actions
export const {
  addItem,
  updateQuantity,
  removeItem,
  clearCart,
  setLoading,
  setError,
} = cartSlice.actions;

// Export selectors
export const selectCartItems = (state: { cart: CartState }) => state.cart.items;
export const selectCartTotal = (state: { cart: CartState }) =>
  state.cart.items.reduce((total, item) => total + item.price, 0);
export const selectCartItemCount = (state: { cart: CartState }) =>
  state.cart.items.reduce((count, item) => count + item.quantity, 0);

export default cartSlice.reducer;
