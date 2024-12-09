// src/hooks/useAdminOrders.ts
import { useState, useEffect } from 'react';
import axios from 'axios';
import { AdminOrdersResponse } from '@/types/adminOrders';
import toast from 'react-hot-toast';
import { useAppSelector } from '@/redux/store';

export const useAdminOrders = () => {
  const [orders, setOrders] = useState<AdminOrdersResponse | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const authToken = useAppSelector((state) => state.auth.token);

  const fetchOrders = async (page: number) => {
    try {
      setIsLoading(true);
      const response = await axios.get<AdminOrdersResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/orders/all?page=${page}`,
        {
            headers: { Authorization: `Bearer ${authToken}` },
            withCredentials: true,
          }
      );

      if (response.data.success) {
        setOrders(response.data);
        setCurrentPage(page);
      } else {
        throw new Error('Failed to fetch orders');
      }
    } catch (err) {
      const errorMessage = 'Failed to load orders. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(currentPage);
  },[currentPage]);

  return {
    orders,
    isLoading,
    error,
    currentPage,
    setCurrentPage,
    refetch: () => fetchOrders(currentPage)
  };
};