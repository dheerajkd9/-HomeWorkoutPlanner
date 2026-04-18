import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { upsertPrice } from '../../../lib/repositories/platform';

const priceSchema = z.object({
  branchId: z.string(),
  productId: z.string(),
  pricePerUnit: z.number().positive(),
  updatedBy: z.string(),
  source: z.string().optional(),
});

export async function POST(request: NextRequest) {
  const payload = priceSchema.parse(await request.json());
  const snapshot = await upsertPrice(payload);
  return NextResponse.json(snapshot);
}
