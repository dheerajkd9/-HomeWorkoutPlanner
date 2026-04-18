import type {
  AdminMetric,
  AreaOption,
  Category,
  CustomerMetric,
  CustomerOrder,
  CustomerSavedStore,
  DeliveryVendor,
  OwnerMetric,
  OwnerOrder,
  PriceEntry,
  Product,
  StoreDetail,
  StoreSummary,
  SubscriptionPlan,
  Ticket,
} from './types';

export const categories: Category[] = [
  { id: 'c1', name: 'Eid Specials', slug: 'specials', description: 'Festive bundles, family packs, and limited chef cuts.', badge: 'Festival ready' },
  { id: 'c2', name: 'Chicken', slug: 'chicken', description: 'Broiler, country chicken, boneless, curry cut, and grill packs.', badge: 'Most searched' },
  { id: 'c3', name: 'Lamb and Goat', slug: 'lamb-goat', description: 'Fresh mutton, kheema, chops, ribs, and biryani cuts.', badge: 'Weekend hero' },
  { id: 'c4', name: 'Fish and Seafood', slug: 'fish-seafood', description: 'Seer fish, pomfret, prawns, crab, and cleaned fillets.', badge: 'Fresh catch' },
  { id: 'c5', name: 'Ready to Cook', slug: 'ready-to-cook', description: 'Marinated grills, kebabs, mandi packs, and combo trays.', badge: 'Quick prep' },
  { id: 'c6', name: 'Eggs', slug: 'eggs', description: 'Farm eggs, country eggs, and wholesale trays.', badge: 'Daily staple' },
  { id: 'c7', name: 'Spreads and Pickles', slug: 'spreads-pickles', description: 'Gongura chicken, fish pickle, masala pastes, and soups.', badge: 'Upsell ready' },
  { id: 'c8', name: 'Cold Cuts', slug: 'cold-cuts', description: 'Sausages, salami, deli meats, and frozen protein snacks.', badge: 'Modern counter' },
];

export const areaOptions: AreaOption[] = [
  { name: 'All Hyderabad', zone: 'All zones' },
  { name: 'HITEC City', zone: 'West Hyderabad' },
  { name: 'Madhapur', zone: 'West Hyderabad' },
  { name: 'Gachibowli', zone: 'West Hyderabad' },
  { name: 'Kondapur', zone: 'West Hyderabad' },
  { name: 'Jubilee Hills', zone: 'Central West' },
  { name: 'Banjara Hills', zone: 'Central West' },
  { name: 'Mehdipatnam', zone: 'Central South' },
  { name: 'Kukatpally', zone: 'North West' },
  { name: 'Secunderabad', zone: 'North East' },
  { name: 'Dilsukhnagar', zone: 'East Hyderabad' },
];

const marketAreas = areaOptions.filter((area) => area.name !== 'All Hyderabad');
const chains = [
  { brand: 'Deccan Fresh Meats', specialties: ['Country chicken', 'Biryani cuts'], fee: 'INR 29', offer: '10% off on orders above INR 699' },
  { brand: 'Royal Protein House', specialties: ['Mutton mandi cuts', 'Egg trays'], fee: 'INR 39', offer: 'Free pickup scheduling' },
  { brand: 'Harbor Catch', specialties: ['Seer fish', 'Prawns', 'Crab'], fee: 'INR 49', offer: 'Fresh catch before 10 AM' },
  { brand: 'Natu Kodi Market', specialties: ['Country chicken', 'Pickles'], fee: 'INR 35', offer: 'Festival specials live now' },
  { brand: 'Metro Butcher ERP', specialties: ['Bulk events', 'Ready to cook'], fee: 'INR 45', offer: 'Corporate and event billing available' },
];

