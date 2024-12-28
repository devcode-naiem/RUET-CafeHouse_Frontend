import { Suspense } from 'react';
import AdminOrderDetailsPage from "./AdminOrderDetailsPage";

type PageProps = {
  params: Promise<{ orderId: string }>; // `params` as a Promise
 };

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params; // Await the params to resolve the Promise
  const { orderId } = resolvedParams;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AdminOrderDetailsPage orderId={orderId} />
    </Suspense>
  );
}
