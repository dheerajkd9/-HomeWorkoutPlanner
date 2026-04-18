import { getCategoryBySlug } from '../lib/data';

export function FiltersSidebar({ categorySlug }: { categorySlug: string }) {
  const category = getCategoryBySlug(categorySlug);
  const groups = [
    { title: 'Shop timings', items: ['Before 6 am', '6 am to 12 pm', '12 pm to 6 pm', 'After 6 pm'] },
    { title: `${category?.name ?? 'Category'} filters`, items: ['Best rated', 'Lowest price', 'Bulk order ready', 'Scheduled delivery'] },
    { title: 'Delivery options', items: ['Store fleet', 'Swiggy Genie', 'Porter', 'Pickup'] },
    { title: 'Cuts and prep', items: ['Curry cut', 'Boneless', 'Ready to cook', 'Custom notes'] },
  ];

  return (
    <aside className="filters-panel">
      {groups.map((group) => (
        <section key={group.title} className="filter-group">
          <h3>{group.title}</h3>
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
