import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { onboardStore } from '../../../../lib/repositories/platform';

const schema = z.object({
  ownerUserId: z.string(),
  organizationName: z.string().min(2),
  storeName: z.string().min(2),
  slug: z.string().min(2),
  area: z.string().min(2),
  addressLine: z.string().min(5),
  phone: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
});

export async function POST(request: NextRequest) {
  const payload = schema.parse(await request.json());
  const result = await onboardStore(payload);
  return NextResponse.json(result, { status: 201 });
}
