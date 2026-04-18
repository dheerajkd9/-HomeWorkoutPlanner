import { stores, subscriptionPlans, supportTickets } from '../../lib/data';

export default function AdminPage() {
  return (
    <main className="dashboard-page admin-page">
      <section className="dashboard-hero">
        <div>
          <p className="eyebrow">Platform admin</p>
          <h1>Approve stores, watch subscriptions, and keep the Hyderabad marketplace reliable.</h1>
          <p>The admin layer focuses on marketplace trust: active listings, ticket response, store compliance, and expansion readiness for more neighborhoods.</p>
        </div>
      </section>

      <section className="admin-grid">
        <div className="admin-panel">
          <p className="eyebrow">Approvals</p>
          <h2>Store onboarding queue</h2>
          {stores.map((store, index) => (<div key={store.id} className="admin-row"><strong>{store.name}</strong><span>{store.area} | {index === 0 ? 'Approved' : 'Pending documents'}</span></div>))}
        </div>
        <div className="admin-panel">
          <p className="eyebrow">Revenue</p>
          <h2>Subscription plans</h2>
          {subscriptionPlans.map((plan) => (<div key={plan.name} className="admin-row"><strong>{plan.name}</strong><span>{plan.price}</span></div>))}
        </div>
        <div className="admin-panel">
          <p className="eyebrow">Support</p>
          <h2>Open ticket feed</h2>
          {supportTickets.map((ticket) => (<div key={ticket.id} className="admin-row"><strong>{ticket.subject}</strong><span>{ticket.status} | {ticket.priority}</span></div>))}
        </div>
      </section>
    </main>
  );
}
