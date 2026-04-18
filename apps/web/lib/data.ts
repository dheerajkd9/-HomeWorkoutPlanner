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
import { icons } from './ui-icons';

export const categories: Category[] = [
  { id: 'c1', name: 'Eid Specials', slug: 'specials', description: 'Festive bundles, family packs, and limited chef cuts.', badge: 'Festival ready', icon: icons.specials },
  { id: 'c2', name: 'Chicken', slug: 'chicken', description: 'Broiler, country chicken, boneless, curry cut, and grill packs.', badge: 'Most searched', icon: icons.chicken },
  { id: 'c3', name: 'Lamb and Goat', slug: 'lamb-goat', description: 'Fresh mutton, kheema, chops, ribs, and biryani cuts.', badge: 'Weekend hero', icon: icons.lambGoat },
  { id: 'c4', name: 'Fish and Seafood', slug: 'fish-seafood', description: 'Seer fish, pomfret, prawns, crab, and cleaned fillets.', badge: 'Fresh catch', icon: icons.fish },
  { id: 'c5', name: 'Ready to Cook', slug: 'ready-to-cook', description: 'Marinated grills, kebabs, mandi packs, and combo trays.', badge: 'Quick prep', icon: icons.readyToCook },
  { id: 'c6', name: 'Eggs', slug: 'eggs', description: 'Farm eggs, country eggs, and wholesale trays.', badge: 'Daily staple', icon: icons.eggs },
  { id: 'c7', name: 'Bulk Orders', slug: 'bulk-orders', description: 'Event catering cuts, wedding trays, mandi packs, and hub-store fulfilment.', badge: 'High margin', icon: icons.bulkOrders },
  { id: 'c8', name: 'Spreads and Pickles', slug: 'spreads-pickles', description: 'Gongura chicken, fish pickle, masala pastes, and soups.', badge: 'Upsell ready', icon: icons.spreads },
  { id: 'c9', name: 'Cold Cuts', slug: 'cold-cuts', description: 'Sausages, salami, deli meats, and frozen protein snacks.', badge: 'Modern counter', icon: icons.coldCuts },
];

export const areaOptions: AreaOption[] = [
  { name: 'All Hyderabad', zone: 'All zones' },
  { name: 'Kompally', zone: 'North Hyderabad' },
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

const generatedAreas = areaOptions.filter((area) => !['All Hyderabad', 'Kompally'].includes(area.name));
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
  'bulk-orders': { price: 4999, unit: 'event', names: ['Wedding chicken package', 'Mutton biryani event lot', 'Seafood family function tray'], cuts: ['Hub store allocation', 'Chef cut planning', 'Bulk portioning'] },
  'spreads-pickles': { price: 199, unit: 'jar', names: ['Gongura chicken pickle', 'Fish pickle', 'Soup base'], cuts: ['Jar'] },
  'cold-cuts': { price: 249, unit: 'pack', names: ['Chicken sausage', 'Smoked salami', 'Cold cut combo'], cuts: ['Pack'] },
};

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function makeMapUrl(name: string, addressLine: string) {
  return `https://maps.google.com/?q=${encodeURIComponent(`${name}, ${addressLine}`)}`;
}

function vendorsForStore(index: number): DeliveryVendor[] {
  const vendorSets: DeliveryVendor[][] = [
    [
      { name: 'Store Fleet', eta: '25-40 min', fee: 'INR 29', offer: 'Fresh-cut handoff from branch team', availability: 'available' },
      { name: 'Swiggy Genie', eta: '30-45 min', fee: 'INR 49', offer: 'Coupon SWIGGY40 on select slots', availability: 'available' },
      { name: 'Zomato Everyday', eta: '35-50 min', fee: 'INR 45', offer: 'Partner pickup available', availability: 'limited' },
    ],
    [
      { name: 'Store Fleet', eta: '20-35 min', fee: 'INR 25', offer: 'Preferred for morning fresh stock', availability: 'available' },
      { name: 'Porter', eta: '35-55 min', fee: 'INR 59', offer: 'Best for bulk orders and crates', availability: 'available' },
      { name: 'Pickup', eta: 'Ready in 20 min', fee: 'INR 0', offer: 'Choose your own slot', availability: 'available' },
    ],
  ];
  return vendorSets[index % vendorSets.length];
}

