import { NextRequest, NextResponse } from 'next/server';
import { getStoresForCategory, stores } from '../../../lib/data';

export async function GET(request: NextRequest) {
  const area = request.nextUrl.searchParams.get('area') ?? 'All Hyderabad';
  const category = request.nextUrl.searchParams.get('category');
  const payload = category ? getStoresForCategory(category, area) : area === 'All Hyderabad' ? stores : stores.filter((store) => store.area === area);
  return NextResponse.json(payload);
}
