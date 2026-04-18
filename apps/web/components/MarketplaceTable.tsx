'use client';

import { useMemo, useState } from 'react';
import type { DeliveryVendor, StoreSummary } from '../lib/types';
import { getPriceForCategory } from '../lib/data';

type Props = {
  stores: StoreSummary[];
  categorySlug: string;
};

export function MarketplaceTable({ stores, categorySlug }: Props) {
  const [selectedStore, setSelectedStore] = useState<StoreSummary | null>(null);

  const rows = useMemo(
    () =>
      stores.map((store) => ({
        store,
        price: getPriceForCategory(store, categorySlug),
      })),
    [stores, categorySlug],
  );

  return (
    <>
      <div className="market-grid-head">
        <span>Store</span>
        <span>Live Stats</span>
        <span>Distance</span>
        <span>Review</span>
        <span>Price</span>
        <span>Maps</span>
        <span>Delivery</span>
      </div>
      <div className="store-list">
        {rows.map(({ store, price }) => (
          <article key={store.id} className="store-market-row">
            <div>
              <a href={`/store/${store.slug}`} className="store-name">
                {store.name}
              </a>
              <p className="store-subcopy">{store.area} | {store.zone}</p>
              <p className="store-subcopy">{store.specialties.join(' | ')}</p>
            </div>
            <div>
              <strong>{store.hours}</strong>
              <p className="store-subcopy">{store.freshnessNote}</p>
              <span className={`prep-pill ${store.prepStatus}`}>{store.prepStatus.replace('-', ' ')}</span>
            </div>
            <div>
              <strong>{store.distanceKm} km</strong>
              <p className="store-subcopy">ETA {store.eta}</p>
            </div>
            <div>
              <strong>{store.rating.toFixed(1)} / 5</strong>
              <p className="store-subcopy">{store.reviews} reviews</p>
            </div>
            <div>
              <strong>INR {price?.price ?? '--'}</strong>
              <p className="store-subcopy">Per {price?.unit ?? 'unit'}</p>
            </div>
            <div>
              <a href={store.mapUrl} target="_blank" rel="noreferrer" className="maps-link-inline">
                Open maps
              </a>
            </div>
            <div className="delivery-cell">
              <button className="vendor-trigger" onClick={() => setSelectedStore(store)}>
                Delivery options
              </button>
              <p className="store-subcopy">{store.deliveryVendors[0]?.name}</p>
            </div>
          </article>
        ))}
      </div>
      {selectedStore ? (
        <DeliveryModal store={selectedStore} onClose={() => setSelectedStore(null)} />
      ) : null}
    </>
  );
}

function DeliveryModal({ store, onClose }: { store: StoreSummary; onClose: () => void }) {
  return (
    <div className="vendor-overlay" role="dialog" aria-modal="true">
      <div className="vendor-modal">
        <button className="vendor-close" onClick={onClose} aria-label="Close delivery options">
          x
        </button>
        <p className="eyebrow">Continue with</p>
        <h3>{store.name}</h3>
        <div className="vendor-stack">
          {store.deliveryVendors.map((vendor) => (
            <VendorCard key={vendor.name} vendor={vendor} />
          ))}
        </div>
      </div>
    </div>
  );
}

function VendorCard({ vendor }: { vendor: DeliveryVendor }) {
  return (
    <div className="vendor-card">
      <div className="vendor-icon">{vendor.name.slice(0, 1)}</div>
      <div>
        <strong>{vendor.name}</strong>
        <p>{vendor.offer}</p>
        <p>
          {vendor.eta} | {vendor.fee} | {vendor.availability}
        </p>
      </div>
    </div>
  );
}
