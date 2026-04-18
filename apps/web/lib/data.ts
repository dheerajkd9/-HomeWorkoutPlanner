import type {
  Category,
  OwnerMetric,
  OwnerOrder,
  StoreDetail,
  StoreSummary,
  SubscriptionPlan,
  Ticket,
} from './types';

export const categories: Category[] = [
  { id: 'c1', name: 'Chicken', description: 'Broiler, country chicken, cuts, boneless, and curry packs.' },
  { id: 'c2', name: 'Lamb & Goat', description: 'Fresh mutton, kheema, ribs, chops, and festive cuts.' },
  { id: 'c3', name: 'Fish & Seafood', description: 'Pomfret, seer fish, prawns, rohu, crab, and cleaned fillets.' },
  { id: 'c4', name: 'Ready to Cook', description: 'Marinated grills, kebabs, biryani cuts, and meal kits.' },
  { id: 'c5', name: 'Eggs', description: 'Farm eggs, country eggs, and bulk trays.' },
  { id: 'c6', name: 'Spreads & Pickles', description: 'Gongura pickle, kheema masala, and accompaniments.' },
  { id: 'c7', name: 'Cold Cuts', description: 'Sausages, salami, and deli-style options.' },
  { id: 'c8', name: 'Exotic', description: 'Premium seafood and special-order inventory.' },
];

const commonChickenCuts = ['Curry cut', 'Biryani cut', 'Boneless cubes', 'Skinless whole bird'];
const commonFishCuts = ['Steaks', 'Fillet', 'Whole cleaned', 'Tandoor butterfly'];

export const stores: StoreSummary[] = [
  {
    id: 's1', slug: 'swadesh-chicken-hitec-city', name: 'Swadesh Chicken', area: 'Madhapur', hours: '6 am to 12 pm', distanceKm: 1.2, eta: '18-40 min', rating: 4.6, reviews: 221, todayPrice: 299,
    mapUrl: 'https://maps.google.com/?q=Swadesh+Chicken+Madhapur+Hyderabad', deliveryPartner: 'Store delivery + Porter', freshnessNote: 'Today\'s live price updated at 5:48 am', specialties: ['Country chicken', 'Poultry chicken', 'Bulk events'], categories: ['Chicken', 'Ready to Cook', 'Spreads & Pickles'], bulkOrders: true, picklesAvailable: true, prepStatus: 'accepting'
  },
  {
    id: 's2', slug: 'chicken-corner-kondapur', name: 'Chicken Corner', area: 'Kondapur', hours: '7 am to 1 pm', distanceKm: 2.6, eta: '23-55 min', rating: 4.3, reviews: 164, todayPrice: 340,
    mapUrl: 'https://maps.google.com/?q=Chicken+Corner+Kondapur+Hyderabad', deliveryPartner: 'Dunzo-style local delivery', freshnessNote: 'Inventory sync sent by SMS at 6:02 am', specialties: ['Boneless cuts', 'Marinated packs'], categories: ['Chicken', 'Ready to Cook', 'Eggs'], bulkOrders: true, picklesAvailable: false, prepStatus: 'busy'
  },
  {
    id: 's3', slug: 'fresh-sea-catch-gachibowli', name: 'Fresh Sea Catch', area: 'Gachibowli', hours: '6 am to 2 pm', distanceKm: 4.1, eta: '30-60 min', rating: 4.8, reviews: 312, todayPrice: 520,
    mapUrl: 'https://maps.google.com/?q=Fresh+Sea+Catch+Gachibowli+Hyderabad', deliveryPartner: 'Store rider + pickup', freshnessNote: 'Fish and seafood pricing refreshed at 7:10 am', specialties: ['Seer fish', 'Prawns', 'Cleaned seafood'], categories: ['Fish & Seafood', 'Exotic'], bulkOrders: true, picklesAvailable: true, prepStatus: 'accepting'
  }
];

