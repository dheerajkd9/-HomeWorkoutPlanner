import { NextRequest, NextResponse } from 'next/server';
import { fetchLiveMarketFeed } from '../../../../lib/integrations/live-feed';

export async function GET(request: NextRequest) {
  const area = request.nextUrl.searchParams.get('area') ?? undefined;
  const category = request.nextUrl.searchParams.get('category') ?? undefined;
  const feed = await fetchLiveMarketFeed(area, category);
  return NextResponse.json(feed);
}
