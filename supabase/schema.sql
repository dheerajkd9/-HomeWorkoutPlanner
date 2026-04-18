create extension if not exists "uuid-ossp";

create table if not exists users (
  id uuid primary key default uuid_generate_v4(),
  email varchar(255) unique not null,
  phone varchar(20),
  full_name varchar(120) not null,
  role varchar(30) not null check (role in ('platform_admin', 'store_owner', 'store_manager', 'customer')),
  created_at timestamptz not null default now()
);

create table if not exists organizations (
  id uuid primary key default uuid_generate_v4(),
  name varchar(150) not null,
  owner_user_id uuid not null references users(id),
  subscription_status varchar(30) not null default 'trial',
  created_at timestamptz not null default now()
);

create table if not exists stores (
  id uuid primary key default uuid_generate_v4(),
  organization_id uuid not null references organizations(id),
  name varchar(150) not null,
  slug varchar(160) unique not null,
  description text,
  city varchar(80) not null default 'Hyderabad',
  area varchar(120),
  address_line text,
  latitude numeric(9, 6),
  longitude numeric(9, 6),
  phone varchar(20),
  is_active boolean not null default true,
  avg_rating numeric(2, 1) not null default 0,
  total_reviews integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists categories (
  id uuid primary key default uuid_generate_v4(),
  name varchar(80) unique not null,
  sort_order integer not null default 0
);

create table if not exists products (
  id uuid primary key default uuid_generate_v4(),
  category_id uuid not null references categories(id),
  name varchar(120) not null,
  unit varchar(20) not null default 'kg',
  is_bulk_supported boolean not null default false,
  is_active boolean not null default true
);

create table if not exists price_snapshots (
  id uuid primary key default uuid_generate_v4(),
  store_id uuid not null references stores(id) on delete cascade,
  product_id uuid not null references products(id),
  price_per_unit numeric(10, 2) not null,
  effective_date date not null default current_date,
  source varchar(30) not null default 'owner_update',
  created_at timestamptz not null default now(),
  unique (store_id, product_id, effective_date)
);

create table if not exists cut_options (
  id uuid primary key default uuid_generate_v4(),
  product_id uuid not null references products(id) on delete cascade,
  label varchar(80) not null,
  notes text
);

create table if not exists orders (
  id uuid primary key default uuid_generate_v4(),
  order_number varchar(40) unique not null,
  user_id uuid not null references users(id),
  store_id uuid not null references stores(id),
  fulfillment_type varchar(20) not null check (fulfillment_type in ('delivery', 'pickup')),
  scheduled_for timestamptz,
  status varchar(30) not null default 'placed',
  subtotal numeric(10, 2) not null,
  total_amount numeric(10, 2) not null,
  customer_note text,
  created_at timestamptz not null default now()
);

create table if not exists subscriptions (
  id uuid primary key default uuid_generate_v4(),
  organization_id uuid not null references organizations(id),
  stripe_customer_id varchar(120),
  stripe_subscription_id varchar(120),
  plan_code varchar(40) not null,
  status varchar(30) not null,
  current_period_end timestamptz,
  created_at timestamptz not null default now()
);
