-- Run this in Supabase SQL editor
create extension if not exists pgcrypto;

create table customers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  name text,
  phone text,
  address text,
  created_at timestamptz default now()
);

create table products (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  title text,
  price numeric(12,2) default 0,
  created_at timestamptz default now()
);

create table sales (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  customer_id uuid references customers(id) on delete set null,
  total_amount numeric(12,2) not null,
  created_at timestamptz default now()
);

create table sale_items (
  id uuid primary key default gen_random_uuid(),
  sale_id uuid references sales(id) on delete cascade,
  product_id uuid references products(id),
  qty integer default 1,
  unit_price numeric(12,2) not null
);

-- RLS policies (example)
alter table customers enable row level security;
create policy "owner" on customers for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

alter table products enable row level security;
create policy "owner" on products for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

alter table sales enable row level security;
create policy "owner" on sales for all using (auth.uid() = user_id) with check (auth.uid() = user_id);