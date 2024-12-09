// src/hooks/useAddMenuItem.ts
import { useState } from 'react';
import axios from 'axios';
import { MenuItemForm, AddMenuResponse } from '@/types/menuForm';
import toast from 'react-hot-toast';

export const useAddMenuItem = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addMenuItem = async (menuItem: MenuItemForm) => {
    try {
      setIsSubmitting(true);
      const response = await axios.post<AddMenuResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/menu/add`,
        menuItem
      );

      if (response.data.success) {
        toast.success(response.data.message);
        return true;
      } else {
        throw new Error('Failed to add menu item');
      }
    } catch (error) {
      toast.error('Failed to add menu item. Please try again.');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return { addMenuItem, isSubmitting };
};