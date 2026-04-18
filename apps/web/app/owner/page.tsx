import { ownerMetrics, ownerOrders, subscriptionPlans, supportTickets } from '../../lib/data';

export default function OwnerDashboardPage() {
  return (
    <main className="dashboard-page">
      <section className="dashboard-hero">
        <div>
          <p className="eyebrow">Store owner workspace</p>
          <h1>Update daily inventory, prep queues, tickets, and subscription billing from one screen.</h1>
          <p>This dashboard is designed for store owners who want fast morning price publishing, customer order clarity, and a path to simple SaaS billing.</p>
        </div>
        <div className="sms-card">
          <span className="mini-label">Daily SMS template</span>
          <code>CHKN 299 STOCK HIGH CUTS curry,biryani | MUTTON 820 LIMITED | PICKLE YES</code>
        </div>
      </section>

      <section className="metrics-grid">
        {ownerMetrics.map((metric) => (
          <article key={metric.label} className="metric-card">
            <p>{metric.label}</p>
            <strong>{metric.value}</strong>
            <span>{metric.delta}</span>
          </article>
        ))}
      </section>

      <section className="owner-layout">
        <div>
          <div className="section-header"><div><p className="eyebrow">Order board</p><h2>Prep status and cut specifications</h2></div></div>
          <div className="order-board">
            {ownerOrders.map((order) => (
              <article key={order.id} className="order-card">
                <div className="order-topline"><strong>{order.id}</strong><span className={`prep-pill ${order.status}`}>{order.status.replace(/-/g, ' ')}</span></div>
                <h3>{order.customer}</h3>
                <p>{order.itemSummary}</p>
                <p>{order.schedule}</p>
                <p>{order.cutSpec}</p>
                <strong>{order.amount}</strong>
              </article>
            ))}
          </div>
        </div>
        <aside className="owner-sidebar">
          <section>
            <p className="eyebrow">Support</p>
            <h3>Tickets</h3>
            <div className="ticket-list">{supportTickets.map((ticket) => (<div key={ticket.id} className="ticket-row"><strong>{ticket.subject}</strong><span>{ticket.priority} priority • {ticket.status}</span></div>))}</div>
          </section>
          <section>
            <p className="eyebrow">Billing</p>
            <h3>Stripe-ready SaaS plans</h3>
            <div className="plan-stack">{subscriptionPlans.map((plan) => (<div key={plan.name} className="plan-card"><strong>{plan.name}</strong><span>{plan.price}</span><p>{plan.seats}</p></div>))}</div>
          </section>
        </aside>
      </section>
    </main>
  );
}
