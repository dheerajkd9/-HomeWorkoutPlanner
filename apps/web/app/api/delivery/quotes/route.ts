import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getDeliveryQuotes } from '../../../../lib/integrations/delivery';

const quoteSchema = z.object({
  area: z.string(),
  storeName: z.string(),
  orderValue: z.number().nonnegative(),
  weightKg: z.number().optional(),
});

export async function POST(request: NextRequest) {
  const payload = quoteSchema.parse(await request.json());
  const quotes = await getDeliveryQuotes(payload);
  return NextResponse.json(quotes);
}