const categoryBasePrices: Record<string, { price: number; unit: string; names: string[]; cuts: string[] }> = {
  specials: { price: 799, unit: 'pack', names: ['Eid family hamper', 'Ramzan haleem protein pack'], cuts: ['Whole pieces', 'Family assortment'] },
  chicken: { price: 289, unit: 'kg', names: ['Skinless broiler', 'Country chicken', 'Boneless cubes'], cuts: ['Curry cut', 'Biryani cut', 'Boneless cubes', 'Skinless whole bird'] },
  'lamb-goat': { price: 879, unit: 'kg', names: ['Mutton biryani cut', 'Goat curry cut', 'Mutton kheema'], cuts: ['Biryani cut', 'Curry cut', 'Kheema', 'Chops'] },
  'fish-seafood': { price: 549, unit: 'kg', names: ['Seer fish steaks', 'Tiger prawns', 'Pomfret cleaned'], cuts: ['Steaks', 'Fillet', 'Whole cleaned', 'Tandoor butterfly'] },
  'ready-to-cook': { price: 229, unit: 'tray', names: ['Pepper grill mix', 'Hariyali kebab tray', 'Mandi marinade pack'], cuts: ['Ready to cook'] },
  eggs: { price: 119, unit: 'tray', names: ['Farm eggs tray', 'Country eggs box'], cuts: ['Tray pack'] },
  'spreads-pickles': { price: 199, unit: 'jar', names: ['Gongura chicken pickle', 'Fish pickle', 'Soup base'], cuts: ['Jar'] },
  'cold-cuts': { price: 249, unit: 'pack', names: ['Chicken sausage', 'Smoked salami', 'Cold cut combo'], cuts: ['Pack'] },
};

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function vendorsForStore(index: number): DeliveryVendor[] {
  const vendorSets: DeliveryVendor[][] = [
    [
      { name: 'Store Fleet', eta: '25-40 min', fee: 'INR 29', offer: 'Fastest delivery from store', availability: 'available' },
      { name: 'Swiggy Genie', eta: '30-45 min', fee: 'INR 49', offer: 'Coupon SWIGGY40 on select slots', availability: 'available' },
      { name: 'Zomato Everyday', eta: '35-50 min', fee: 'INR 45', offer: 'Partner pickup available', availability: 'limited' },
    ],
    [
      { name: 'Store Fleet', eta: '20-35 min', fee: 'INR 25', offer: 'Preferred for fresh morning orders', availability: 'available' },
      { name: 'Porter', eta: '35-55 min', fee: 'INR 59', offer: 'Best for bulk orders', availability: 'available' },
      { name: 'Pickup', eta: 'Ready in 20 min', fee: 'INR 0', offer: 'Choose your own slot', availability: 'available' },
    ],
  ];
  return vendorSets[index % vendorSets.length];
}

function pricesForStore(seed: number): PriceEntry[] {
  return categories.map((category, index) => {
    const base = categoryBasePrices[category.slug];
    const variance = ((seed * 17 + index * 11) % 90) - 20;
    return {
      categorySlug: category.slug,
      unit: base.unit,
      price: Math.max(99, base.price + variance),
    };
  });
}

export const stores: StoreSummary[] = marketAreas.flatMap((area, areaIndex) =>
  chains.map((chain, chainIndex) => {
    const seed = areaIndex * chains.length + chainIndex + 1;
    const slug = slugify(`${area.name}-${chain.brand}`);
    const prices = pricesForStore(seed);
    return {
      id: `store-${seed}`,
      slug,
      name: `${area.name} ${chain.brand}`,
      area: area.name,
      zone: area.zone,
      hours: seed % 2 === 0 ? '6 am to 12 pm' : '7 am to 2 pm',
      distanceKm: Number((1.1 + (seed % 7) * 0.7).toFixed(1)),
      eta: `${18 + (seed % 5) * 6}-${35 + (seed % 6) * 7} min`,
      rating: Number((4 + ((seed % 10) * 0.08)).toFixed(1)),
      reviews: 180 + seed * 13,
      mapUrl: `https://maps.google.com/?q=${encodeURIComponent(`${chain.brand} ${area.name} Hyderabad`)}`,
      freshnessNote: `Daily market update synced at ${5 + (seed % 6)}:${(seed * 7) % 60}`.padStart(2, '0'),
      specialties: chain.specialties,
      categories: categories.map((category) => category.name),
      bulkOrders: true,
      picklesAvailable: seed % 3 !== 0,
      prepStatus: seed % 3 === 0 ? 'busy' : seed % 4 === 0 ? 'closing-soon' : 'accepting',
      deliveryVendors: vendorsForStore(seed),
      prices,
      orderModes: ['Delivery', 'Pickup', 'Scheduled order', 'Bulk event order'],
    };
  }),
);