function pricesForCategorySlugs(categorySlugs: string[], seed: number): PriceEntry[] {
  return categorySlugs.map((categorySlug, index) => {
    const base = categoryBasePrices[categorySlug];
    const variance = ((seed * 17 + index * 11) % 90) - 20;
    return {
      categorySlug,
      unit: base.unit,
      price: Math.max(99, base.price + variance),
    };
  });
}

function buildStoreSummary(input: {
  id: string;
  name: string;
  area: string;
  zone: string;
  addressLine: string;
  hours: string;
  distanceKm: number;
  eta: string;
  rating: number;
  reviews: number;
  specialties: string[];
  categorySlugs: string[];
  prepStatus: 'accepting' | 'busy' | 'closing-soon';
  sourceLabel: string;
  sourceUrl: string;
  freshnessNote: string;
  bulkOrders?: boolean;
  picklesAvailable?: boolean;
  deliveryVendors?: DeliveryVendor[];
  orderModes?: string[];
}) : StoreSummary {
  const slug = slugify(input.name);
  return {
    id: input.id,
    slug,
    name: input.name,
    area: input.area,
    zone: input.zone,
    hours: input.hours,
    distanceKm: input.distanceKm,
    eta: input.eta,
    rating: input.rating,
    reviews: input.reviews,
    mapUrl: makeMapUrl(input.name, input.addressLine),
    freshnessNote: input.freshnessNote,
    specialties: input.specialties,
    categories: input.categorySlugs
      .map((slugValue) => categories.find((category) => category.slug === slugValue)?.name)
      .filter(Boolean) as string[],
    bulkOrders: input.bulkOrders ?? true,
    picklesAvailable: input.picklesAvailable ?? false,
    prepStatus: input.prepStatus,
    deliveryVendors: input.deliveryVendors ?? vendorsForStore(Number(input.id.replace(/[^0-9]/g, '')) || 1),
    prices: pricesForCategorySlugs(input.categorySlugs, Number(input.id.replace(/[^0-9]/g, '')) || 1),
    orderModes: input.orderModes ?? ['Delivery', 'Pickup', 'Scheduled order', 'Bulk event order'],
    addressLine: input.addressLine,
    sourceLabel: input.sourceLabel,
    sourceUrl: input.sourceUrl,
  };
}

