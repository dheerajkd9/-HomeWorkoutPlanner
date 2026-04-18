import Link from 'next/link';
import { customerMetrics, customerOrders, customerSavedStores } from '../../lib/data';

export default function CustomerDashboardPage() {
  return (
    <main className="dashboard-page">
      <section className="dashboard-hero">
        <div>
          <p className="eyebrow">Customer platform</p>
          <h1>Track orders, compare nearby stores, choose delivery partners, and manage repeat purchases.</h1>
          <p>This dashboard acts like the customer operating layer of the marketplace: saved stores, order history, delivery preference, support, and billing visibility.</p>
        </div>
        <div className="sms-card">
          <span className="mini-label">Quick actions</span>
          <Link href="/category/chicken" className="secondary-link">Browse stores</Link>
          <Link href="/customer/orders" className="primary-link">Open order history</Link>
        </div>
      </section>

      <section className="metrics-grid">
        {customerMetrics.map((metric) => (
          <article key={metric.label} className="metric-card">
            <p>{metric.label}</p>
            <strong>{metric.value}</strong>
            <span>{metric.detail}</span>
          </article>
        ))}
      </section>

      <section className="owner-layout">
        <div>
          <div className="section-header">
            <div>
              <p className="eyebrow">Recent orders</p>
              <h2>Scheduled deliveries, vendor choice, and prep updates</h2>
            </div>
          </div>
          <div className="order-board">
            {customerOrders.map((order) => (
              <article key={order.id} className="order-card">
                <div className="order-topline">
                  <strong>{order.id}</strong>
                  <span className="prep-pill accepting">{order.status}</span>
                </div>
                <h3>{order.storeName}</h3>
                <p>{order.category}</p>
                <p>{order.schedule}</p>
                <p>{order.deliveryVendor}</p>
                <strong>{order.total}</strong>
              </article>
            ))}
          </div>
        </div>
        <aside className="owner-sidebar">
          <section>
            <p className="eyebrow">Saved stores</p>
            <h3>Favorites and repeat order picks</h3>
            <div className="ticket-list">
              {customerSavedStores.map((store) => (
                <div key={store.storeName} className="ticket-row">
                  <strong>{store.storeName}</strong>
                  <span>{store.area} | {store.bestFor} | {store.priceNote}</span>
                </div>
              ))}
            </div>
          </section>
        </aside>
      </section>
    </main>
  );
}
