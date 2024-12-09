// src/components/Footer.tsx
import Link from 'next/link';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Coffee } from 'lucide-react';

export default function Footer() {
  // Get the current year for the copyright notice
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-amber-50 to-amber-100 border-t border-amber-200">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Coffee className="h-8 w-8 text-amber-600" />
              <span className="text-xl font-bold text-gray-900">CafeShop</span>
            </div>
            <p className="text-gray-600 text-sm">
              Serving the finest coffee to the RUET community. Experience the perfect blend of 
              tradition and innovation in every cup.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { href: '/menu', label: 'Our Menu' },
                { href: '/about', label: 'About Us' },
                { href: '/orders', label: 'Track Order' },
                { href: '/contact', label: 'Contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-amber-600 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3 text-gray-600">
                <MapPin size={18} className="text-amber-600 flex-shrink-0" />
                <span>RUET Campus, Rajshahi</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-600">
                <Phone size={18} className="text-amber-600 flex-shrink-0" />
                <span>+880 1234-567890</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-600">
                <Mail size={18} className="text-amber-600 flex-shrink-0" />
                <span>hello@ruetcafe.com</span>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-4">Opening Hours</h3>
            <ul className="space-y-2">
              <li className="text-gray-600">
                <span className="font-medium">Weekdays:</span> 8:00 AM - 10:00 PM
              </li>
              <li className="text-gray-600">
                <span className="font-medium">Weekends:</span> 9:00 AM - 11:00 PM
              </li>
            </ul>

            {/* Social Links */}
            <div className="mt-6">
              <h4 className="text-gray-900 font-semibold mb-3">Follow Us</h4>
              <div className="flex space-x-4">
                {[
                  { icon: Facebook, href: '#', label: 'Facebook' },
                  { icon: Instagram, href: '#', label: 'Instagram' },
                  { icon: Twitter, href: '#', label: 'Twitter' },
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-amber-100 text-amber-600 hover:bg-amber-200 
                               transition-colors duration-200"
                    aria-label={label}
                  >
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-amber-100 border-t border-amber-200">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <p className="text-sm text-gray-600">
              © {currentYear} RUET CafeShop. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link
                href="/privacy"
                className="text-sm text-gray-600 hover:text-amber-600 transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-gray-600 hover:text-amber-600 transition-colors duration-200"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
