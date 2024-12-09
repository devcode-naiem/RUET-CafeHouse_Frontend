// src/app/about/page.tsx
'use client';

import Image from 'next/image';
import { Coffee, Users, Clock, Award, ChefHat, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

 
export default function AboutPage() {
  return (
    <div className="bg-amber-50">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/images/cafe-interior.jpg" // You'll need to add this image
            alt="RUET CafeShop Interior"
            fill
            className="object-cover blur-sm"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl font-bold mb-4">Our Story</h1>
          <p className="text-xl max-w-2xl mx-auto">
            A haven of warmth and connection in the heart of RUET campus
          </p>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            More Than Just Coffee
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            At RUET CafeShop, we believe that great coffee has the power to bring people together. 
            Founded in 2023, we&apos;ve created a space where students and faculty can find not just 
            exceptional beverages, but a community to call home.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Coffee,
                title: "Quality First",
                description: "We source the finest coffee beans and use state-of-the-art equipment to ensure every cup is perfect."
              },
              {
                icon: Users,
                title: "Community Hub",
                description: "A gathering place for students and faculty to connect, study, and share ideas."
              },
              {
                icon: Clock,
                title: "Extended Hours",
                description: "Open early and late to accommodate busy student schedules and late-night study sessions."
              },
              {
                icon: Award,
                title: "Excellence",
                description: "Committed to maintaining the highest standards in both our products and service."
              },
              {
                icon: ChefHat,
                title: "Skilled Baristas",
                description: "Our team is professionally trained to craft the perfect beverage every time."
              },
              {
                icon: Heart,
                title: "Student-Focused",
                description: "Special discounts and promotions designed with students in mind."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                 
              >
                <feature.icon className="w-10 h-10 text-amber-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-700">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-amber-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "5000+", label: "Happy Customers" },
              { number: "20+", label: "Coffee Varieties" },
              { number: "15", label: "Skilled Baristas" },
              { number: "100%", label: "Satisfaction Rate" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                 
              >
                <div className="text-4xl font-bold text-amber-800 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-700">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Head Barista",
                image: "/images/team-1.jpg"
              },
              {
                name: "Michael Chen",
                role: "Café Manager",
                image: "/images/team-2.jpg"
              },
              {
                name: "Emily Rodriguez",
                role: "Customer Service Lead",
                image: "/images/team-3.jpg"
              }
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                
              >
                <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {member.name}
                </h3>
                <p className="text-gray-600">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-amber-600 to-amber-700">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Experience the Difference
          </h2>
          <p className="text-lg mb-8">
            Join us for a cup of coffee and become part of our growing community.
          </p>
          <button 
            onClick={() => window.location.href = '/menu'}
            className="bg-white text-amber-600 px-8 py-3 rounded-lg font-semibold
                     hover:bg-amber-50 transition-colors duration-300"
          >
            View Our Menu
          </button>
        </div>
      </section>
    </div>
  );
}