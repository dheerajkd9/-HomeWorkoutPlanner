create extension if not exists "uuid-ossp";

create type public.app_role as enum ('platform_admin', 'store_owner', 'store_manager', 'customer');
create type public.subscription_status as enum ('trial', 'active', 'past_due', 'cancelled');
create type public.stock_status as enum ('in_stock', 'limited', 'sold_out');
create type public.order_status as enum ('placed', 'received', 'accepted', 'preparing', 'ready', 'out_for_delivery', 'completed', 'cancelled');
create type public.fulfillment_type as enum ('delivery', 'pickup');
create type public.ticket_priority as enum ('low', 'medium', 'high');
create type public.ticket_status as enum ('open', 'pending', 'resolved');

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email varchar(255) unique,
  phone varchar(20),
  full_name varchar(120) not null,
  default_role public.app_role not null default 'customer',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.organizations (
  id uuid primary key default uuid_generate_v4(),
  name varchar(150) not null,
  city varchar(80) not null default 'Hyderabad',
  subscription_status public.subscription_status not null default 'trial',
  owner_user_id uuid not null references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.organization_memberships (
  id uuid primary key default uuid_generate_v4(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  role public.app_role not null,
  created_at timestamptz not null default now(),
  unique (organization_id, user_id)
);

create table if not exists public.stores (
  id uuid primary key default uuid_generate_v4(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  name varchar(150) not null,
  slug varchar(160) unique not null,
  description text,
  city varchar(80) not null default 'Hyderabad',
  area varchar(120),
  address_line text,
  latitude numeric(9, 6),
  longitude numeric(9, 6),
  phone varchar(20),
  avg_rating numeric(2, 1) not null default 0,
  total_reviews integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.store_branches (
  id uuid primary key default uuid_generate_v4(),
  store_id uuid not null references public.stores(id) on delete cascade,
  name varchar(150) not null,
  area varchar(120) not null,
  address_line text,
  service_radius_km numeric(5, 2) not null default 8,
  accepts_delivery boolean not null default true,
  accepts_pickup boolean not null default true,
  opens_at time,
  closes_at time,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.store_hours (
  id uuid primary key default uuid_generate_v4(),
  branch_id uuid not null references public.store_branches(id) on delete cascade,
  day_of_week integer not null check (day_of_week between 0 and 6),
  open_time time,
  close_time time,
  is_closed boolean not null default false,
  unique (branch_id, day_of_week)
);

create table if not exists public.categories (
  id uuid primary key default uuid_generate_v4(),
  name varchar(80) unique not null,
  slug varchar(80) unique not null,
  sort_order integer not null default 0
);

create table if not exists public.products (
  id uuid primary key default uuid_generate_v4(),
  category_id uuid not null references public.categories(id),
  name varchar(120) not null,
  unit varchar(20) not null default 'kg',
  is_bulk_supported boolean not null default false,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.branch_products (
  id uuid primary key default uuid_generate_v4(),
  branch_id uuid not null references public.store_branches(id) on delete cascade,
  product_id uuid not null references public.products(id),
  display_name varchar(120),
  sku varchar(80),
  supports_schedule boolean not null default true,
  is_available boolean not null default true,
  unique (branch_id, product_id)
);

create table if not exists public.cut_options (
  id uuid primary key default uuid_generate_v4(),
  branch_product_id uuid not null references public.branch_products(id) on delete cascade,
  label varchar(80) not null,
  notes text,
  extra_charge numeric(10, 2) not null default 0
);

create table if not exists public.price_snapshots (
  id uuid primary key default uuid_generate_v4(),
  branch_id uuid not null references public.store_branches(id) on delete cascade,
  product_id uuid not null references public.products(id),
  price_per_unit numeric(10, 2) not null,
  effective_date date not null default current_date,
  source varchar(30) not null default 'owner_update',
  updated_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  unique (branch_id, product_id, effective_date)
);

create table if not exists public.inventory_snapshots (
  id uuid primary key default uuid_generate_v4(),
  branch_id uuid not null references public.store_branches(id) on delete cascade,
  product_id uuid not null references public.products(id),
  stock_status public.stock_status not null,
  available_quantity numeric(10, 2),
  effective_date date not null default current_date,
  updated_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  unique (branch_id, product_id, effective_date)
);

create table if not exists public.addresses (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  label varchar(80) not null,
  address_line text not null,
  area varchar(120) not null,
  city varchar(80) not null default 'Hyderabad',
  latitude numeric(9, 6),
  longitude numeric(9, 6),
  created_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default uuid_generate_v4(),
  order_number varchar(40) unique not null,
  customer_user_id uuid not null references public.profiles(id),
  store_id uuid not null references public.stores(id),
  branch_id uuid references public.store_branches(id),
  address_id uuid references public.addresses(id),
  fulfillment_type public.fulfillment_type not null,
  scheduled_for timestamptz,
  status public.order_status not null default 'placed',
  subtotal numeric(10, 2) not null,
  total_amount numeric(10, 2) not null,
  customer_note text,
  delivery_vendor varchar(80),
  delivery_address_text text,
  updated_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.order_items (
  id uuid primary key default uuid_generate_v4(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid not null references public.products(id),
  cut_option_id uuid references public.cut_options(id),
  quantity numeric(10, 2) not null,
  unit_price numeric(10, 2) not null,
  total_price numeric(10, 2) not null,
  instruction text
);

create table if not exists public.bulk_order_requests (
  id uuid primary key default uuid_generate_v4(),
  store_id uuid not null references public.stores(id),
  customer_user_id uuid not null references public.profiles(id),
  event_date timestamptz,
  guest_count integer,
  status varchar(40) not null default 'submitted',
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists public.reviews (
  id uuid primary key default uuid_generate_v4(),
  order_id uuid references public.orders(id),
  store_id uuid not null references public.stores(id) on delete cascade,
  user_id uuid references public.profiles(id),
  rating integer not null check (rating between 1 and 5),
  review_text text,
  created_at timestamptz not null default now()
);

create table if not exists public.tickets (
  id uuid primary key default uuid_generate_v4(),
  organization_id uuid references public.organizations(id),
  store_id uuid references public.stores(id),
  user_id uuid references public.profiles(id),
  subject varchar(160) not null,
  status public.ticket_status not null default 'open',
  priority public.ticket_priority not null default 'medium',
  body text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.subscriptions (
  id uuid primary key default uuid_generate_v4(),
  organization_id uuid not null unique references public.organizations(id) on delete cascade,
  stripe_customer_id varchar(120),
  stripe_subscription_id varchar(120),
  plan_code varchar(80) not null,
  status public.subscription_status not null default 'trial',
  current_period_end timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.delivery_integrations (
  id uuid primary key default uuid_generate_v4(),
  store_id uuid not null references public.stores(id) on delete cascade,
  vendor_name varchar(80) not null,
  external_store_ref varchar(120),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  unique (store_id, vendor_name)
);

create table if not exists public.delivery_quote_logs (
  id uuid primary key default uuid_generate_v4(),
  store_id uuid references public.stores(id),
  area varchar(120),
  vendor_name varchar(80),
  request_payload jsonb,
  response_payload jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.external_feed_cache (
  id uuid primary key default uuid_generate_v4(),
  provider varchar(80) not null,
  area varchar(120),
  category_slug varchar(80),
  payload jsonb not null,
  fetched_at timestamptz not null default now(),
  unique (provider, area, category_slug)
);

alter table public.profiles enable row level security;
alter table public.organizations enable row level security;
alter table public.organization_memberships enable row level security;
alter table public.stores enable row level security;
alter table public.store_branches enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.addresses enable row level security;
alter table public.tickets enable row level security;

create policy if not exists "profiles_self" on public.profiles for select using (auth.uid() = id);
create policy if not exists "addresses_self" on public.addresses for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy if not exists "orders_customer_read" on public.orders for select using (auth.uid() = customer_user_id);
create policy if not exists "tickets_user_read" on public.tickets for select using (auth.uid() = user_id);
create policy if not exists "stores_public_read" on public.stores for select using (is_active = true);
create policy if not exists "branches_public_read" on public.store_branches for select using (is_active = true);
