import Link from 'next/link';

export default function CustomerLoginPage() {
  return (
    <main className="auth-page">
      <section className="auth-card">
        <p className="eyebrow">Customer login</p>
        <h1>Sign in to manage orders, saved stores, delivery vendors, and subscriptions.</h1>
        <div className="auth-form">
          <input placeholder="Mobile number or email" />
          <input placeholder="Password or OTP" />
          <Link href="/customer" className="primary-link">Continue to customer dashboard</Link>
          <p className="auth-note">Mock login flow for MVP UI. Connect Supabase Auth or Clerk next.</p>
        </div>
      </section>
    </main>
  );
}
