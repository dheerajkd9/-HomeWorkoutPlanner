export default function StoreLoginPage({ searchParams }: { searchParams?: { error?: string; welcome?: string; demoAuth?: string } }) {
  return (
    <main className="auth-page">
      <section className="auth-card">
        <p className="eyebrow">Store owner auth</p>
        <h1>Sign in or onboard your store to manage pricing, inventory, orders, teams, and Stripe subscriptions.</h1>
        {searchParams?.error ? <p className="auth-error">{searchParams.error}</p> : null}
        {searchParams?.welcome ? <p className="auth-success">Store owner account created. Finish onboarding after email verification.</p> : null}
        {searchParams?.demoAuth ? <p className="auth-note">Supabase auth is not configured yet, so the app redirected in demo mode.</p> : null}
        <div className="auth-grid">
          <form action="/api/auth/login" method="post" className="auth-form">
            <input type="hidden" name="redirectTo" value="/owner" />
            <h2>Sign in</h2>
            <input name="email" type="email" placeholder="Business email" required />
            <input name="password" type="password" placeholder="Password" required />
            <button className="primary-link" type="submit">Sign in as store owner</button>
          </form>
          <form action="/api/auth/register" method="post" className="auth-form">
            <input type="hidden" name="role" value="store_owner" />
            <input type="hidden" name="redirectTo" value="/owner" />
            <h2>Create store owner account</h2>
            <input name="fullName" placeholder="Owner full name" required />
            <input name="email" type="email" placeholder="Business email" required />
            <input name="password" type="password" placeholder="Password" required />
            <button className="secondary-link" type="submit">Register store owner</button>
          </form>
        </div>
      </section>
    </main>
  );
}
