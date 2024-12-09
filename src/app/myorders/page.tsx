// src/app/myorders/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useOrders } from '@/hooks/useOrders';
import { formatDistanceToNow } from 'date-fns';
import { Package2, Loader2, AlertCircle, ChevronRight } from 'lucide-react';

const getStatusColor = (status: string) => {
  const colors = {
    pending: 'bg-yellow-100 text-yellow-800',
    processing: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800'
  };
  return colors[status as keyof typeof colors] || colors.pending;
};

export default function MyOrdersPage() {
  const router = useRouter();
  const { orders, isLoading, error } = useOrders();

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin text-amber-600" />
          <p className="text-gray-600">Loading your orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-4">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto" />
          <p className="text-red-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-amber-600 text-white rounded-lg 
                     hover:bg-amber-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!orders?.data.length) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <Package2 className="w-16 h-16 text-amber-600 mb-4" />
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          No orders yet
        </h2>
        <p className="text-gray-600 mb-4">
          When you place orders, they will appear here
        </p>
        <button
          onClick={() => router.push('/menu')}
          className="px-6 py-2 bg-amber-600 text-white rounded-lg 
                   hover:bg-amber-700 transition-colors"
        >
          Browse Menu
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>

      <div className="space-y-4">
        {orders.data.map((order) => (
          <div
            key={order.id}
            onClick={() => router.push(`/myorders/${order.id}`)}
            className="bg-white rounded-lg shadow-md p-6 cursor-pointer
                     hover:shadow-lg transition-shadow duration-200"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <span className="text-gray-600">Order #{order.id}</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium 
                              ${getStatusColor(order.status)}`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Delivery Address</p>
                <p className="font-medium text-gray-900">{order.delivery_address}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-medium text-gray-900">{order.phone}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Total Amount</p>
                <p className="font-medium text-amber-600">
                  ৳{parseFloat(order.total_amount).toFixed(2)}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Ordered</p>
                <p className="font-medium text-gray-900">
                  {formatDistanceToNow(new Date(order.created_at), { addSuffix: true })}
                </p>
              </div>
            </div>

            {order.special_instructions && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-sm text-gray-600">Special Instructions</p>
                <p className="text-gray-900">{order.special_instructions}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Pagination */}
      {orders.pagination.totalPages > 1 && (
        <div className="mt-8 flex justify-center space-x-2">
          {Array.from({ length: orders.pagination.totalPages }, (_, i) => (
            <button
              key={i + 1}
              className={`px-4 py-2 rounded-lg text-sm font-medium 
                       ${orders.pagination.currentPage === i + 1
                         ? 'bg-amber-600 text-white'
                         : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                       } transition-colors`}
              // Add pagination handling here
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}