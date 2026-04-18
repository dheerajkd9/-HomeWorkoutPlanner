import { adminMetrics, stores, subscriptionPlans, supportTickets } from '../../lib/data';

export default function AdminPage() {
  return (
    <main className="dashboard-page admin-page">
      <section className="dashboard-hero">
        <div>
          <p className="eyebrow">Platform admin</p>
          <h1>Run marketplace operations, store approvals, subscriptions, and support like a SaaS control room.</h1>
          <p>The admin layer tracks live stores, ERP subscriptions, delivery health, ticket queues, and launch readiness across Hyderabad zones.</p>
        </div>
      </section>

      <section className="metrics-grid">
        {adminMetrics.map((metric) => (
          <article key={metric.label} className="metric-card">
            <p>{metric.label}</p>
            <strong>{metric.value}</strong>
            <span>{metric.note}</span>
          </article>
        ))}
      </section>

      <section className="admin-grid">
        <div className="admin-panel">
          <p className="eyebrow">Approvals</p>
          <h2>Store onboarding queue</h2>
          {stores.slice(0, 8).map((store, index) => (
            <div key={store.id} className="admin-row">
              <strong>{store.name}</strong>
              <span>{store.area} | {index < 5 ? 'Approved' : 'Pending KYC and GST'}</span>
            </div>
          ))}
        </div>
        <div className="admin-panel">
          <p className="eyebrow">Plans</p>
          <h2>SaaS subscription mix</h2>
          {subscriptionPlans.map((plan) => (
            <div key={plan.name} className="admin-row">
              <strong>{plan.name}</strong>
              <span>{plan.price}</span>
            </div>
          ))}
        </div>
        <div className="admin-panel">
          <p className="eyebrow">Support</p>
          <h2>Open ticket feed</h2>
          {supportTickets.map((ticket) => (
            <div key={ticket.id} className="admin-row">
              <strong>{ticket.subject}</strong>
              <span>{ticket.status} | {ticket.priority}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
