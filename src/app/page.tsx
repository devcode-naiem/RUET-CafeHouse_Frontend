// src/app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Coffee, Clock, MapPin, ArrowRight, Star } from 'lucide-react';

// A custom hook for parallax scrolling effect
const useParallax = (speed: number = 0.5) => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.pageYOffset);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return -offset * speed;
};

export default function HomePage() {
  const parallaxOffset = useParallax();

  // Featured items that will be displayed in the menu preview section
  const featuredItems = [
    {
      id: 1,
      name: "Signature Latte",
      description: "Rich espresso with perfectly steamed milk and our secret recipe",
      price: "180.00",
      image: "/images/signature-latte.jpg"
    },
    {
      id: 2,
      name: "Cold Brew",
      description: "Smooth and refreshing cold brew steeped for 12 hours",
      price: "170.00",
      image: "/images/cold-brew.jpg"
    },
    {
      id: 3,
      name: "Caramel Macchiato",
      description: "Espresso with vanilla-flavored syrup and caramel drizzle",
      price: "160.00",
      image: "/images/caramel-macchiato.jpg"
    }
  ];

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section with Parallax Effect */}
      <section className="relative h-screen min-h-[600px] flex items-center">
        <motion.div 
           
          style={{ y: parallaxOffset }}
        >
          <Image
            src="/images/hero-coffee.jpg"
            alt="Coffee being poured into a cup"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
             
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Your Perfect Cup of Coffee Awaits
            </h1>
            <p className="text-xl mb-8">
              Experience the finest coffee on campus, crafted with passion and expertise.
            </p>
            <Link
              href="/menu"
              className="inline-flex items-center px-8 py-3 bg-amber-600 
                       hover:bg-amber-700 rounded-lg font-semibold 
                       transition-colors duration-300"
            >
              View Menu
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Quick Info Section */}
      <section className="bg-amber-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Clock,
                title: "Opening Hours",
                info: "8:00 AM - 10:00 PM"
              },
              {
                icon: MapPin,
                title: "Location",
                info: "RUET Campus, Rajshahi"
              },
              {
                icon: Coffee,
                title: "Special Offer",
                info: "10% Off for Students"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                
              >
                <item.icon className="h-10 w-10 text-amber-600" />
                <div className="ml-4">
                  <h3 className="font-semibold text-gray-900">{item.title}</h3>
                  <p className="text-gray-600">{item.info}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Menu Items */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Featured Drinks
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our baristas&apos; favorite creations, crafted with premium ingredients 
              and expert technique.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                
              >
                <div className="relative h-64">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-300 
                             group-hover:scale-110"
                  />
                </div>
                <div className="p-6 bg-white">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {item.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-amber-600">
                      ৳{item.price}
                    </span>
                    <button className="px-4 py-2 bg-amber-600 text-white rounded-lg
                                   hover:bg-amber-700 transition-colors duration-300">
                      Order Now
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-16 bg-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            What Our Customers Say
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                text: "The best coffee on campus! Perfect for those early morning classes.",
                author: "Sarah K.",
                role: "Computer Science Student"
              },
              {
                text: "Great atmosphere for studying and amazing coffee. My go-to spot!",
                author: "Michael R.",
                role: "Engineering Student"
              },
              {
                text: "Friendly staff and consistently excellent beverages. Highly recommend!",
                author: "Prof. Jessica T.",
                role: "Faculty Member"
              }
            ].map((review, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
               
              >
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-amber-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">{review.text}</p>
                <div>
                  <p className="font-semibold text-gray-900">{review.author}</p>
                  <p className="text-sm text-gray-500">{review.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-amber-600 to-amber-700">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Experience Our Coffee?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join us for a cup of excellence and become part of our coffee-loving community.
          </p>
          <Link
            href="/menu"
            className="inline-flex items-center px-8 py-3 bg-white text-amber-600 
                     rounded-lg font-semibold hover:bg-amber-50 
                     transition-colors duration-300"
          >
            Order Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}