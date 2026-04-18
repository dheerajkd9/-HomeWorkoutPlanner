import Link from 'next/link';
import type { ReactNode } from 'react';

const navItems = ['Eid Specials', 'Chicken', 'Lamb & Goat', 'Fish & Seafood', 'Ready to Cook', 'Eggs', 'Spreads & Pickles', 'Cold Cuts', 'Exotic'];

export function MarketShell({ children }: { children: ReactNode }) {
  return (
    <div className="page-shell">
      <div className="utility-bar">
        <span>Download App</span>
        <span>FSSC 22000 Certification</span>
        <span>About Us</span>
        <span>We are hiring</span>
        <span>1800-4190-786</span>
      </div>
      <header className="top-header">
        <Link href="/" className="brand-mark" aria-label="Hyderabad Meat Marketplace">logo</Link>
        <div className="availability-pill">Showing availability for HITEC City, Hyderabad</div>
        <div className="top-actions">
          <input className="search-input" placeholder="Search meat, fish, pickles" />
          <button className="action-button">Cart</button>
        </div>
      </header>
      <nav className="category-nav" aria-label="Product categories">
        {navItems.map((item) => (
          <button key={item} className={item === 'Chicken' ? 'category-chip active' : 'category-chip'}>{item}</button>
        ))}
      </nav>
      {children}
    </div>
  );
}
