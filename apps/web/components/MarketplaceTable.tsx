'use client';

import { useMemo, useState } from 'react';
import { categories, getPriceForCategory } from '../lib/data';
import { icons } from '../lib/ui-icons';
import type { DeliveryVendor, StoreSummary } from '../lib/types';
import { categoryLabels, normalizeLang, uiCopy } from '../lib/ui-copy';

type Props = {
  stores: StoreSummary[];
  categorySlug: string;
  selectedLang?: string;
};

const vendorIcons: Record<string, string> = {
  'Store Fleet': icons.store,
  'Swiggy Genie': icons.delivery,
  'Zomato Everyday': icons.restaurant,
  Porter: icons.truck,
  Pickup: icons.pickup,
};

const headingIcons = {
  store: icons.store,
  liveStats: icons.liveStats,
  distance: icons.distance,
  review: icons.review,
  price: 'Rs',
  maps: icons.maps,
  delivery: icons.delivery,
};

export function MarketplaceTable({ stores, categorySlug, selectedLang }: Props) {
  const [selectedStore, setSelectedStore] = useState<StoreSummary | null>(null);
  const lang = normalizeLang(selectedLang);
  const copy = uiCopy[lang];

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
        <span>{headingIcons.store} {copy.table.store}</span>
        <span>{headingIcons.liveStats} {copy.table.liveStats}</span>
        <span>{headingIcons.distance} {copy.table.distance}</span>
        <span>{headingIcons.review} {copy.table.review}</span>
        <span>{headingIcons.price} {copy.table.price}</span>
        <span>{headingIcons.maps} {copy.table.maps}</span>
        <span>{headingIcons.delivery} {copy.table.delivery}</span>
      </div>
      <div className="store-list market-store-list">
        {rows.map(({ store, price }) => (
          <article key={store.id} className="store-market-row">
            <div className="store-primary">
              <a href={`/store/${store.slug}`} className="store-name">
                {store.name}
              </a>
              <p className="store-subcopy">{store.area} | {store.zone}</p>
              <p className="store-subcopy"><strong>{copy.table.address}:</strong> {store.addressLine ?? `${store.area}, Hyderabad`}</p>
              <div className="category-badges">
                {store.prices.slice(0, 4).map((entry) => {
                  const category = categories.find((item) => item.slug === entry.categorySlug);
                  if (!category) return null;
                  return (
                    <span key={`${store.id}-${entry.categorySlug}`} className="category-badge-lite">
                      <span aria-hidden="true">{category.icon}</span>
                      <span>{categoryLabels[lang][entry.categorySlug] ?? category.name}</span>
                    </span>
                  );
                })}
              </div>
            </div>
            <div className="stats-cell">
              <strong>{store.hours}</strong>
              <p className="store-subcopy">{store.freshnessNote}</p>
              <p className="store-subcopy">{store.specialties.join(' | ')}</p>
              <span className={`prep-pill ${store.prepStatus}`}>{store.prepStatus.replace('-', ' ')}</span>
            </div>
            <div>
              <strong>{store.distanceKm} km</strong>
              <p className="store-subcopy">ETA {store.eta}</p>
            </div>
            <div>
              <strong>{store.rating.toFixed(1)} / 5</strong>
              <p className="store-subcopy">{store.reviews} {copy.table.reviews}</p>
              <p className="store-subcopy">
                {copy.table.source}:{' '}
                {store.sourceUrl ? (
                  <a href={store.sourceUrl} target="_blank" rel="noreferrer" className="source-link">{store.sourceLabel ?? 'Listing'}</a>
                ) : (
                  store.sourceLabel ?? 'Platform'
                )}
              </p>
            </div>
            <div>
              <strong>INR {price?.price ?? '--'}</strong>
              <p className="store-subcopy">{copy.table.per} {price?.unit ?? 'unit'}</p>
            </div>
            <div>
              <a href={store.mapUrl} target="_blank" rel="noreferrer" className="maps-link-inline">
                {copy.table.openMaps}
              </a>
            </div>
            <div className="delivery-cell">
              <button className="vendor-trigger" onClick={() => setSelectedStore(store)}>
                {copy.table.deliveryOptions}
              </button>
              <p className="store-subcopy">{vendorIcons[store.deliveryVendors[0]?.name ?? ''] ?? icons.delivery} {store.deliveryVendors[0]?.name}</p>
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
        <p className="store-subcopy">{store.addressLine}</p>
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
      <div className="vendor-icon">{vendorIcons[vendor.name] ?? vendor.name.slice(0, 1)}</div>
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