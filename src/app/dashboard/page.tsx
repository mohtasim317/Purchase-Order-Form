'use client';
import { PageLayout } from '@/components/page-layout';
import { Stack } from '@/components/stack';
import {
  PurchaseOrder,
  PurchaseOrderStatus,
  SupplierData,
} from '@/types/index';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Dashboard() {
  const router = useRouter();
  const [supplierList, setSupplierList] = useState<SupplierData[]>([]);
  const [selectedSupplier, setSelectedSupplier] = useState<number>(1);
  const [supplierItems, setSupplierListItems] = useState([]);
  const [selectedSupplierItem, setSelectedSupplierItem] = useState<string>('');

  const fetchSupplierList = async () => {
    const rawData = await fetch('/api/suppliers');
    const parsedData = await rawData.json();
    setSupplierList(parsedData.data);
  };

  const fetchSupplierItems = async (id: number) => {
    const rawData = await fetch(`/api/suppliers/${id}/items`);
    const parsedData = await rawData.json();
    setSupplierListItems(parsedData.data);
  };

  const handleSupplierChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedSupplier(Number(event.target.value));
  };

  const handleItemChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSupplierItem(event.target.value);
  };

  useEffect(() => {
    fetchSupplierList();
  }, []);

  useEffect(() => {
    fetchSupplierItems(selectedSupplier);
  }, [selectedSupplier]);

  const [placedBy, setPlacedBy] = useState('');
  const [shippingAddressLine1, setShippingAddressLine1] = useState('');
  const [shippingAddressLine2, setShippingAddressLine2] = useState('');

  const sendOrder = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    try {
      if (
        !selectedSupplier ||
        !placedBy ||
        !shippingAddressLine1
        // currentOrder.length < 1
      ) {
        return;
      }

      const orderObject: PurchaseOrder = {
        id: Math.floor(Math.random() * 10000000 + 1),
        approvals: [
          {
            id: Math.floor(Math.random() * 10000 + 1),
            requestedAt: `${Date.now}`,
            deniedAt: null,
            approvedAt: null,
          },
        ],
        poNumber: String(Math.floor(Math.random() * 10000 + 1)),
        placedById: Number(placedBy),
        shippingAddressLine1: shippingAddressLine1,
        shippingAddressLine2: shippingAddressLine2,
        internalNotes: 'Make it pronto',
        vendorNotes: 'This is a really good item',
        orderStatus: PurchaseOrderStatus.Received,
        placementTime: '2021-01-08T14:42:34.678Z',
        requestedShipDate: null,
        supplierId: selectedSupplier,
        items: [
          {
            id: Math.floor(Math.random() * 10000 + 1),
            itemId: selectedSupplierItem,
            item: {
              id: 'item',
              supplierId: selectedSupplier,
              itemName: 'itemName',
              itemSku: 'sku',
              price: 23,
              priceCurrency: 'USD',
            },
            price: Math.floor(Math.random() * 10000 + 1),
            quantity: Math.floor(Math.random() * 10000 + 1),
            priceCurrency: 'USD',
            purchaseOrderId: Math.floor(Math.random() * 10000 + 1),
          },
        ],
      };

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderObject),
      });
      const result = await response.json();
      router.push('/orders');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <PageLayout.Header
        breadcrumbs={[
          {
            title: (
              <Stack align="center" direction="row" gap="1.5">
                Home
              </Stack>
            ),
            href: '/dashboard',
          },
        ]}
      />
      <Stack
        className="flex justify-center items-center p-6"
        gap="8"
        width="full"
      >
        <form className="min-w-64" id="items">
          <div className="flex flex-col mb-4">
            <label htmlFor="suppliers">Choose a Supplier:</label>
            <select onChange={handleSupplierChange} id="suppliers">
              {supplierList.map(({ name, id }) => {
                return (
                  <option key={name} value={id}>
                    {name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="items">Choose an item:</label>
            <select onChange={handleItemChange} id="items">
              {supplierItems.map(({ itemName, id }) => {
                return (
                  <option key={itemName} value={id}>
                    {itemName}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="firstname">ID Number</label>
            <input
              type="number"
              name="firstname"
              id="firstname"
              value={placedBy}
              onChange={(e) => setPlacedBy(e.target.value)}
              placeholder="Enter ID Number"
              required
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="shippingAddressLine1">
              Shipping Address Line 1
            </label>
            <input
              type="text"
              name="shippingAddressLine1"
              id="shippingAddressLine1"
              value={shippingAddressLine1}
              onChange={(e) => setShippingAddressLine1(e.target.value)}
              placeholder="Enter Shipping Address Line 1"
              required
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="shippingAddressLine2">
              Shipping Address Line 2
            </label>
            <input
              type="text"
              name="shippingAddressLine2"
              id="shippingAddressLine2"
              value={shippingAddressLine2}
              onChange={(e) => setShippingAddressLine2(e.target.value)}
              placeholder="Enter Shipping Address Line 2"
              required
            />
          </div>
          <button
            onClick={sendOrder}
            className="border"
            type="submit"
            form="items"
            value="Submit"
          >
            Submit Order
          </button>
        </form>
      </Stack>
    </>
  );
}
