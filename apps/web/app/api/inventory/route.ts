import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { upsertInventory } from '../../../lib/repositories/platform';

const inventorySchema = z.object({
  branchId: z.string(),
  productId: z.string(),
  stockStatus: z.enum(['in_stock', 'limited', 'sold_out']),
  availableQuantity: z.number().optional().nullable(),
  updatedBy: z.string(),
});

export async function POST(request: NextRequest) {
  const payload = inventorySchema.parse(await request.json());
  const snapshot = await upsertInventory(payload);
  return NextResponse.json(snapshot);
}
