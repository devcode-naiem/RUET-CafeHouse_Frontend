import OrderDetailsPage from "../../../components/order/OrderDetailsPage";

export default async function Page({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  // Await the params since it's a Promise
  const resolvedParams = await params;

  return <OrderDetailsPage params={Promise.resolve(resolvedParams)} />;
}
