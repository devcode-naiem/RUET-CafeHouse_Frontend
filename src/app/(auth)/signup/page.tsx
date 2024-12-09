// src/app/(auth)/signup/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useSignup } from '@/hooks/auth/useSignup';
import { User, Mail, Phone, Lock, Loader2, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

// Define the form state interface for better type safety
interface FormState {
  name: string;
  email: string;
  phone: string;
  password: string;
}

// Define validation error interface
interface ValidationErrors {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
}

export default function SignupPage() {
  const router = useRouter();
  const { signup, isLoading } = useSignup();
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    password: '',
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSuccess, setIsSuccess] = useState(false);

  // Client-side validation function
  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (formData.name.length < 3) {
      newErrors.name = 'Name must be at least 3 characters long';
    }

    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.match(/^01[3-9]\d{8}$/)) {
      newErrors.phone = 'Please enter a valid Bangladeshi phone number';
    }

    if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    try {
      const success = await signup(formData);
      if (success) {
        setIsSuccess(true);
        toast.success('Registration successful! Redirecting to login...', {
          duration: 3000,
          icon: '🎉',
        });
        // Delay redirect to show success message
        setTimeout(() => {
          router.push('/signin');
        }, 3000);
      }
    } catch (error) {
      toast.error('An unexpected error occurred. Please try again.');
    }
  };

  // Style classes with improved color scheme
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
    <div className="max-h-screen   p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-gradient-to-br from-white/80 to-amber-50/80 backdrop-blur-lg 
                      p-6 sm:p-8 rounded-2xl shadow-xl border border-amber-100/50">
          <h2 className="text-2xl font-bold text-amber-900 mb-6 text-center">
            Create Your Account
          </h2>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Form fields with improved error handling */}
            {Object.entries({
              name: { icon: User, placeholder: 'Your full name' },
              email: { icon: Mail, placeholder: 'your@email.com' },
              phone: { icon: Phone, placeholder: '01xxxxxxxxx' },
              password: { icon: Lock, placeholder: '••••••••' }
            }).map(([field, { icon: Icon, placeholder }]) => (
              <div key={field}>
                <label htmlFor={field} 
                       className="block text-sm font-medium text-amber-900 mb-1">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <div className="relative">
                  <Icon className={iconClasses} size={18} />
                  <input
                    id={field}
                    name={field}
                    type={field === 'password' ? 'password' : 'text'}
                    required
                    className={inputClasses}
                    placeholder={placeholder}
                    value={formData[field as keyof FormState]}
                    onChange={handleChange}
                    aria-invalid={!!errors[field as keyof ValidationErrors]}
                  />
                  {errors[field as keyof ValidationErrors] && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors[field as keyof ValidationErrors]}
                    </p>
                  )}
                </div>
              </div>
            ))}

            <button
              type="submit"
              disabled={isLoading || isSuccess}
              className="w-full py-3 px-4 rounded-lg font-medium text-white
                       bg-gradient-to-r from-amber-600 to-amber-700
                       hover:from-amber-700 hover:to-amber-800
                       focus:outline-none focus:ring-2 focus:ring-offset-2 
                       focus:ring-amber-500 transition-all duration-300
                       disabled:opacity-50 disabled:cursor-not-allowed
                       flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : isSuccess ? (
                <>
                  <CheckCircle2 size={20} />
                  Success!
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-amber-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-amber-50 text-amber-700">
                  Already have an account?
                </span>
              </div>
            </div>

            <Link
              href="/signin"
              className="mt-4 block w-full text-center py-2 px-4 rounded-lg
                       border-2 border-amber-600 text-amber-700 font-medium
                       hover:bg-amber-50 transition-colors duration-300"
            >
              Sign in instead
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}