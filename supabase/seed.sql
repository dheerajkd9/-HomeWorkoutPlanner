insert into public.categories (name, slug, sort_order)
values
  ('Eid Specials', 'specials', 1),
  ('Chicken', 'chicken', 2),
  ('Lamb and Goat', 'lamb-goat', 3),
  ('Fish and Seafood', 'fish-seafood', 4),
  ('Ready to Cook', 'ready-to-cook', 5),
  ('Eggs', 'eggs', 6),
  ('Spreads and Pickles', 'spreads-pickles', 7),
  ('Cold Cuts', 'cold-cuts', 8)
on conflict (slug) do nothing;
