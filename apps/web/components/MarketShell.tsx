import Link from 'next/link';
import { categories } from '../lib/data';

type Props = {
  activeCategorySlug: string;
  currentPath: string;
  selectedArea: string;
};

export function MarketShell({ children, activeCategorySlug, currentPath, selectedArea }: Props & { children: React.ReactNode }) {
  const areaQuery = selectedArea && selectedArea !== 'All Hyderabad' ? `?area=${encodeURIComponent(selectedArea)}` : '';

  return (
    <div className="page-shell">
      <div className="utility-bar">
        <span>Download App</span>
        <span>FSSC 22000 Certification</span>
        <span>Store ERP</span>
        <span>Bulk orders</span>
        <span>1800-4190-786</span>
      </div>
      <header className="top-header top-header-wide">
        <Link href="/" className="brand-mark" aria-label="Hyderabad Meat Marketplace">
          logo
        </Link>
        <form action={currentPath} className="location-form">
          <label className="location-label">Find stores by Hyderabad area</label>
          <div className="location-controls">
            <select name="area" defaultValue={selectedArea} className="location-select">
              <option>All Hyderabad</option>
              <option>HITEC City</option>
              <option>Madhapur</option>
              <option>Gachibowli</option>
              <option>Kondapur</option>
              <option>Jubilee Hills</option>
              <option>Banjara Hills</option>
              <option>Mehdipatnam</option>
              <option>Kukatpally</option>
              <option>Secunderabad</option>
              <option>Dilsukhnagar</option>
            </select>
            <button className="action-button" type="submit">Update area</button>
          </div>
        </form>
        <div className="top-actions top-actions-wide">
          <input className="search-input" placeholder="Search stores, cuts, vendors" />
          <Link href="/login/customer" className="header-link">Customer Login</Link>
          <Link href="/login/store" className="header-link">Store Login</Link>
        </div>
      </header>
      <nav className="category-nav" aria-label="Product categories">
        {categories.map((item) => (
          <Link
            key={item.slug}
            href={item.slug === 'chicken' ? `/${areaQuery}` : `/category/${item.slug}${areaQuery}`}
            className={item.slug === activeCategorySlug ? 'category-chip active' : 'category-chip'}
          >
            {item.name}
          </Link>
        ))}
      </nav>
      {children}
    </div>
  );
}
