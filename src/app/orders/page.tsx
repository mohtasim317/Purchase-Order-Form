'use client';
import { Stack } from '@/components/stack';
import { PageLayout } from '@/components/page-layout';
import { useEffect, useState } from 'react';
import { PurchaseOrder } from '@/types';
import Link from 'next/link';

export default function Orders() {
  const [currentOrders, setCurrentOrders] = useState<PurchaseOrder[]>([]);

  const fetchOrders = async () => {
    const rawData = await fetch('/api/orders');
    const jsonData = await rawData.json();
    setCurrentOrders(jsonData.data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <>
      <PageLayout.Header
        breadcrumbs={[
          {
            title: (
              <Stack align="center" direction="row" gap="1.5">
                Orders
              </Stack>
            ),
            href: '/orders',
          },
        ]}
      />
      <Stack
        className="flex justify-center items-center p-6"
        gap="8"
        width="full"
      >
        {currentOrders.map((order) => {
          return (
            <div
              className="bg-slate-50 m-5px min-h-24 flex justify-center flex-col min-w-96"
              key={order.id}
            >
              <p className="p-2">Order ID: {order.id}</p>
              <p className="p-2">Order Placed By: {order.placedById}</p>
              <p className="p-2">
                Shipping Address Line 1: {order.shippingAddressLine1}
              </p>
              <p className="p-2">
                Shipping Address Line 2: {order.shippingAddressLine2}
              </p>
              <p className="p-2">Order Status: {order.orderStatus}</p>
              <Link
                className="p-2 underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
                href={`/orders/${order.id}`}
              >
                Edit Order
              </Link>
            </div>
          );
        })}
      </Stack>
    </>
  );
}
