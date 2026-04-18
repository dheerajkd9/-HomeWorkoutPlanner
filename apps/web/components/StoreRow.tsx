import Link from 'next/link';
import type { StoreSummary } from '../lib/types';
import { getPriceForCategory } from '../lib/data';

export function StoreRow({ store, categorySlug = 'chicken' }: { store: StoreSummary; categorySlug?: string }) {
  const price = getPriceForCategory(store, categorySlug);

  return (
    <article className="store-row">
      <div>
        <Link href={`/store/${store.slug}`} className="store-name">{store.name}</Link>
        <div className="store-meta">
          <span>{store.hours}</span>
          <span>{store.area}</span>
          <span>{store.specialties.join(' | ')}</span>
        </div>
      </div>
      <div className="store-stat-grid">
        <div><strong>{store.eta}</strong><span>Live stats</span></div>
        <div><strong>{store.distanceKm} km</strong><span>Distance</span></div>
        <div><strong>{store.rating.toFixed(1)}</strong><span>Review</span></div>
        <div><strong>INR {price?.price ?? '--'}</strong><span>Price</span></div>
      </div>
      <div className="store-actions-col">
        <a href={store.mapUrl} target="_blank" rel="noreferrer" className="maps-link">Maps</a>
        <span className={`prep-pill ${store.prepStatus}`}>{store.prepStatus.replace('-', ' ')}</span>
      </div>
    </article>
  );
}
