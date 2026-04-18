import { customerOrders } from '../../../lib/data';

export default function CustomerOrdersPage() {
  return (
    <main className="dashboard-page">
      <section className="dashboard-hero">
        <div>
          <p className="eyebrow">Order history</p>
          <h1>Every delivery, pickup, and bulk request in one customer ledger.</h1>
        </div>
      </section>
      <div className="order-board">
        {customerOrders.map((order) => (
          <article key={order.id} className="order-card">
            <strong>{order.id}</strong>
            <h3>{order.storeName}</h3>
            <p>{order.category}</p>
            <p>{order.schedule}</p>
            <p>{order.deliveryVendor}</p>
            <strong>{order.total}</strong>
          </article>
        ))}
      </div>
    </main>
  );
}
