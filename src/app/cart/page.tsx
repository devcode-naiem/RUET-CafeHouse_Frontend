// src/app/cart/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartOperations } from "@/hooks/useCartOperations";
import { Minus, Plus, Trash2, ShoppingBag, Loader2, Phone } from "lucide-react";
import toast from "react-hot-toast";
import { useAppSelector } from "@/redux/store";
import { selectCartItems } from "@/redux/features/cartSlice";

export default function CartPage() {
  const router = useRouter();
  const cartItems = useAppSelector(selectCartItems);
  const { totalAmount, updateQuantity, removeItem, placeOrder } =
    useCartOperations();
  const userRole = useAppSelector((state) => state.auth.user?.role);

  // Local state for form
  const [deliveryDetails, setDeliveryDetails] = useState({
    deliveryAddress: "",
    phone: "",
    specialInstructions: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    setIsProcessing(true);
    try {
      const success = await placeOrder(deliveryDetails);
      if (success) {
        router.push("/myorders");
      }
    } finally {
      setIsProcessing(false);
    }
  };

  // Empty cart view
  if (cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <ShoppingBag className="w-16 h-16 text-amber-600 mb-4" />
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Your cart is empty
        </h2>
        <p className="text-gray-600 mb-4">
          Add some delicious items to your cart!
        </p>
        <button
          onClick={() => router.push("/menu")}
          className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 
                   transition-colors duration-300"
        >
          Browse Menu
        </button>
      </div>
    );
  }

  // Cart with items view
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between
                       transform transition-all duration-200 hover:shadow-lg"
            >
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{item.name}</h3>
                <p className="text-amber-600 font-medium">
                  ৳{item.price.toFixed(2)}
                </p>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-1 rounded-full bg-amber-100 hover:bg-amber-200 
                             transition-colors"
                  >
                    <Minus size={16} className="text-amber-700" />
                  </button>

                  <span className="w-8 text-center font-medium">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-1 rounded-full bg-amber-100 hover:bg-amber-200 
                             transition-colors"
                  >
                    <Plus size={16} className="text-amber-700" />
                  </button>
                </div>

                <button
                  onClick={() => removeItem(item.id)}
                  className="p-2 text-red-500 hover:text-red-700 transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Form */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Order Summary
            </h2>

            <div className="mb-6 pb-4 border-b border-gray-200">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">৳{totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span className="text-amber-600">
                  ৳{totalAmount.toFixed(2)}
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Delivery Address */}
              <div className="space-y-2">
                <label
                  htmlFor="deliveryAddress"
                  className="block text-sm font-medium text-gray-700"
                >
                  Delivery Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="deliveryAddress"
                  required
                  rows={2}
                  placeholder="Enter your full delivery address (e.g., Room no, Hall name)"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg
                           focus:ring-2 focus:ring-amber-500 focus:border-transparent
                           placeholder:text-gray-400 resize-none"
                  value={deliveryDetails.deliveryAddress}
                  onChange={(e) =>
                    setDeliveryDetails((prev) => ({
                      ...prev,
                      deliveryAddress: e.target.value,
                    }))
                  }
                />
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    id="phone"
                    required
                    placeholder="01XXXXXXXXX"
                    pattern="01[3-9][0-9]{8}"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg
                             focus:ring-2 focus:ring-amber-500 focus:border-transparent
                             placeholder:text-gray-400"
                    value={deliveryDetails.phone}
                    onChange={(e) =>
                      setDeliveryDetails((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
                <p className="text-xs text-gray-500">
                  Please enter a valid Bangladeshi phone number
                </p>
              </div>

              {/* Special Instructions */}
              <div className="space-y-2">
                <label
                  htmlFor="specialInstructions"
                  className="block text-sm font-medium text-gray-700"
                >
                  Special Instructions{" "}
                  <span className="text-gray-400">(Optional)</span>
                </label>
                <textarea
                  id="specialInstructions"
                  rows={3}
                  placeholder="Any special requests? (e.g., Extra hot, Less sugar)"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg
                           focus:ring-2 focus:ring-amber-500 focus:border-transparent
                           placeholder:text-gray-400 resize-none"
                  value={deliveryDetails.specialInstructions}
                  onChange={(e) =>
                    setDeliveryDetails((prev) => ({
                      ...prev,
                      specialInstructions: e.target.value,
                    }))
                  }
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isProcessing || userRole === 'admin'}
                className="w-full py-3 px-4 bg-gradient-to-r from-amber-600 to-amber-700
                         text-white rounded-lg font-medium flex items-center justify-center
                         space-x-2 hover:from-amber-700 hover:to-amber-800 transition-all
                         duration-300 disabled:opacity-50 disabled:cursor-not-allowed
                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag size={20} />
                    <span>Place Order</span>
                  </>
                )}
              </button>

              <p className="text-xs text-gray-500 text-center">
                By placing your order, you agree to our terms and conditions
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
