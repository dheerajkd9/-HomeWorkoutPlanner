export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
  badge: string;
};

export type AreaOption = {
  name: string;
  zone: string;
};

export type DeliveryVendor = {
  name: string;
  eta: string;
  fee: string;
  offer: string;
  availability: 'available' | 'limited' | 'offline';
};

export type PriceEntry = {
  categorySlug: string;
  unit: string;
  price: number;
};

export type Product = {
  id: string;
  categoryId: string;
  name: string;
  unit: string;
  price: number;
  availability: 'in-stock' | 'limited' | 'sold-out';
  cuts: string[];
  notes?: string;
};

export type StoreSummary = {
  id: string;
  slug: string;
  name: string;
  area: string;
  zone: string;
  hours: string;
  distanceKm: number;
  eta: string;
  rating: number;
  reviews: number;
  mapUrl: string;
  freshnessNote: string;
  specialties: string[];
  categories: string[];
  bulkOrders: boolean;
  picklesAvailable: boolean;
  prepStatus: 'accepting' | 'busy' | 'closing-soon';
  deliveryVendors: DeliveryVendor[];
  prices: PriceEntry[];
  orderModes: string[];
};

export type Review = {
  id: string;
  author: string;
  rating: number;
  quote: string;
};

export type StoreDetail = StoreSummary & {
  description: string;
  serviceArea: string[];
  deliveryWindows: string[];
  products: Product[];
  reviewsList: Review[];
};

export type CustomerMetric = {
  label: string;
  value: string;
  detail: string;
};

export type CustomerOrder = {
  id: string;
  storeName: string;
  category: string;
  total: string;
  schedule: string;
  status: string;
  deliveryVendor: string;
};

export type CustomerSavedStore = {
  storeName: string;
  area: string;
  bestFor: string;
  priceNote: string;
};

export type OwnerMetric = {
  label: string;
  value: string;
  delta: string;
};

export type OwnerOrder = {
  id: string;
  customer: string;
  itemSummary: string;
  schedule: string;
  status: 'received' | 'accepted' | 'preparing' | 'ready' | 'out-for-delivery';
  amount: string;
  cutSpec: string;
  deliveryVendor: string;
};

export type Ticket = {
  id: string;
  subject: string;
  priority: 'low' | 'medium' | 'high';
  status: 'open' | 'pending' | 'resolved';
};

export type SubscriptionPlan = {
  name: string;
  price: string;
  seats: string;
  features: string[];
};

export type AdminMetric = {
  label: string;
  value: string;
  note: string;
};
