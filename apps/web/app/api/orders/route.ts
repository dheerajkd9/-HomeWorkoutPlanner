import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createOrder, listOrders } from '../../../lib/repositories/platform';

const orderItemSchema = z.object({
  productId: z.string(),
  quantity: z.number().positive(),
  unitPrice: z.number().positive(),
  cutOptionId: z.string().optional().nullable(),
  instruction: z.string().optional().nullable(),
});

const createOrderSchema = z.object({
  customerUserId: z.string(),
  storeId: z.string(),
  branchId: z.string().optional().nullable(),
  fulfillmentType: z.enum(['delivery', 'pickup']),
  scheduledFor: z.string().optional().nullable(),
  customerNote: z.string().optional().nullable(),
  deliveryVendor: z.string().optional().nullable(),
  deliveryAddressText: z.string().optional().nullable(),
  items: z.array(orderItemSchema).min(1),
});

export async function GET(request: NextRequest) {
  const customerUserId = request.nextUrl.searchParams.get('customerUserId') ?? undefined;
  const storeId = request.nextUrl.searchParams.get('storeId') ?? undefined;
  const orders = await listOrders({ customerUserId, storeId });
  return NextResponse.json(orders);
}

export async function POST(request: NextRequest) {
  const payload = createOrderSchema.parse(await request.json());
  const order = await createOrder(payload);
  return NextResponse.json(order, { status: 201 });
}
