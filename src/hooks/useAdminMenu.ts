// src/hooks/useAdminMenu.ts
import { useState, useEffect } from "react";
import axios from "axios";
import { MenuItem } from "@/types/adminMenu";
import toast from "react-hot-toast";
import { useAppSelector } from "@/redux/store";
export const useAdminMenu = () => {
  const [menu, setMenu] = useState<{ [key: string]: MenuItem[] } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const authToken = useAppSelector((state) => state.auth.token);

  const fetchMenu = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/menu/get`
      );

      if (response.data.success) {
        setMenu(response.data.data);
      } else {
        throw new Error("Failed to fetch menu items");
      }
    } catch (err) {
      const errorMessage = "Failed to load menu items. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteMenuItem = async (itemId: number) => {
    try {
      setIsDeleting(true);
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/menu/delete`,

        {
          data: { id: itemId },
          headers: { Authorization: `Bearer ${authToken}` },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success("Menu item deleted successfully");
        await fetchMenu(); // Refresh menu after deletion
      } else {
        throw new Error("Failed to delete menu item");
      }
    } catch (err) {
      toast.error("Failed to delete menu item. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  return {
    menu,
    isLoading,
    isDeleting,
    error,
    deleteMenuItem,
    refetch: fetchMenu,
  };
};
