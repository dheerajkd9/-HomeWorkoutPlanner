import { getOwnerDashboardData } from '../../lib/server-data';

export default async function OwnerDashboardPage() {
  const { session, metrics, orders, tickets, plans, quotes } = await getOwnerDashboardData();

  return (
    <main className="dashboard-page">
      <section className="dashboard-hero">
        <div>
          <p className="eyebrow">Store ERP workspace</p>
          <h1>Manage daily pricing, inventory, cut specs, staff, prep queues, billing, customer history, and support from one SaaS console.</h1>
          <p>{session ? `Signed in as ${session.user.email}.` : 'Configure Supabase auth and organization membership to bind this ERP dashboard to a real store.'}</p>
        </div>
        <div className="sms-card">
          <span className="mini-label">Delivery quotes</span>
          {quotes.map((quote: any) => (
            <p key={quote.name}>{quote.name} | {quote.eta} | {quote.fee}</p>
          ))}
        </div>
      </section>

      <section className="metrics-grid">
        {metrics.map((metric) => (
          <article key={metric.label} className="metric-card">
            <p>{metric.label}</p>
            <strong>{metric.value}</strong>
            <span>{metric.delta}</span>
          </article>
        ))}
      </section>

      <section className="owner-layout">
        <div>
          <div className="section-header">
            <div>
              <p className="eyebrow">ERP order board</p>
              <h2>Orders, prep status, cut specs, and delivery vendor assignment</h2>
            </div>
          </div>
          <div className="order-board">
            {orders.map((order: any) => (
              <article key={order.id} className="order-card">
                <div className="order-topline">
                  <strong>{order.order_number ?? order.id}</strong>
                  <span className={`prep-pill ${String(order.status).replace(/_/g, '-')}`}>{String(order.status).replace(/_/g, ' ')}</span>
                </div>
                <h3>{order.customer ?? 'Customer order'}</h3>
                <p>{order.itemSummary ?? 'DB-backed order'}</p>
                <p>{order.schedule ?? order.scheduled_for ?? 'Immediate order'}</p>
                <p>{order.cutSpec ?? 'Custom notes available in order items'}</p>
                <p>{order.deliveryVendor ?? order.delivery_vendor ?? 'Store Fleet'}</p>
                <strong>{order.amount ?? `INR ${order.total_amount ?? 0}`}</strong>
              </article>
            ))}
          </div>
        </div>
        <aside className="owner-sidebar">
          <section>
            <p className="eyebrow">Support and billing</p>
            <h3>Tickets</h3>
            <div className="ticket-list">
              {tickets.map((ticket) => (
                <div key={ticket.id} className="ticket-row">
                  <strong>{ticket.subject}</strong>
                  <span>{ticket.priority} priority | {ticket.status}</span>
                </div>
              ))}
            </div>
          </section>
          <section>
            <p className="eyebrow">Plans</p>
            <h3>Subscription tiers</h3>
            <div className="plan-stack">
              {plans.map((plan) => (
                <div key={plan.name} className="plan-card">
                  <strong>{plan.name}</strong>
                  <span>{plan.price}</span>
                  <p>{plan.seats}</p>
                </div>
              ))}
            </div>
          </section>
        </aside>
      </section>
    </main>
  );
}
