// src/hooks/useSignin.ts
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setCredentials } from '@/redux/features/authSlice';
 
// Define our type interfaces for better type safety
interface SigninCredentials {
  email: string;
  password: string;
}

interface SigninResponse {
  success: boolean;
  message: string;
  data?: {
    userId: number;
    name: string;
    email: string;
    phone: string;
    role: string; // Role is a string here, we will convert it later
    token: string;
  };
}

export const useSignin = () => {
  // Set up state management
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const signin = async (credentials: SigninCredentials) => {
    setIsLoading(true);
    try {
      // Make the API request to the signin endpoint
      const response = await axios.post<SigninResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/signin`,
        credentials
      );

      // Handle successful signin
      if (response.data.success && response.data.data) {
        const userData = {
          ...response.data.data,
          role: response.data.data.role as "user" | "admin" // Explicitly cast role
        };

        // Dispatch the user data to Redux
        dispatch(
          setCredentials({
            ...response.data,
            data: userData
          })
        );

        // Show success message
        toast.success('Welcome back!', {
          icon: '👋',
          duration: 3000
        });

        return true;
      } else {
        // Handle unsuccessful signin
        toast.error(response.data.message || 'Signin failed');
        return false;
      }
    } catch (error) {
      // Handle any errors that occur during signin
      let errorMessage = 'Failed to sign in';
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      toast.error(errorMessage, {
        duration: 4000
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { signin, isLoading };
};
