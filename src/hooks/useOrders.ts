// src/hooks/useOrders.ts
import { useState, useEffect } from 'react';
import axios from 'axios';
import { OrdersResponse } from '@/types/order';
import toast from 'react-hot-toast';
import { useAppSelector } from '@/redux/store';
export const useOrders = () => {
  const [orders, setOrders] = useState<OrdersResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const authToken = useAppSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get<OrdersResponse>(
          `${process.env.NEXT_PUBLIC_API_URL}/orders/my-orders`,
          {
            headers: { Authorization: `Bearer ${authToken}` },
            withCredentials: true,
          }
        );

        if (response.data.success) {
          setOrders(response.data);
        } else {
          throw new Error('Failed to fetch orders');
        }
      } catch (err) {
        const errorMessage = 'Failed to load orders. Please try again later.';
        setError(errorMessage);
        
        toast.error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [authToken]);

  return { orders, isLoading, error };
};