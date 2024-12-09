// src/hooks/useOrderDetails.ts
import { useState, useEffect } from 'react';
import axios from 'axios';
import { OrderDetailsResponse } from '@/types/orderDetails';
import toast from 'react-hot-toast';
import { useAppSelector } from '@/redux/store';

export const useOrderDetails = (orderId: string) => {
  const [orderDetails, setOrderDetails] = useState<OrderDetailsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const authToken = useAppSelector((state) => state.auth.token);


  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get<OrderDetailsResponse>(
          `${process.env.NEXT_PUBLIC_API_URL}/orders/my-orders/${orderId}`,
          {
            headers: { Authorization: `Bearer ${authToken}` },
            withCredentials: true,
          }
        );

        if (response.data.success) {
          setOrderDetails(response.data);
        } else {
          throw new Error('Failed to fetch order details');
        }
      } catch (err) {
        const errorMessage = 'Failed to load order details. Please try again later.';
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    if (orderId) {
      fetchOrderDetails();
    }
  }, [orderId]);

  return { orderDetails, isLoading, error };
};