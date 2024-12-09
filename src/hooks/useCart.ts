import { useState, useEffect } from "react";
import { CartItem, OrderPayload } from "@/types/cart";
import axios from "axios";
import toast from "react-hot-toast";

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load cart items from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        if (Array.isArray(parsedCart)) {
          setCartItems(parsedCart);
        } else {
          console.warn("Invalid cart data, resetting cart.");
          localStorage.removeItem("cart");
        }
      }
    } catch (error) {
      console.error("Failed to load cart from localStorage", error);
      localStorage.removeItem("cart"); // Clear invalid cart data
    }
  }, []);

  // Save cart items to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    } catch (error) {
      console.error("Failed to save cart to localStorage", error);
    }
  }, [cartItems]);

  const updateQuantity = (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(itemId);
      return;
    }

    setCartItems((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? {
              ...item,
              quantity: newQuantity,
              price: newQuantity * (item.price / item.quantity),
            }
          : item
      )
    );
    toast.success("Cart updated");
  };

  const removeItem = (itemId: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
    toast.success("Item removed from cart");
  };

  const clearCart = () => {
    alert("Clearing");
    setCartItems([]);
    localStorage.removeItem("cart");
  };

  const placeOrder = async (
    deliveryDetails: Omit<OrderPayload, "items" | "totalAmount">
  ) => {
    try {
      setIsLoading(true);
      const totalAmount = cartItems.reduce((sum, item) => sum + item.price, 0);

      const orderPayload: OrderPayload = {
        items: cartItems.map((item) => ({
          menuItemId: item.id,
          quantity: item.quantity,
          unitPrice: item.price / item.quantity,
        })),
        totalAmount,
        ...deliveryDetails,
      };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/orders/create`,
        orderPayload,
        { withCredentials: true }
      );

      if (response.data.success) {
        alert("orders created successfully");
        clearCart();
        toast.success("Order placed successfully!");
        return true;
      }
      return false;
    } catch (error) {
      toast.error("Failed to place order. Please try again.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    cartItems,
    updateQuantity,
    removeItem,
    clearCart,
    placeOrder,
    isLoading,
    totalAmount: cartItems.reduce((sum, item) => sum + item.price, 0),
  };
};
