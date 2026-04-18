export type Category = {
  id: string;
  name: string;
  description: string;
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
  hours: string;
  distanceKm: number;
  eta: string;
  rating: number;
  reviews: number;
  todayPrice: number;
  mapUrl: string;
  deliveryPartner: string;
  freshnessNote: string;
  specialties: string[];
  categories: string[];
  bulkOrders: boolean;
  picklesAvailable: boolean;
  prepStatus: 'accepting' | 'busy' | 'closing-soon';
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
