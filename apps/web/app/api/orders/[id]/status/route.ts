import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { updateOrderStatus } from '../../../../../lib/repositories/platform';

const updateSchema = z.object({
  status: z.enum(['placed', 'received', 'accepted', 'preparing', 'ready', 'out_for_delivery', 'completed', 'cancelled']),
  actorUserId: z.string(),
});

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const payload = updateSchema.parse(await request.json());
  const order = await updateOrderStatus(params.id, payload.status, payload.actorUserId);
  return NextResponse.json(order);
}
