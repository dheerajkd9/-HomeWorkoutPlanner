import { stores, storeDetails } from '../data';
import { createSupabaseAdminClient } from '../supabase/admin';

type OrderInsert = {
  customerUserId: string;
  storeId: string;
  branchId?: string | null;
  fulfillmentType: 'delivery' | 'pickup';
  scheduledFor?: string | null;
  customerNote?: string | null;
  deliveryVendor?: string | null;
  deliveryAddressText?: string | null;
  items: Array<{
    productId: string;
    quantity: number;
    unitPrice: number;
    cutOptionId?: string | null;
    instruction?: string | null;
  }>;
};

type InventoryUpdate = {
  branchId: string;
  productId: string;
  stockStatus: 'in_stock' | 'limited' | 'sold_out';
  availableQuantity?: number | null;
  updatedBy: string;
};

type PriceUpdate = {
  branchId: string;
  productId: string;
  pricePerUnit: number;
  updatedBy: string;
  source?: string;
};

function calculateTotal(items: OrderInsert['items']) {
  return items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
}

export async function listStores(category?: string, area?: string) {
  const supabase = createSupabaseAdminClient();
  if (!supabase) {
    return stores.filter((store) => (!area || area === 'All Hyderabad' || store.area === area) && (!category || store.prices.some((price) => price.categorySlug === category)));
  }

  let query = supabase
    .from('store_market_view')
    .select('*')
    .order('avg_rating', { ascending: false })
    .limit(100);

  if (area && area !== 'All Hyderabad') query = query.eq('area', area);
  if (category) query = query.eq('category_slug', category);

  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
}

export async function getStore(slug: string) {
  const supabase = createSupabaseAdminClient();
  if (!supabase) {
    return storeDetails.find((store) => store.slug === slug) ?? null;
  }

  const { data, error } = await supabase.from('store_detail_view').select('*').eq('slug', slug).maybeSingle();
  if (error) throw error;
  return data;
}

export async function createOrder(input: OrderInsert) {
  const supabase = createSupabaseAdminClient();
  if (!supabase) {
    return {
      id: `mock-${Date.now()}`,
      order_number: `ORD-${Date.now()}`,
      status: 'placed',
      total_amount: calculateTotal(input.items),
      delivery_vendor: input.deliveryVendor ?? 'Store Fleet',
    };
  }

  const totalAmount = calculateTotal(input.items);
  const orderNumber = `ORD-${Date.now()}`;

  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      order_number: orderNumber,
      customer_user_id: input.customerUserId,
      store_id: input.storeId,
      branch_id: input.branchId ?? null,
      fulfillment_type: input.fulfillmentType,
      scheduled_for: input.scheduledFor ?? null,
      status: 'placed',
      subtotal: totalAmount,
      total_amount: totalAmount,
      customer_note: input.customerNote ?? null,
      delivery_vendor: input.deliveryVendor ?? null,
      delivery_address_text: input.deliveryAddressText ?? null,
    })
    .select('*')
    .single();

  if (orderError) throw orderError;

  const itemsPayload = input.items.map((item) => ({
    order_id: order.id,
    product_id: item.productId,
    cut_option_id: item.cutOptionId ?? null,
    quantity: item.quantity,
    unit_price: item.unitPrice,
    total_price: item.quantity * item.unitPrice,
    instruction: item.instruction ?? null,
  }));

  const { error: itemsError } = await supabase.from('order_items').insert(itemsPayload);
  if (itemsError) throw itemsError;

  return order;
}

export async function listOrders(scope: { customerUserId?: string; storeId?: string }) {
  const supabase = createSupabaseAdminClient();
  if (!supabase) {
    return [];
  }

  let query = supabase.from('orders').select('*, order_items(*)').order('created_at', { ascending: false }).limit(100);
  if (scope.customerUserId) query = query.eq('customer_user_id', scope.customerUserId);
  if (scope.storeId) query = query.eq('store_id', scope.storeId);

  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
}

export async function updateOrderStatus(orderId: string, status: string, actorUserId: string) {
  const supabase = createSupabaseAdminClient();
  if (!supabase) {
    return { id: orderId, status, updated_by: actorUserId };
  }

  const { data, error } = await supabase
    .from('orders')
    .update({ status, updated_by: actorUserId, updated_at: new Date().toISOString() })
    .eq('id', orderId)
    .select('*')
    .single();
  if (error) throw error;
  return data;
}

export async function upsertInventory(input: InventoryUpdate) {
  const supabase = createSupabaseAdminClient();
  if (!supabase) {
    return input;
  }

  const { data, error } = await supabase
    .from('inventory_snapshots')
    .upsert({
      branch_id: input.branchId,
      product_id: input.productId,
      stock_status: input.stockStatus,
      available_quantity: input.availableQuantity ?? null,
      effective_date: new Date().toISOString().slice(0, 10),
      updated_by: input.updatedBy,
    }, { onConflict: 'branch_id,product_id,effective_date' })
    .select('*')
    .single();

  if (error) throw error;
  return data;
}

export async function upsertPrice(input: PriceUpdate) {
  const supabase = createSupabaseAdminClient();
  if (!supabase) {
    return input;
  }

  const { data, error } = await supabase
    .from('price_snapshots')
    .upsert({
      branch_id: input.branchId,
      product_id: input.productId,
      price_per_unit: input.pricePerUnit,
      effective_date: new Date().toISOString().slice(0, 10),
      updated_by: input.updatedBy,
      source: input.source ?? 'owner_update',
    }, { onConflict: 'branch_id,product_id,effective_date' })
    .select('*')
    .single();

  if (error) throw error;
  return data;
}
