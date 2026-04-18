import { getCategoryBySlug } from '../lib/data';
import { icons } from '../lib/ui-icons';
import { categoryLabels, normalizeLang, uiCopy } from '../lib/ui-copy';

export function FiltersSidebar({ categorySlug, selectedLang }: { categorySlug: string; selectedLang?: string }) {
  const category = getCategoryBySlug(categorySlug);
  const lang = normalizeLang(selectedLang);
  const copy = uiCopy[lang];
  const groups = [
    { icon: icons.time, title: copy.filters.timings, items: ['Before 6 am', '6 am to 12 pm', '12 pm to 6 pm', 'After 6 pm'] },
    { icon: category?.icon ?? icons.store, title: `${categoryLabels[lang][categorySlug] ?? category?.name ?? 'Category'} ${copy.filters.category.replace('Category ', '').replace('\u0c15\u0c47\u0c1f\u0c17\u0c3f\u0c30\u0c40 ', '')}`.trim(), items: ['Best rated', 'Lowest price', 'Bulk order ready', 'Scheduled delivery'] },
    { icon: icons.delivery, title: copy.filters.delivery, items: ['Store fleet', 'Swiggy Genie', 'Porter', 'Pickup'] },
    { icon: icons.cuts, title: copy.filters.cuts, items: ['Curry cut', 'Boneless', 'Ready to cook', 'Custom notes'] },
  ];

  return (
    <aside className="filters-panel">
      {groups.map((group) => (
        <section key={group.title} className="filter-group">
          <h3>
            <span aria-hidden="true">{group.icon}</span>
            <span>{group.title}</span>
          </h3>
          <div className="filter-list">
            {group.items.map((item, index) => (
              <label key={item} className={index === 0 ? 'filter-item active' : 'filter-item'}>
                <input type="checkbox" defaultChecked={index === 0} />
                <span>{item}</span>
              </label>
            ))}
          </div>
        </section>
      ))}
    </aside>
  );
}