const publicKompallyStores: StoreSummary[] = [
  buildStoreSummary({
    id: 'store-101',
    name: 'Sri Mallikarjuna Chicken Mart',
    area: 'Kompally',
    zone: 'North Hyderabad',
    addressLine: 'Block No 2, Near Sri Balaji Mithai Bhandher, Medchal Highway, Kompally, Rangareddy-500014, Telangana',
    hours: '8:30 am to 9:30 pm',
    distanceKm: 1.2,
    eta: '22-38 min',
    rating: 4.9,
    reviews: 24,
    specialties: ['Broiler chicken', 'Boneless chicken', 'Bulk orders'],
    categorySlugs: ['chicken', 'ready-to-cook', 'bulk-orders'],
    prepStatus: 'accepting',
    sourceLabel: 'Justdial public listing',
    sourceUrl: 'https://www.justdial.com/Rangareddy/Sri-Mallikarjuna-Chicken-Mart-Near-Sri-Balaji-Mithai-Bhandher-Kompally/040PXX40-XX40-180228154519-X7U8_BZDET',
    freshnessNote: 'Public listing synced from Justdial; owner price sync pending',
  }),
  buildStoreSummary({
    id: 'store-102',
    name: 'Suguna Foods Pvt Ltd Kompally',
    area: 'Kompally',
    zone: 'North Hyderabad',
    addressLine: 'Plot No 9, 4th Floor, Anu Radha Complex, Opposite Highway 44 Restaurant, Central Park, Main Road, Kompally, Rangareddy-500014, Telangana',
    hours: '8:30 am to 6:30 pm',
    distanceKm: 1.8,
    eta: '24-40 min',
    rating: 4.1,
    reviews: 253,
    specialties: ['Broiler chicken', 'Wholesale chicken', 'Branded retail'],
    categorySlugs: ['chicken', 'eggs'],
    prepStatus: 'accepting',
    sourceLabel: 'Justdial public listing',
    sourceUrl: 'https://www.justdial.com/Rangareddy/Suguna-Foods-Pvt-Ltd-Opposite-Highway-44-Restaurant-Kompally/040P8409582_BZDET',
    freshnessNote: 'Strong review volume from public listing; ideal anchor store for Kompally',
  }),
  buildStoreSummary({
    id: 'store-103',
    name: 'Golden Chicken And Mutton Center',
    area: 'Kompally',
    zone: 'North Hyderabad',
    addressLine: 'Plot No 101, Shop No 1, Opposite Highway 44 Multi Cuisine Restaurant, Medchal Road, Kompally, Rangareddy-500100, Telangana',
    hours: '7:00 am to 10:00 pm',
    distanceKm: 0.9,
    eta: '20-34 min',
    rating: 4.6,
    reviews: 5,
    specialties: ['Chicken', 'Mutton', 'Egg wholesales'],
    categorySlugs: ['chicken', 'lamb-goat', 'eggs', 'bulk-orders'],
    prepStatus: 'accepting',
    sourceLabel: 'Justdial public listing',
    sourceUrl: 'https://www.justdial.com/Rangareddy/Golden-Chicken-And-Mutton-Center-Opp-Highway-44-Multi-Cuisine-Resturant-Kompally/040PXX40-XX40-151124103642-X5P9_BZDET',
    freshnessNote: 'Public listing includes chicken, mutton, and egg wholesale coverage',
  }),
  buildStoreSummary({
    id: 'store-104',
    name: 'Srija Reddy Farmer Chicken Market & Mutton',
    area: 'Kompally',
    zone: 'North Hyderabad',
    addressLine: 'Shop No 1, Beside Bridge, Main Road, Kompally, Rangareddy-500014, Telangana',
    hours: '8:00 am to 10:00 pm',
    distanceKm: 1.4,
    eta: '26-42 min',
    rating: 4.5,
    reviews: 7,
    specialties: ['Farmer chicken', 'Mutton wholesale', 'Bulk orders'],
    categorySlugs: ['chicken', 'lamb-goat', 'bulk-orders'],
    prepStatus: 'accepting',
    sourceLabel: 'Justdial public listing',
    sourceUrl: 'https://www.justdial.com/Hyderabad/Srija-Reddy-Farmer-Chicken-Market-Mutton-Beside-Bridge-Kompally/040PXX40-XX40-230405145823-T7D4_BZDET',
    freshnessNote: 'Public listing imported with strong Kompally chicken and mutton relevance',
  }),
  buildStoreSummary({
    id: 'store-105',
    name: 'Godavari Cuts - Kompally',
    area: 'Kompally',
    zone: 'North Hyderabad',
    addressLine: 'Plot No 149/2, Meenakshi Estate, Pedda Bashirabad, Jeedimetla, Secunderabad, Opposite Srini Avenue Gate, HT Road, NCL Enclave, Hyderabad-500015, Telangana',
    hours: '6:30 am to 8:30 pm',
    distanceKm: 2.4,
    eta: '28-46 min',
    rating: 4.6,
    reviews: 30,
    specialties: ['Premium cuts', 'Live fish', 'Hand-cut meats'],
    categorySlugs: ['chicken', 'lamb-goat', 'fish-seafood', 'ready-to-cook', 'bulk-orders'],
    prepStatus: 'busy',
    sourceLabel: 'Justdial public listing',
    sourceUrl: 'https://www.justdial.com/Hyderabad/Godavari-Cuts-Kompally-Opposite-Srini-Avenue-Gate-NCL-Enclave/040PXX40-XX40-230331101141-J2A7_BZDET',
    freshnessNote: 'Public listing highlights live fish and premium meat positioning',
    picklesAvailable: true,
  }),
  buildStoreSummary({
    id: 'store-106',
    name: 'Sri Sai Ram Fresh Sea Foods',
    area: 'Kompally',
    zone: 'North Hyderabad',
    addressLine: 'Ruby Block, Jaibery Colony, Hyderabad, Jayabheri Park Road, Kompally, Rangareddy-500014, Telangana',
    hours: '6:30 am to 9:30 pm',
    distanceKm: 1.6,
    eta: '24-39 min',
    rating: 4.3,
    reviews: 35,
    specialties: ['Fresh fish', 'Seafood retail', 'Daily catch'],
    categorySlugs: ['fish-seafood'],
    prepStatus: 'accepting',
    sourceLabel: 'Justdial public listing',
    sourceUrl: 'https://www.justdial.com/Rangareddy/Sri-Sai-Ram-Fresh-Sea-Foods-Kompally-Kompally/040PXX40-XX40-230107152936-R3K7_BZDET',
    freshnessNote: 'Public listing carries the strongest seafood review density in Kompally',
  }),
  buildStoreSummary({
    id: 'store-107',
    name: 'Chetan Fish Mart',
    area: 'Kompally',
    zone: 'North Hyderabad',
    addressLine: 'Beside Telsa Diagnostic, Dhulapally Road, Medchal Road-Kompally-500014, Telangana',
    hours: '6:00 am to 10:00 pm',
    distanceKm: 1.1,
    eta: '20-35 min',
    rating: 3.5,
    reviews: 4,
    specialties: ['Fish market', 'Chicken retail', 'Goat meat retail'],
    categorySlugs: ['fish-seafood', 'chicken', 'lamb-goat'],
    prepStatus: 'accepting',
    sourceLabel: 'Justdial public listing',
    sourceUrl: 'https://www.justdial.com/Rangareddy/Chetan-Fish-Mart-Beside-Telsa-Diagnostic-Medchal-Road-Kompally/040PXX40-XX40-210213101000-Z1R9_BZDET',
    freshnessNote: 'Public listing shows cross-category demand across fish, chicken, and goat',
  }),
  buildStoreSummary({
    id: 'store-108',
    name: 'Ram Reddy Chicken Market',
    area: 'Kompally',
    zone: 'North Hyderabad',
    addressLine: 'Near Central Park, Kompally, Rangareddy-500014, Telangana',
    hours: '7:00 am to 10:00 pm',
    distanceKm: 1.5,
    eta: '26-41 min',
    rating: 3.7,
    reviews: 32,
    specialties: ['Halal chicken', 'Country chicken', 'Retail and bulk'],
    categorySlugs: ['chicken'],
    prepStatus: 'accepting',
    sourceLabel: 'Justdial public listing',
    sourceUrl: 'https://www.justdial.com/Rangareddy/Ram-Reddy-Chicken-Market-Near-Central-Park-Kompally/040PXX40-XX40-170901193643-D7A2_BZDET',
    freshnessNote: 'Public listing imported from established Kompally chicken retailer page',
  }),
  buildStoreSummary({
    id: 'store-109',
    name: 'Bismillah Chicken Centre',
    area: 'Kompally',
    zone: 'North Hyderabad',
    addressLine: 'Kompally Lane, Opposite Municipal Office, Kompally, Hyderabad, Telangana 500014',
    hours: '9:00 am to 10:00 pm',
    distanceKm: 0.7,
    eta: '18-30 min',
    rating: 5,
    reviews: 1,
    specialties: ['Butcher shop', 'Chicken retail', 'Quick pickup'],
    categorySlugs: ['chicken'],
    prepStatus: 'accepting',
    sourceLabel: 'Zaubee listing',
    sourceUrl: 'https://zaubee.com/biz/bismillah-chicken-centre-d821bdcb',
    freshnessNote: 'Imported from public business listing with address and review snapshot',
  }),
  buildStoreSummary({
    id: 'store-110',
    name: 'Sneha Chicken Center',
    area: 'Kompally',
    zone: 'North Hyderabad',
    addressLine: 'Near Municipal Office, Medchal Road-Kompally, Rangareddy-500014, Telangana',
    hours: '7:00 am to 9:30 pm',
    distanceKm: 1,
    eta: '20-32 min',
    rating: 4,
    reviews: 0,
    specialties: ['Broiler chicken', 'Boneless chicken', 'Fast neighborhood pickup'],
    categorySlugs: ['chicken'],
    prepStatus: 'closing-soon',
    sourceLabel: 'Justdial public listing',
    sourceUrl: 'https://www.justdial.com/Hyderabad/Sneha-Chicken-Center-Near-Muncipal-Office-Medchal-Road-Kompally/040PXX40-XX40-210308103511-R1N2_BZDET',
    freshnessNote: 'Public listing found with address; rating volume not yet visible in the source snapshot',
  }),
];

