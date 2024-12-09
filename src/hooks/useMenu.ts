// src/hooks/useMenu.ts
import { useState, useEffect } from 'react';
import axios from 'axios';
import { MenuResponse } from '@/types/menu';
import toast from 'react-hot-toast';

export const useMenu = () => {
  const [menu, setMenu] = useState<MenuResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get<MenuResponse>(
          `${process.env.NEXT_PUBLIC_API_URL}/menu/get`
        );
        
        if (response.data.success) {
          setMenu(response.data);
        } else {
          throw new Error('Failed to fetch menu data');
        }
      } catch (err) {
        const errorMessage = 'Failed to load menu items. Please try again later.';
        setError(errorMessage);
        toast.error(errorMessage);
        console.error('Error fetching menu:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMenu();
  }, []);

  return { menu, isLoading, error };
};