import { Suspense } from 'react';
import AdminOrderDetailsPage from "./AdminOrderDetailsPage";

type PageProps = {
  params: Promise<{ orderId: string }>; // Wrap params in a Promise
  searchParams?: { [key: string]: string | string[] | undefined };
};

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params; // Await the params to resolve the Promise

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AdminOrderDetailsPage orderId={resolvedParams.orderId} />
    </Suspense>
  );
}