export const storeDetails: StoreDetail[] = [
  {
    ...stores[0],
    description: 'Neighborhood-first chicken shop with fast morning delivery, clean cut customization, and event-ready bulk supply.',
    serviceArea: ['HITEC City', 'Madhapur', 'Kondapur', 'Jubilee Hills'],
    deliveryWindows: ['6:30 am - 9:00 am', '10:30 am - 1:00 pm', '5:00 pm - 8:00 pm'],
    products: [
      { id: 'p1', categoryId: 'c1', name: 'Country Chicken', unit: 'kg', price: 299, availability: 'in-stock', cuts: commonChickenCuts, notes: 'Best seller for curry and biryani.' },
      { id: 'p2', categoryId: 'c1', name: 'Skinless Broiler', unit: 'kg', price: 249, availability: 'in-stock', cuts: commonChickenCuts },
      { id: 'p3', categoryId: 'c4', name: 'Pepper Grill Pack', unit: 'pack', price: 199, availability: 'limited', cuts: ['Ready to cook'], notes: 'Serves 2-3 people.' },
      { id: 'p4', categoryId: 'c6', name: 'Gongura Chicken Pickle', unit: 'jar', price: 180, availability: 'in-stock', cuts: ['No cut needed'] }
    ],
    reviewsList: [
      { id: 'r1', author: 'Aditi', rating: 5, quote: 'Cuts were exactly as requested and delivery was early.' },
      { id: 'r2', author: 'Kiran', rating: 4, quote: 'Great for Sunday family orders and clean packaging.' }
    ]
  },
  {
    ...stores[1],
    description: 'A fast-moving neighborhood shop focused on boneless packs, marinated trays, and scheduled pickup.',
    serviceArea: ['Kondapur', 'Miyapur', 'Hafeezpet'],
    deliveryWindows: ['7:00 am - 11:30 am', '4:30 pm - 7:30 pm'],
    products: [
      { id: 'p5', categoryId: 'c1', name: 'Boneless Chicken Cubes', unit: 'kg', price: 340, availability: 'in-stock', cuts: ['Boneless cubes', 'Biryani cut'] },
      { id: 'p6', categoryId: 'c4', name: 'Hariyali Kebab Mix', unit: 'tray', price: 260, availability: 'limited', cuts: ['Ready to cook'] },
      { id: 'p7', categoryId: 'c5', name: 'Farm Eggs', unit: 'tray', price: 110, availability: 'in-stock', cuts: ['No cut needed'] }
    ],
    reviewsList: [
      { id: 'r3', author: 'Sana', rating: 4, quote: 'Very reliable for meal prep orders.' },
      { id: 'r4', author: 'Rahul', rating: 5, quote: 'Scheduled pickup worked smoothly before office.' }
    ]
  },
  {
    ...stores[2],
    description: 'Seafood-focused store with cleaned fish, prep-specific instructions, and premium weekend inventory.',
    serviceArea: ['Gachibowli', 'Financial District', 'Nanakramguda'],
    deliveryWindows: ['8:00 am - 12:00 pm', '5:00 pm - 8:30 pm'],
    products: [
      { id: 'p8', categoryId: 'c3', name: 'Seer Fish', unit: 'kg', price: 520, availability: 'in-stock', cuts: commonFishCuts },
      { id: 'p9', categoryId: 'c3', name: 'Tiger Prawns', unit: 'kg', price: 690, availability: 'limited', cuts: ['Deveined', 'Shell-on', 'Cleaned'] },
      { id: 'p10', categoryId: 'c6', name: 'Fish Pickle', unit: 'jar', price: 220, availability: 'in-stock', cuts: ['No cut needed'] }
    ],
    reviewsList: [
      { id: 'r5', author: 'Vamshi', rating: 5, quote: 'Cleaned prawns came exactly right.' },
      { id: 'r6', author: 'Nisha', rating: 5, quote: 'Best seafood detail page I have seen for a local store.' }
    ]
  }
];

export const ownerMetrics: OwnerMetric[] = [
  { label: 'Today\'s orders', value: '43', delta: '+12% vs yesterday' },
  { label: 'Average prep SLA', value: '19 min', delta: '2 min faster' },
  { label: 'Repeat customers', value: '61%', delta: '+7 points' },
  { label: 'Subscription status', value: 'Growth plan', delta: 'Renews in 18 days' }
];

export const ownerOrders: OwnerOrder[] = [
  { id: 'ORD-1842', customer: 'Sowmya R.', itemSummary: '2 kg country chicken + pickle jar', schedule: 'Today, 8:15 am delivery', status: 'preparing', amount: 'INR 778', cutSpec: 'Medium curry cut, extra skin removal' },
  { id: 'ORD-1843', customer: 'Rahim Events', itemSummary: '18 kg mutton for function', schedule: 'Tomorrow, 5:30 am pickup', status: 'accepted', amount: 'INR 14,400', cutSpec: 'Biryani cut with separate fat pack' },
  { id: 'ORD-1844', customer: 'Anjali P.', itemSummary: '1.5 kg boneless chicken', schedule: 'Today, 10:00 am delivery', status: 'ready', amount: 'INR 510', cutSpec: 'Small boneless cubes for fry' }
];

export const supportTickets: Ticket[] = [
  { id: 'T-120', subject: 'Customer reported missing pickle jar', priority: 'medium', status: 'pending' },
  { id: 'T-121', subject: 'Need GST invoice for event order', priority: 'high', status: 'open' },
  { id: 'T-122', subject: 'Store approval documents under review', priority: 'low', status: 'resolved' }
];

export const subscriptionPlans: SubscriptionPlan[] = [
  { name: 'Starter Stall', price: 'INR 1,499 / month', seats: '1 owner login', features: ['Marketplace listing', 'Daily price updates', 'Basic order board', 'Ratings and reviews'] },
  { name: 'Growth Butcher', price: 'INR 2,999 / month', seats: '3 team logins', features: ['Bulk orders', 'Schedule slots', 'Promo banners', 'Tickets and billing'] },
  { name: 'Multi-Branch Market', price: 'INR 5,999 / month', seats: '10 team logins', features: ['Branch dashboards', 'Audit logs', 'Prep SLAs', 'Priority onboarding support'] }
];

export function getStoreBySlug(slug: string) {
  return storeDetails.find((store) => store.slug === slug);
}

export function getCatalogSnapshot() {
  return categories.map((category) => ({
    ...category,
    stores: stores.filter((store) => store.categories.includes(category.name)).length,
  }));
}

