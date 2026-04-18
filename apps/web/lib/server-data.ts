import { customerMetrics, customerOrders, customerSavedStores, ownerMetrics, ownerOrders, stores, subscriptionPlans, supportTickets } from './data';
import { getCurrentSession } from './auth/session';
import { fetchLiveMarketFeed } from './integrations/live-feed';
import { getDeliveryQuotes } from './integrations/delivery';
import { getStore, listOrders, listStores } from './repositories/platform';

export async function getMarketplaceData(categorySlug: string, area: string) {
  const [dbStores, feed] = await Promise.all([
    listStores(categorySlug, area === 'All Hyderabad' ? undefined : area),
    fetchLiveMarketFeed(area === 'All Hyderabad' ? undefined : area, categorySlug).catch(() => null),
  ]);

  return {
    stores: Array.isArray(dbStores) && dbStores.length > 0 ? dbStores : stores.filter((store) => (area === 'All Hyderabad' || store.area === area) && store.prices.some((price) => price.categorySlug === categorySlug)),
    liveFeed: feed,
  };
}

export async function getStorePageData(slug: string) {
  return getStore(slug);
}

export async function getCustomerDashboardData() {
  const session = await getCurrentSession();
  const dbOrders = session ? await listOrders({ customerUserId: session.user.id }).catch(() => []) : [];

  return {
    session,
    metrics: customerMetrics,
    orders: dbOrders.length > 0 ? dbOrders : customerOrders,
    savedStores: customerSavedStores,
  };
}

export async function getOwnerDashboardData() {
  const session = await getCurrentSession();
  const dbOrders = session ? await listOrders({}).catch(() => []) : [];

  return {
    session,
    metrics: ownerMetrics,
    orders: dbOrders.length > 0 ? dbOrders : ownerOrders,
    tickets: supportTickets,
    plans: subscriptionPlans,
    quotes: await getDeliveryQuotes({ area: 'HITEC City', storeName: 'Store ERP', orderValue: 1000 }).catch(() => []),
  };
}

export async function getCustomerOrdersPageData() {
  const session = await getCurrentSession();
  const dbOrders = session ? await listOrders({ customerUserId: session.user.id }).catch(() => []) : [];
  return dbOrders.length > 0 ? dbOrders : customerOrders;
}
