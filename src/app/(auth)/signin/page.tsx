// src/app/(auth)/signin/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useSignin } from '@/hooks/auth/useSignin';
import { Mail, Lock, Loader2, Coffee } from 'lucide-react';
import toast from 'react-hot-toast';

interface FormState {
  email: string;
  password: string;
}

interface ValidationErrors {
  email?: string;
  password?: string;
}

export default function SigninPage() {
  // Initialize our hooks and state
  const router = useRouter();
  const { signin, isLoading } = useSignin();
  const [formData, setFormData] = useState<FormState>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<ValidationErrors>({});

  // Validate our form inputs
  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name as keyof ValidationErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    const success = await signin(formData);
    if (success) {
      router.push('/'); // Redirect to home page after successful signin
    }
  };

  // Style classes for our form elements
  const inputClasses = `
    block w-full rounded-lg border-2 px-4 py-3 pl-11
    text-gray-900 placeholder-gray-500 transition-all duration-200
    ${errors[name as unknown as keyof ValidationErrors] 
      ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
      : 'border-amber-200 focus:border-amber-500 focus:ring-amber-500'
    }
    focus:outline-none focus:ring-2 focus:ring-opacity-50
    bg-white/90 backdrop-blur-sm
  `;

  const iconClasses = "absolute left-3 top-1/2 -translate-y-1/2 text-amber-700";

  return (
    <div className="max-h-screen overflow-y-auto p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-gradient-to-br from-white/80 to-amber-50/80 
                       backdrop-blur-lg p-6 sm:p-8 rounded-2xl shadow-xl 
                       border border-amber-100/50">
          
          {/* Decorative coffee icon */}
          <div className="mb-8 text-center">
            <div className="inline-block p-3 rounded-full bg-amber-100/50">
              <Coffee size={32} className="text-amber-700" />
            </div>
            <h2 className="mt-4 text-2xl font-bold text-amber-900">
              Welcome Back
            </h2>
            <p className="mt-2 text-sm text-amber-700">
              Sign in to your account to continue
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email input */}
            <div>
              <label htmlFor="email" 
                     className="block text-sm font-medium text-amber-900 mb-1">
                Email
              </label>
              <div className="relative">
                <Mail className={iconClasses} size={18} />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className={inputClasses}
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  aria-invalid={!!errors.email}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>
            </div>

            {/* Password input */}
            <div>
              <label htmlFor="password"
                     className="block text-sm font-medium text-amber-900 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className={iconClasses} size={18} />
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className={inputClasses}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  aria-invalid={!!errors.password}
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                )}
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-lg font-medium text-white
                       bg-gradient-to-r from-amber-600 to-amber-700
                       hover:from-amber-700 hover:to-amber-800
                       focus:outline-none focus:ring-2 focus:ring-offset-2 
                       focus:ring-amber-500 transition-all duration-300
                       disabled:opacity-50 disabled:cursor-not-allowed
                       flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Sign up link */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-amber-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-amber-50 text-amber-700">
                  New to our cafe?
                </span>
              </div>
            </div>

            <Link
              href="/signup"
              className="mt-4 block w-full text-center py-2 px-4 rounded-lg
                       border-2 border-amber-600 text-amber-700 font-medium
                       hover:bg-amber-50 transition-colors duration-300"
            >
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}