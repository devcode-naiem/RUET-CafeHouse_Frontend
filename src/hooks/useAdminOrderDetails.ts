// src/hooks/useOrderDetails.ts
import { useState, useEffect } from "react";
import axios from "axios";
import {
  OrderDetailsResponse,
  UpdateStatusResponse,
  OrderStatus,
} from "@/types/adminOrderDetails";
import toast from "react-hot-toast";
import { useAppSelector } from "@/redux/store";
export const useOrderDetails = (orderId: string) => {
  const [orderDetails, setOrderDetails] = useState<OrderDetailsResponse | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const authToken = useAppSelector((state) => state.auth.token);

  const fetchOrderDetails = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get<OrderDetailsResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/orders/details/${orderId}`,
        {
          headers: { Authorization: `Bearer ${authToken}` },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        setOrderDetails(response.data);
      } else {
        throw new Error("Failed to fetch order details");
      }
    } catch (err) {
      const errorMessage = "Failed to load order details. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const updateOrderStatus = async (status: OrderStatus) => {
    try {
      setIsUpdating(true);
      const response = await axios.put<UpdateStatusResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/orders/status`,
        {
          orderId: parseInt(orderId),
          status,
        },
        {
          headers: { Authorization: `Bearer ${authToken}` },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success("Order status updated successfully");
        await fetchOrderDetails(); // Refresh order details
      } else {
        throw new Error("Failed to update order status");
      }
    } catch (err) {
      toast.error("Failed to update order status. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    if (orderId) {
      fetchOrderDetails();
    }
  }, [orderId]);

  return {
    orderDetails,
    isLoading,
    isUpdating,
    error,
    updateOrderStatus,
    refetch: fetchOrderDetails,
  };
};
