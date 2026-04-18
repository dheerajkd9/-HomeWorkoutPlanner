import Link from 'next/link';
import { categories, getAreaOptions } from '../lib/data';
import { categoryLabels, normalizeLang, uiCopy } from '../lib/ui-copy';

type Props = {
  activeCategorySlug: string;
  currentPath: string;
  selectedArea: string;
  selectedLang?: string;
};

function buildQuery(selectedArea: string, lang: 'en' | 'te') {
  const params = new URLSearchParams();
  if (selectedArea && selectedArea !== 'All Hyderabad') {
    params.set('area', selectedArea);
  }
  if (lang !== 'en') {
    params.set('lang', lang);
  }
  const query = params.toString();
  return query ? `?${query}` : '';
}

export function MarketShell({ children, activeCategorySlug, currentPath, selectedArea, selectedLang }: Props & { children: React.ReactNode }) {
  const lang = normalizeLang(selectedLang);
  const copy = uiCopy[lang];
  const areas = getAreaOptions();
  const sharedQuery = buildQuery(selectedArea, lang);

  return (
    <div className="page-shell">
      <div className="sticky-shell">
        <div className="utility-bar">
          {copy.utility.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
        <header className="top-header top-header-wide">
          <Link href={`/${sharedQuery}`} className="brand-mark" aria-label="Hyderabad Meat Marketplace">
            {copy.brand}
          </Link>
          <form action={currentPath} className="location-form">
            <input type="hidden" name="lang" value={lang} />
            <label className="location-label">{copy.locationLabel}</label>
            <div className="location-controls">
              <select name="area" defaultValue={selectedArea} className="location-select">
                {areas.map((area) => (
                  <option key={area.name} value={area.name}>{area.name}</option>
                ))}
              </select>
              <button className="action-button" type="submit">{copy.updateArea}</button>
            </div>
          </form>
          <div className="top-actions top-actions-wide">
            <input className="search-input" placeholder={copy.searchPlaceholder} />
            <div className="lang-toggle" aria-label="Language switcher">
              <Link href={`${currentPath}${buildQuery(selectedArea, 'en')}`} className={lang === 'en' ? 'lang-chip active' : 'lang-chip'}>EN</Link>
              <Link href={`${currentPath}${buildQuery(selectedArea, 'te')}`} className={lang === 'te' ? 'lang-chip active' : 'lang-chip'}>{uiCopy.te.languageNative}</Link>
            </div>
            <Link href="/login/customer" className="header-link">{copy.customerLogin}</Link>
            <Link href="/login/store" className="header-link">{copy.storeLogin}</Link>
          </div>
        </header>
        <nav className="category-nav" aria-label="Product categories">
          {categories.map((item) => {
            const hrefBase = item.slug === 'chicken' ? '/' : `/category/${item.slug}`;
            return (
              <Link
                key={item.slug}
                href={`${hrefBase}${buildQuery(selectedArea, lang)}`}
                className={item.slug === activeCategorySlug ? 'category-chip active' : 'category-chip'}
              >
                <span aria-hidden="true">{item.icon}</span>
                <span>{categoryLabels[lang][item.slug] ?? item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
      {children}
    </div>
  );
}