import Link from 'next/link';

export default function StoreLoginPage() {
  return (
    <main className="auth-page">
      <section className="auth-card">
        <p className="eyebrow">Store owner login</p>
        <h1>Enter your store ERP to update prices, manage inventory, prep orders, billing, and tickets.</h1>
        <div className="auth-form">
          <input placeholder="Business email or mobile" />
          <input placeholder="Password or magic link code" />
          <Link href="/owner" className="primary-link">Continue to store ERP</Link>
          <p className="auth-note">This is the UI flow now. Wire real auth and role checks in the next backend pass.</p>
        </div>
      </section>
    </main>
  );
}
