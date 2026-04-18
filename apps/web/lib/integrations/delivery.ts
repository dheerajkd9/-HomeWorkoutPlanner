import { env } from '../env';
import type { DeliveryVendor } from '../types';

export async function getDeliveryQuotes(input: {
  area: string;
  storeName: string;
  orderValue: number;
  weightKg?: number;
}) {
  if (!env.DELIVERY_VENDOR_API_URL || !env.DELIVERY_VENDOR_API_KEY) {
    const base: DeliveryVendor[] = [
      { name: 'Store Fleet', eta: '25-40 min', fee: 'INR 29', offer: 'Fastest route from store', availability: 'available' },
      { name: 'Swiggy Genie', eta: '30-45 min', fee: 'INR 49', offer: 'Live quote placeholder until partner API is connected', availability: 'limited' },
      { name: 'Porter', eta: '35-55 min', fee: 'INR 59', offer: 'Bulk-order capable route', availability: 'available' },
    ];
    return base;
  }

  const response = await fetch(env.DELIVERY_VENDOR_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${env.DELIVERY_VENDOR_API_KEY}`,
    },
    body: JSON.stringify(input),
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Delivery vendor quote request failed with status ${response.status}`);
  }

  return response.json();
}
