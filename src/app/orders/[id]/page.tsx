'use client';
import { Stack } from '@/components/stack';
import { PageLayout } from '@/components/page-layout';
import { useEffect, useState } from 'react';
import { PurchaseOrder } from '@/types';
import { useRouter } from 'next/navigation';

export default function Page({ params: { id } }: { params: { id: string } }) {
  const router = useRouter();
  const [order, setOrder] = useState<PurchaseOrder>();
  const [isDeleted, setIsDeleted] = useState(false);

  const fetchOrder = async () => {
    const rawData = await fetch(`/api/orders/${id}`);
    const jsonData = await rawData.json();
    setOrder(jsonData.data);
  };

  const deleteOrder = async (id: number) => {
    try {
      const response = await fetch(`/api/orders/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(id),
      });
      const result = await response.json();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  return (
    <>
      <PageLayout.Header
        breadcrumbs={[
          {
            title: (
              <Stack align="center" direction="row" gap="1.5">
                Order #{id}
              </Stack>
            ),
            href: `/orders/${id}`,
          },
        ]}
      />
      <Stack
        className="flex justify-center items-center p-6"
        gap="8"
        width="full"
      >
        {!isDeleted && order && (
          <div key={order.id}>
            <div
              className="bg-slate-50 m-5px min-h-24 flex justify-center flex-col min-w-96"
              key={order.id}
            >
              <p className="p-2">Order ID: {order.id}</p>
              <p className="p-2">Order Placed By:{order.placedById}</p>
              <p className="p-2">
                Shipping Address Line 1: {order.shippingAddressLine1}
              </p>
              <p className="p-2">
                Shipping Address Line 2: {order.shippingAddressLine2}
              </p>
              <p className="p-2">Order Status: {order.orderStatus}</p>
              <button
                className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
                onClick={() => {
                  setIsDeleted(true);
                  deleteOrder(order.id);
                  router.push('/orders');
                }}
              >
                Delete Order
              </button>
            </div>
          </div>
        )}
      </Stack>
    </>
  );
}
