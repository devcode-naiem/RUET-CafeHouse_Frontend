'use client';

import { useRouter } from 'next/navigation';
import { useOrderDetails } from '@/hooks/useAdminOrderDetails';
import { format } from 'date-fns';
import {
  Loader2,
  AlertCircle,
  ArrowLeft,
} from 'lucide-react';

// Change the type to accept regular params
type Params = {
  orderId: string;
};


const getStatusColor = (status: string) => {
  const colors = {
    pending: 'text-yellow-800 bg-yellow-100',
    processing: 'text-blue-800 bg-blue-100',
    completed: 'text-green-800 bg-green-100',
    cancelled: 'text-red-800 bg-red-100',
  };
  return colors[status as keyof typeof colors] || colors.pending;
};
type Props = {
  orderId: string;
};

 
export default function AdminOrderDetailsPage({ orderId }: { orderId: string }) {
  const { orderDetails, isLoading, error } = useOrderDetails(orderId);
  const router = useRouter();
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading details...</div>;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-amber-600" />
        <p className="text-gray-600">Loading order details...</p>
      </div>
    );
  }

  if (error || !orderDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <AlertCircle className="w-12 h-12 text-red-500" />
        <p className="text-red-600">{error || 'Order not found'}</p>
        <button
          onClick={() => router.back()}
          className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
        >
          Go Back
        </button>
      </div>
    );
  }

  const { data: order } = orderDetails;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 space-y-4">
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-600 hover:text-amber-600 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Orders
        </button>

        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white">Order #{order.id}</h1>
            <p className="text-gray-600">Placed on {format(new Date(order.created_at), 'PPp')}</p>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status.trim())}`}
          >
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white text-black rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold">Order Items</h2>
            {order.items.map((item) => (
              <div key={item.id} className="flex justify-between py-3 border-b last:border-none">
                <div>
                  <h3 className="font-medium">{item.item_name}</h3>
                  <p>{item.quantity} × ৳{parseFloat(item.unit_price).toFixed(2)}</p>
                </div>
                <p className="text-amber-600 font-medium">৳{parseFloat(item.subtotal).toFixed(2)}</p>
              </div>
            ))}
            <div className="flex justify-between text-lg font-semibold mt-4">
              <span>Total</span>
              <span className="text-amber-600">৳{parseFloat(order.total_amount).toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className='text-black'>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold">Customer Information</h2>
            <p>{order.user_name}</p>
            <p>{order.user_email}</p>
            <p>{order.phone}</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 mt-6">
            <h2 className="text-xl font-semibold">Delivery Information</h2>
            <p>{order.delivery_address}</p>
            {order.special_instructions && <p>{order.special_instructions}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