const generatedStores: StoreSummary[] = generatedAreas.flatMap((area, areaIndex) =>
  chains.map((chain, chainIndex) => {
    const seed = areaIndex * chains.length + chainIndex + 1;
    const slug = slugify(`${area.name}-${chain.brand}`);
    const prices = pricesForCategorySlugs(categories.map((category) => category.slug), seed);
    return {
      id: `generated-${seed}`,
      slug,
      name: `${area.name} ${chain.brand}`,
      area: area.name,
      zone: area.zone,
      hours: seed % 2 === 0 ? '6 am to 12 pm' : '7 am to 2 pm',
      distanceKm: Number((1.1 + (seed % 7) * 0.7).toFixed(1)),
      eta: `${18 + (seed % 5) * 6}-${35 + (seed % 6) * 7} min`,
      rating: Number((4 + ((seed % 10) * 0.08)).toFixed(1)),
      reviews: 180 + seed * 13,
      mapUrl: makeMapUrl(`${chain.brand} ${area.name}`, `${area.name}, Hyderabad, Telangana`),
      freshnessNote: `Seeded Hyderabad network view for ${area.name}; owner sync pending`,
      specialties: chain.specialties,
      categories: categories.map((category) => category.name),
      bulkOrders: true,
      picklesAvailable: seed % 3 !== 0,
      prepStatus: seed % 3 === 0 ? 'busy' : seed % 4 === 0 ? 'closing-soon' : 'accepting',
      deliveryVendors: vendorsForStore(seed),
      prices,
      orderModes: ['Delivery', 'Pickup', 'Scheduled order', 'Bulk event order'],
      addressLine: `${area.name}, Hyderabad, Telangana`,
      sourceLabel: 'Marketplace seed set',
      sourceUrl: '',
    };
  }),
);

