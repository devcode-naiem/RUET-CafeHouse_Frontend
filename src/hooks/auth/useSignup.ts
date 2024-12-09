// src/hooks/useSignup.ts
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

interface SignupCredentials {
  name: string;
  email: string;
  phone: string;
  password: string;
}

interface SignupResponse {
  success: boolean;
  message: string;
}

export const useSignup = () => {
  const [isLoading, setIsLoading] = useState(false);

  const signup = async (credentials: SignupCredentials) => {
    setIsLoading(true);
    try {
      const response = await axios.post<SignupResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`,
        credentials
      );

      if (response.data.success) {
        toast.success(response.data.message);
        return true;
      } else {
        toast.error(response.data.message);
        return false;
      }
    } catch (error) {
      let errorMessage = 'Failed to register';
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      toast.error(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { signup, isLoading };
};