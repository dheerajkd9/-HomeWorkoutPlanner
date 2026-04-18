import Link from 'next/link';
import type { StoreSummary } from '../lib/types';

export function StoreRow({ store }: { store: StoreSummary }) {
  return (
    <article className="store-row">
      <div>
        <Link href={`/store/${store.slug}`} className="store-name">{store.name}</Link>
        <div className="store-meta">
          <span>{store.hours}</span>
          <span>{store.area}</span>
          <span>{store.specialties.join(' | ')}</span>
        </div>
        <div className="store-badges">
          <span>{store.freshnessNote}</span>
          <span>{store.deliveryPartner}</span>
        </div>
      </div>
      <div className="store-stat-grid">
        <div><strong>{store.eta}</strong><span>Delivery time</span></div>
        <div><strong>{store.distanceKm} km</strong><span>Distance</span></div>
        <div><strong>{store.rating.toFixed(1)}</strong><span>{store.reviews} reviews</span></div>
        <div><strong>INR {store.todayPrice}</strong><span>Price / KG</span></div>
      </div>
      <div className="store-actions-col">
        <a href={store.mapUrl} target="_blank" rel="noreferrer" className="maps-link">Google Maps Direction</a>
        <span className={`prep-pill ${store.prepStatus}`}>{store.prepStatus.replace('-', ' ')}</span>
      </div>
    </article>
  );
}