export const stores: StoreSummary[] = [...publicKompallyStores, ...generatedStores];

export const storeDetails: StoreDetail[] = stores.map((store, index) => ({
  ...store,
  description: store.area === 'Kompally'
    ? `${store.name} was onboarded from a public Kompally business listing so customers can browse the exact store name, area address, rating snapshot, and open it directly in Google Maps while the owner-side ERP data catches up.`
    : `${store.name} is a SaaS-enabled meat store with daily pricing, cut specifications, customer history, scheduled deliveries, and support tickets managed from one platform.`,
  serviceArea: [store.area, 'Kompally', 'Suchitra', 'Pet Basheerabad', 'Jeedimetla', 'Bowenpally'].filter((value, valueIndex, array) => array.indexOf(value) === valueIndex),
  deliveryWindows: ['6:30 am - 9:00 am', '10:30 am - 1:30 pm', '5:00 pm - 8:30 pm'],
  products: store.prices.flatMap((priceEntry, priceIndex) => {
    const category = categories.find((item) => item.slug === priceEntry.categorySlug);
    const base = categoryBasePrices[priceEntry.categorySlug];
    if (!category || !base) {
      return [];
    }

    return base.names.slice(0, priceEntry.categorySlug === 'specials' ? 1 : 2).map((name, nameIndex) => ({
      id: `${store.id}-${priceEntry.categorySlug}-${nameIndex}`,
      categoryId: category.id,
      name,
      unit: base.unit,
      price: priceEntry.price + nameIndex * 20,
      availability: (index + priceIndex + nameIndex) % 5 === 0 ? 'limited' : 'in-stock',
      cuts: base.cuts,
      notes: store.area === 'Kompally'
        ? `Public store listing onboarded for ${store.area}; price shown in app should be confirmed by owner update.`
        : `${category.name} listing updated for ${store.area}.`,
    }));
  }),
  reviewsList: [
    { id: `${store.id}-review-1`, author: 'Aditi', rating: 5, quote: `The ${store.area} listing made it easy to compare cuts and delivery choices.` },
    { id: `${store.id}-review-2`, author: 'Rahim', rating: 4, quote: 'Prep updates and pickup timing were clear in the store page.' },
    { id: `${store.id}-review-3`, author: 'Nisha', rating: 5, quote: 'Loved the map handoff and the category-specific browsing flow.' },
  ],
}));

