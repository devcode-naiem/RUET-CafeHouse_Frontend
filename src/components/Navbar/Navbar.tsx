// src/components/Navbar/Navbar.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';
import { Menu, X, Coffee, ShoppingCart, User, LogOut } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { logout } from '@/redux/features/authSlice';
import toast from 'react-hot-toast';

// Define our type for the auth state from Redux
interface AuthState {
  user: {
    name: string;
    role: string;
  } | null;
}

export default function Navbar() {
  // Set up our hooks and state
  const pathname = usePathname();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  // Get user data from Redux store
  const { user } = useSelector((state: { auth: AuthState }) => state.auth);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
    setIsProfileOpen(false);
  }, [pathname]);

  // Handle logout
  const handleLogout = () => {
    dispatch(logout());
    toast.success('Logged out successfully');
  };

  // Define navigation links based on user role
  const getNavLinks = () => {
    const commonLinks = [
      { href: '/', label: 'Home' },
      { href: '/menu', label: 'Menu' },
      { href: '/cart', label: 'Cart' },
      { href: '/about', label: 'About' },
    ];

    const userLinks = [
      { href: '/myorders', label: 'My Orders' },
    ];

    const adminLinks = [
      { href: '/admin/orders', label: 'Manage Orders' },
      { href: '/admin/menu', label: 'Manage Menu' },
    ];

    return user?.role === 'admin' 
      ? [...commonLinks, ...adminLinks]
      : [...commonLinks, ...(user ? userLinks : [])];
  };

  // Style classes for consistent look
  const linkClasses = `
    relative px-4 py-2 text-sm font-medium transition-colors
    hover:text-amber-600 
    after:absolute after:left-0 after:bottom-0 
    after:h-0.5 after:w-0 after:bg-amber-600
    after:transition-all after:duration-300
    hover:after:w-full
  `;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-b border-amber-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <Link href="/" className="flex items-center space-x-2">
            <Coffee className="h-8 w-8 text-amber-600" />
            <span className="font-bold text-xl text-amber-900">CafeShop</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {getNavLinks().map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${linkClasses} ${
                  pathname === link.href ? 'text-amber-600 after:w-full' : 'text-gray-600'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* User Actions Section */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg
                           hover:bg-amber-50 transition-colors"
                >
                  <User className="h-5 w-5 text-amber-600" />
                  <span className="text-sm font-medium text-gray-700">
                    {user.name}
                  </span>
                </button>

                {/* Profile Dropdown */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg
                                py-2 border border-amber-100">
                    {user.role !== 'admin' && (
                      <>
                        <Link
                          href="/cart"
                          className="flex items-center px-4 py-2 text-sm text-gray-700
                                   hover:bg-amber-50"
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Cart
                        </Link>
                      </>
                    )}
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600
                               hover:bg-red-50"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/signin"
                className="px-4 py-2 rounded-lg text-sm font-medium text-white
                         bg-gradient-to-r from-amber-600 to-amber-700
                         hover:from-amber-700 hover:to-amber-800
                         transition-all duration-300"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-gray-600 hover:bg-amber-50"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-amber-100">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {getNavLinks().map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-3 py-2 rounded-lg text-base font-medium
                          ${pathname === link.href
                            ? 'text-amber-600 bg-amber-50'
                            : 'text-gray-600 hover:bg-amber-50'
                          }`}
              >
                {link.label}
              </Link>
            ))}
            
            {/* Mobile User Actions */}
            {user ? (
              <>
                <div className="px-3 py-2 text-sm font-medium text-gray-500">
                  Signed in as {user.name}
                </div>
                {user.role !== 'admin' && (
                  <Link
                    href="/cart"
                    className="block px-3 py-2 rounded-lg text-base font-medium
                             text-gray-600 hover:bg-amber-50"
                  >
                    <ShoppingCart className="h-5 w-5 inline mr-2" />
                    Cart
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 rounded-lg
                           text-base font-medium text-red-600 hover:bg-red-50"
                >
                  <LogOut className="h-5 w-5 inline mr-2" />
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                href="/signin"
                className="block px-3 py-2 rounded-lg text-base font-medium
                         text-amber-600 hover:bg-amber-50"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}