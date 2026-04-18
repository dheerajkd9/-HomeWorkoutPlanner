import { NextResponse } from 'next/server';
import { getCatalogSnapshot } from '../../../lib/data';

export async function GET() {
  return NextResponse.json(getCatalogSnapshot());
}
