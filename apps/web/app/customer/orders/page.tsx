import { getCustomerOrdersPageData } from '../../../lib/server-data';

export default async function CustomerOrdersPage() {
  const orders = await getCustomerOrdersPageData();

  return (
    <main className="dashboard-page">
      <section className="dashboard-hero">
        <div>
          <p className="eyebrow">Order history</p>
          <h1>Every delivery, pickup, and bulk request in one customer ledger.</h1>
        </div>
      </section>
      <div className="order-board">
        {orders.map((order: any) => (
          <article key={order.id} className="order-card">
            <strong>{order.order_number ?? order.id}</strong>
            <h3>{order.storeName ?? order.store_name ?? 'Store order'}</h3>
            <p>{order.category ?? 'Marketplace order'}</p>
            <p>{order.schedule ?? order.scheduled_for ?? 'Immediate delivery'}</p>
            <p>{order.deliveryVendor ?? order.delivery_vendor ?? 'Store Fleet'}</p>
            <strong>{order.total ?? `INR ${order.total_amount ?? 0}`}</strong>
          </article>
        ))}
      </div>
    </main>
  );
}
