import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createBranch } from '../../../../lib/repositories/platform';

const schema = z.object({
  storeId: z.string(),
  name: z.string().min(2),
  area: z.string().min(2),
  addressLine: z.string().min(5),
  serviceRadiusKm: z.number().positive(),
  acceptsDelivery: z.boolean(),
  acceptsPickup: z.boolean(),
});

export async function POST(request: NextRequest) {
  const payload = schema.parse(await request.json());
  const result = await createBranch(payload);
  return NextResponse.json(result, { status: 201 });
}
