const filterGroups = [
  { title: 'Shop Timings', items: ['Before 6 am', '6 am to 12 pm', '12 pm to 6 pm', 'After 6 pm'], activeIndex: 1 },
  { title: 'Chicken Type', items: ['Country chicken', 'Poultry chicken', 'Full Bird'], activeIndex: 0 },
  { title: 'Ratings', items: ['5', '4+', '3+', '2'], activeIndex: 1 },
];

export function FiltersSidebar() {
  return (
    <aside className="filters-panel">
      {filterGroups.map((group) => (
        <section key={group.title} className="filter-group">
          <h3>{group.title}</h3>
          <div className="filter-list">
            {group.items.map((item, index) => (
              <label key={item} className={index === group.activeIndex ? 'filter-item active' : 'filter-item'}>
                <input type="checkbox" defaultChecked={index === group.activeIndex} />
                <span>{item}</span>
              </label>
            ))}
          </div>
        </section>
      ))}
    </aside>
  );
}