export const storeDetails: StoreDetail[] = stores.map((store, index) => ({
  ...store,
  description: `${store.name} is a SaaS-enabled meat store with daily pricing, cut specifications, customer history, scheduled deliveries, and support tickets managed from one platform.`,
  serviceArea: [store.area, 'HITEC City', 'Madhapur', 'Gachibowli', 'Kondapur'].filter((value, valueIndex, array) => array.indexOf(value) === valueIndex),
  deliveryWindows: ['6:30 am - 9:00 am', '10:30 am - 1:30 pm', '5:00 pm - 8:30 pm'],
  products: categories.flatMap((category, categoryIndex) => {
    const base = categoryBasePrices[category.slug];
    const price = getPriceForCategory(store, category.slug)?.price ?? base.price;
    return base.names.slice(0, category.slug === 'specials' ? 1 : 2).map((name, nameIndex) => ({
      id: `${store.id}-${category.slug}-${nameIndex}`,
      categoryId: category.id,
      name,
      unit: base.unit,
      price: price + nameIndex * 20,
      availability: (index + categoryIndex + nameIndex) % 5 === 0 ? 'limited' : 'in-stock',
      cuts: base.cuts,
      notes: `${category.name} listing updated for ${store.area}.`,
    }));
  }),
  reviewsList: [
    { id: `${store.id}-review-1`, author: 'Aditi', rating: 5, quote: `Perfect cuts and clear delivery slots from ${store.name}.` },
    { id: `${store.id}-review-2`, author: 'Rahim', rating: 4, quote: 'Bulk order tracking and prep updates were very clear.' },
    { id: `${store.id}-review-3`, author: 'Nisha', rating: 5, quote: 'Loved the delivery vendor choice and clean packaging.' },
  ],
}));

export const customerMetrics: CustomerMetric[] = [
  { label: 'Saved stores', value: '12', detail: 'Across chicken, fish, eggs, and bulk orders' },
  { label: 'Scheduled orders', value: '4', detail: 'Upcoming family and office deliveries' },
  { label: 'Average spend', value: 'INR 1,480', detail: 'Per order over the last 30 days' },
  { label: 'Support response', value: '14 min', detail: 'Average ticket reply time' },
];

export const customerOrders: CustomerOrder[] = [
  { id: 'CUS-3012', storeName: 'HITEC City Deccan Fresh Meats', category: 'Chicken', total: 'INR 842', schedule: 'Today, 7:30 PM', status: 'Preparing', deliveryVendor: 'Swiggy Genie' },
  { id: 'CUS-3011', storeName: 'Banjara Hills Harbor Catch', category: 'Fish and Seafood', total: 'INR 1,290', schedule: 'Tomorrow, 8:00 AM', status: 'Scheduled', deliveryVendor: 'Store Fleet' },
  { id: 'CUS-3004', storeName: 'Kukatpally Metro Butcher ERP', category: 'Lamb and Goat', total: 'INR 5,860', schedule: 'Saturday, 5:30 AM', status: 'Bulk order review', deliveryVendor: 'Porter' },
];

export const customerSavedStores: CustomerSavedStore[] = [
  { storeName: 'Madhapur Natu Kodi Market', area: 'Madhapur', bestFor: 'Country chicken and pickles', priceNote: 'Chicken starts at INR 302' },
  { storeName: 'Secunderabad Royal Protein House', area: 'Secunderabad', bestFor: 'Egg trays and mandi cuts', priceNote: 'Egg trays start at INR 126' },
  { storeName: 'Gachibowli Harbor Catch', area: 'Gachibowli', bestFor: 'Prawns and cleaned fish', priceNote: 'Seafood starts at INR 561' },
];

