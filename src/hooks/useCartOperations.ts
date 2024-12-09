// src/hooks/useCartOperations.ts
import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  selectCartItems,
  selectCartTotal,
  updateQuantity,
  removeItem,
  clearCart,
  setLoading,
  addItem,
} from "@/redux/features/cartSlice";
import axios from "axios";
import toast from "react-hot-toast";
import { MenuItem } from "@/types/menu";

// Define the delivery details type
interface DeliveryDetails {
  deliveryAddress: string;
  phone: string;
  specialInstructions: string;
}

export const useCartOperations = () => {
  const authToken = useAppSelector((state) => state.auth.token);
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const totalAmount = useAppSelector(selectCartTotal);

  // Handle quantity updates
  const handleUpdateQuantity = useCallback(
    (itemId: number, newQuantity: number) => {
      if (newQuantity < 1) {
        dispatch(removeItem(itemId));
        return;
      }
      dispatch(updateQuantity({ id: itemId, quantity: newQuantity }));
    },
    [dispatch]
  );

  // Handle item removal
  const handleRemoveItem = useCallback(
    (itemId: number) => {
      dispatch(removeItem(itemId));
    },
    [dispatch]
  );

  // Handle adding item to cart
  const handleAddToCart = useCallback(
    (item: MenuItem, quantity: number) => {
      const price = parseFloat(item.price) * quantity;
      dispatch(
        addItem({
          id: item.id,
          name: item.name,
          price,
          quantity,
        })
      );
    },
    [dispatch]
  );

  // Handle order placement
  const handlePlaceOrder = useCallback(
    async (deliveryDetails: DeliveryDetails) => {
      try {
        dispatch(setLoading(true));

        // Prepare order payload
        const orderPayload = {
          items: cartItems.map((item) => ({
            menuItemId: item.id,
            quantity: item.quantity,
            unitPrice: item.price / item.quantity,
          })),
          totalAmount,
          ...deliveryDetails,
        };

        // Make API request
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/orders/create`,
          orderPayload,
          {
            headers: { Authorization: `Bearer ${authToken}` },
            withCredentials: true,
          }
        );

        if (response.data.success) {
          dispatch(clearCart());
          toast.success("Order placed successfully!");
          return true;
        }
        return false;
      } catch (error) {
        toast.error("Failed to place order. Please try again.");
        return false;
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch, cartItems, totalAmount, authToken]
  );

  return {
    cartItems,
    totalAmount,
    updateQuantity: handleUpdateQuantity,
    removeItem: handleRemoveItem,
    handleAddToCart, // Ensure this is included
    placeOrder: handlePlaceOrder,
  };
};
