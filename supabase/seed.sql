insert into categories (name, sort_order)
values
  ('Chicken', 1),
  ('Lamb & Goat', 2),
  ('Fish & Seafood', 3),
  ('Ready to Cook', 4),
  ('Eggs', 5),
  ('Spreads & Pickles', 6),
  ('Cold Cuts', 7),
  ('Exotic', 8)
on conflict (name) do nothing;
