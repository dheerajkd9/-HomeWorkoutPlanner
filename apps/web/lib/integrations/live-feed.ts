import { env } from '../env';

export async function fetchLiveMarketFeed(area?: string, category?: string) {
  if (!env.INSFORGE_API_URL || !env.INSFORGE_API_KEY) {
    return {
      provider: 'fallback-seed-data',
      refreshedAt: new Date().toISOString(),
      area: area ?? env.DEFAULT_HYDERABAD_CITY,
      category: category ?? 'all',
      note: 'Connect INSFORGE or another verified Hyderabad meat feed here.',
      stores: [],
    };
  }

  const url = new URL(env.INSFORGE_API_URL);
  if (area) url.searchParams.set('area', area);
  if (category) url.searchParams.set('category', category);

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${env.INSFORGE_API_KEY}`,
      Accept: 'application/json',
    },
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    throw new Error(`Live feed request failed with status ${response.status}`);
  }

  return response.json();
}