export const customerMetrics: CustomerMetric[] = [
  { label: 'Saved stores', value: '12', detail: 'Across Kompally chicken, fish, eggs, and bulk orders' },
  { label: 'Scheduled orders', value: '4', detail: 'Upcoming family and office deliveries' },
  { label: 'Average spend', value: 'INR 1,480', detail: 'Per order over the last 30 days' },
  { label: 'Support response', value: '14 min', detail: 'Average ticket reply time' },
];

export const customerOrders: CustomerOrder[] = [
  { id: 'CUS-3012', storeName: 'Sri Mallikarjuna Chicken Mart', category: 'Chicken', total: 'INR 842', schedule: 'Today, 7:30 PM', status: 'Preparing', deliveryVendor: 'Swiggy Genie' },
  { id: 'CUS-3011', storeName: 'Sri Sai Ram Fresh Sea Foods', category: 'Fish and Seafood', total: 'INR 1,290', schedule: 'Tomorrow, 8:00 AM', status: 'Scheduled', deliveryVendor: 'Store Fleet' },
  { id: 'CUS-3004', storeName: 'Godavari Cuts - Kompally', category: 'Lamb and Goat', total: 'INR 5,860', schedule: 'Saturday, 5:30 AM', status: 'Bulk order review', deliveryVendor: 'Porter' },
];

export const customerSavedStores: CustomerSavedStore[] = [
  { storeName: 'Golden Chicken And Mutton Center', area: 'Kompally', bestFor: 'Chicken, mutton, and egg supply', priceNote: 'ERP-side price sync still pending' },
  { storeName: 'Sri Mallikarjuna Chicken Mart', area: 'Kompally', bestFor: 'Daily chicken orders and pickups', priceNote: 'Chicken starts at INR 286 in the app seed' },
  { storeName: 'Sri Sai Ram Fresh Sea Foods', area: 'Kompally', bestFor: 'Fresh fish and seafood', priceNote: 'Seafood starts at INR 559 in the app seed' },
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
  { label: 'Public Kompally stores', value: `${publicKompallyStores.length}`, note: 'Curated from current public listings with map-ready addresses' },
  { label: 'Hyderabad demo network', value: `${generatedStores.length}`, note: 'Seeded multi-area ERP demo continues beside Kompally imports' },
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
