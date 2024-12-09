// src/app/admin/orders/[orderId]/page.tsx
import { Suspense } from 'react';
import AdminOrderDetailsPage from "./AdminOrderDetailsPage";

// Make the page component async to handle server-side data fetching
export default async function Page({ params }: { params: { orderId: string } }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AdminOrderDetailsPage orderId={params.orderId} />
    </Suspense>
  );
}