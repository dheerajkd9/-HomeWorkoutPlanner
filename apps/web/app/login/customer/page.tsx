export default function CustomerLoginPage({ searchParams }: { searchParams?: { error?: string; welcome?: string; demoAuth?: string } }) {
  return (
    <main className="auth-page">
      <section className="auth-card">
        <p className="eyebrow">Customer auth</p>
        <h1>Register or sign in to place orders, manage delivery vendors, and track purchase history.</h1>
        {searchParams?.error ? <p className="auth-error">{searchParams.error}</p> : null}
        {searchParams?.welcome ? <p className="auth-success">Account created. Check your email if confirmation is enabled.</p> : null}
        {searchParams?.demoAuth ? <p className="auth-note">Supabase auth is not configured yet, so the app redirected in demo mode.</p> : null}
        <div className="auth-grid">
          <form action="/api/auth/login" method="post" className="auth-form">
            <input type="hidden" name="redirectTo" value="/customer" />
            <h2>Sign in</h2>
            <input name="email" type="email" placeholder="Email" required />
            <input name="password" type="password" placeholder="Password" required />
            <button className="primary-link" type="submit">Sign in as customer</button>
          </form>
          <form action="/api/auth/register" method="post" className="auth-form">
            <input type="hidden" name="role" value="customer" />
            <input type="hidden" name="redirectTo" value="/customer" />
            <h2>Create account</h2>
            <input name="fullName" placeholder="Full name" required />
            <input name="email" type="email" placeholder="Email" required />
            <input name="password" type="password" placeholder="Password" required />
            <button className="secondary-link" type="submit">Register customer</button>
          </form>
        </div>
      </section>
    </main>
  );
}