export const ownerMetrics: OwnerMetric[] = [
  { label: 'Today orders', value: '87', delta: '+18% vs yesterday' },
  { label: 'Prep SLA', value: '21 min', delta: 'Target met in 92% of orders' },
  { label: 'Bulk leads', value: '9', delta: '3 converted this week' },
  { label: 'Subscription status', value: 'Growth ERP plan', delta: 'Renews in 18 days' },
];

export const ownerOrders: OwnerOrder[] = [
  { id: 'ORD-1842', customer: 'Sowmya R.', itemSummary: '2 kg country chicken plus pickle jar', schedule: 'Today, 8:15 am delivery', status: 'preparing', amount: 'INR 778', cutSpec: 'Medium curry cut with extra skin removal', deliveryVendor: 'Swiggy Genie' },
  { id: 'ORD-1843', customer: 'Rahim Events', itemSummary: '18 kg mutton for function', schedule: 'Tomorrow, 5:30 am pickup', status: 'accepted', amount: 'INR 14,400', cutSpec: 'Biryani cut with separate fat pack', deliveryVendor: 'Pickup' },
  { id: 'ORD-1844', customer: 'Anjali P.', itemSummary: '1.5 kg boneless chicken', schedule: 'Today, 10:00 am delivery', status: 'ready', amount: 'INR 510', cutSpec: 'Small boneless cubes for fry', deliveryVendor: 'Store Fleet' },
];

export const supportTickets: Ticket[] = [
  { id: 'T-120', subject: 'Customer reported missing pickle jar', priority: 'medium', status: 'pending' },
  { id: 'T-121', subject: 'Need GST invoice for event order', priority: 'high', status: 'open' },
  { id: 'T-122', subject: 'Store approval documents under review', priority: 'low', status: 'resolved' },
];

export const subscriptionPlans: SubscriptionPlan[] = [
  { name: 'Starter Stall', price: 'INR 1,499 / month', seats: '1 owner login', features: ['Marketplace listing', 'Daily price updates', 'Basic order board', 'Ratings and reviews'] },
  { name: 'Growth ERP', price: 'INR 2,999 / month', seats: '3 team logins', features: ['Bulk orders', 'Schedule slots', 'Promo banners', 'Customer history', 'Tickets and billing'] },
  { name: 'Multi-Branch Market', price: 'INR 5,999 / month', seats: '10 team logins', features: ['Branch dashboards', 'Audit logs', 'Prep SLAs', 'Online billing portal'] },
];

export const adminMetrics: AdminMetric[] = [
  { label: 'Live stores', value: '50', note: 'Across Hyderabad areas and all category menus' },
  { label: 'ERP subscribers', value: '38', note: '12 on Growth ERP this month' },
  { label: 'Open tickets', value: '14', note: 'Average response 15 minutes' },
  { label: 'Bulk requests', value: '27', note: 'Wedding and event flows active' },
];

export function getCategoryBySlug(slug: string) {
  return categories.find((category) => category.slug === slug);
}

export function getAreaOptions() {
  return areaOptions;
}

export function getPriceForCategory(store: StoreSummary, categorySlug: string) {
  return store.prices.find((entry) => entry.categorySlug === categorySlug);
}

export function getStoresForCategory(categorySlug: string, area = 'All Hyderabad') {
  const filtered = area === 'All Hyderabad' ? stores : stores.filter((store) => store.area === area);
  return filtered.filter((store) => store.prices.some((price) => price.categorySlug === categorySlug));
}

export function getStoreBySlug(slug: string) {
  return storeDetails.find((store) => store.slug === slug);
}

export function getCatalogSnapshot() {
  return categories.map((category) => ({
    ...category,
    stores: getStoresForCategory(category.slug).length,
  }));
}
