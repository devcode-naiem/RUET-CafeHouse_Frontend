// src/app/admin/orders/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useAdminOrders } from '@/hooks/useAdminOrders';
import { formatDistanceToNow } from 'date-fns';
import { 
  Loader2, AlertCircle, ClipboardList, 
  User, Phone, MapPin, ChevronRight 
} from 'lucide-react';

export default function AdminOrdersPage() {
  const router = useRouter();
  const { orders, isLoading, error, currentPage, setCurrentPage } = useAdminOrders();

  const getStatusBadge = (status: string) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      processing: 'bg-blue-100 text-blue-800 border-blue-200',
      completed: 'bg-green-100 text-green-800 border-green-200',
      cancelled: 'bg-red-100 text-red-800 border-red-200'
    };

    return `${styles[status as keyof typeof styles]} px-3 py-1 rounded-full 
            text-sm font-medium border`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin text-amber-600" />
          <p className="text-gray-600">Loading orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
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

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Manage Orders</h1>
        <div className="flex items-center space-x-2">
          <span className="text-gray-600">
            Total Orders: {orders?.pagination.totalItems || 0}
          </span>
        </div>
      </div>

      <div className="space-y-6">
        {orders?.data.map((order) => (
          <div
            key={order.id}
            onClick={() => router.push(`/admin/orders/${order.id}`)}
            className="bg-white rounded-lg shadow-md hover:shadow-lg 
                     transition-shadow duration-200 cursor-pointer"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <ClipboardList className="w-6 h-6 text-amber-600" />
                  <span className="font-medium text-gray-900">
                    Order #{order.id}
                  </span>
                  <span className={getStatusBadge(order.status)}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="flex items-start space-x-3">
                  <User className="w-5 h-5 text-gray-400 mt-1" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {order.user_name}
                    </p>
                    <p className="text-sm text-gray-500">{order.user_email}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-gray-400 mt-1" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Delivery Address
                    </p>
                    <p className="text-sm text-gray-900">
                      {order.delivery_address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-gray-400 mt-1" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">Phone</p>
                    <p className="text-sm text-gray-900">{order.phone}</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex justify-between items-center 
                           pt-4 border-t border-gray-100">
                <div>
                  <p className="text-sm text-gray-600">Total Amount</p>
                  <p className="text-lg font-semibold text-amber-600">
                    ৳{parseFloat(order.total_amount).toFixed(2)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Ordered</p>
                  <p className="text-sm text-gray-900">
                    {formatDistanceToNow(new Date(order.created_at), 
                      { addSuffix: true }
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {orders && orders.pagination.totalPages > 1 && (
        <div className="mt-8 flex justify-center space-x-2">
          {Array.from({ length: orders.pagination.totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded-lg text-sm font-medium 
                         transition-colors duration-200 
                         ${currentPage === i + 1
                           ? 'bg-amber-600 text-white'
                           : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                         }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}