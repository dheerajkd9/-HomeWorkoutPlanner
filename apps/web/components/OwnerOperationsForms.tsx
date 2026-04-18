'use client';

import { useState } from 'react';

type OwnerFormsProps = {
  ownerUserId: string;
  products: Array<{ id: string; name: string; unit: string }>;
};

export function OwnerOperationsForms({ ownerUserId, products }: OwnerFormsProps) {
  const [storeId, setStoreId] = useState('');
  const [branchId, setBranchId] = useState('');
  const [messages, setMessages] = useState<string[]>([]);

  async function submitJson(url: string, body: unknown) {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(data?.message ?? data?.error ?? `Request failed: ${response.status}`);
    }
    return data;
  }

  async function handleOnboarding(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    try {
      const result = await submitJson('/api/owner/onboard', {
        ownerUserId,
        organizationName: form.get('organizationName'),
        storeName: form.get('storeName'),
        slug: form.get('slug'),
        area: form.get('area'),
        addressLine: form.get('addressLine'),
        phone: form.get('phone'),
        description: form.get('description'),
      });
      setStoreId(result.store.id);
      setMessages((prev) => [`Store created: ${result.store.name}`, ...prev]);
      event.currentTarget.reset();
    } catch (error) {
      setMessages((prev) => [`Onboarding failed: ${(error as Error).message}`, ...prev]);
    }
  }

  async function handleBranch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    try {
      const result = await submitJson('/api/owner/branches', {
        storeId: form.get('storeId') || storeId,
        name: form.get('name'),
        area: form.get('area'),
        addressLine: form.get('addressLine'),
        serviceRadiusKm: Number(form.get('serviceRadiusKm') || 8),
        acceptsDelivery: form.get('acceptsDelivery') === 'on',
        acceptsPickup: form.get('acceptsPickup') === 'on',
      });
      setBranchId(result.id);
      setMessages((prev) => [`Branch created: ${result.name}`, ...prev]);
      event.currentTarget.reset();
    } catch (error) {
      setMessages((prev) => [`Branch create failed: ${(error as Error).message}`, ...prev]);
    }
  }

  async function handlePrice(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    try {
      await submitJson('/api/prices', {
        branchId: form.get('branchId') || branchId,
        productId: form.get('productId'),
        pricePerUnit: Number(form.get('pricePerUnit')),
        updatedBy: ownerUserId,
        source: 'owner_portal',
      });
      setMessages((prev) => ['Price updated successfully', ...prev]);
    } catch (error) {
      setMessages((prev) => [`Price update failed: ${(error as Error).message}`, ...prev]);
    }
  }

  async function handleInventory(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    try {
      await submitJson('/api/inventory', {
        branchId: form.get('branchId') || branchId,
        productId: form.get('productId'),
        stockStatus: form.get('stockStatus'),
        availableQuantity: Number(form.get('availableQuantity') || 0),
        updatedBy: ownerUserId,
      });
      setMessages((prev) => ['Inventory updated successfully', ...prev]);
    } catch (error) {
      setMessages((prev) => [`Inventory update failed: ${(error as Error).message}`, ...prev]);
    }
  }

  return (
    <section className="ops-grid">
      <form className="ops-card" onSubmit={handleOnboarding}>
        <p className="eyebrow">Step 1</p>
        <h3>Store onboarding</h3>
        <input name="organizationName" placeholder="Organization name" required />
        <input name="storeName" placeholder="Store name" required />
        <input name="slug" placeholder="store-slug" required />
        <input name="area" placeholder="Area" required />
        <input name="addressLine" placeholder="Store address" required />
        <input name="phone" placeholder="Phone" />
        <textarea name="description" placeholder="Short description" rows={3} />
        <button className="primary-link" type="submit">Create store</button>
      </form>

      <form className="ops-card" onSubmit={handleBranch}>
        <p className="eyebrow">Step 2</p>
        <h3>Create branch</h3>
        <input name="storeId" placeholder="Store ID" defaultValue={storeId} required />
        <input name="name" placeholder="Branch name" required />
        <input name="area" placeholder="Branch area" required />
        <input name="addressLine" placeholder="Branch address" required />
        <input name="serviceRadiusKm" type="number" step="0.5" placeholder="Service radius km" defaultValue={8} required />
        <label><input name="acceptsDelivery" type="checkbox" defaultChecked /> Delivery</label>
        <label><input name="acceptsPickup" type="checkbox" defaultChecked /> Pickup</label>
        <button className="secondary-link" type="submit">Create branch</button>
      </form>

      <form className="ops-card" onSubmit={handlePrice}>
        <p className="eyebrow">Step 3</p>
        <h3>Update daily price</h3>
        <input name="branchId" placeholder="Branch ID" defaultValue={branchId} required />
        <select name="productId" required>
          {products.map((product) => (
            <option key={product.id} value={product.id}>{product.name} ({product.unit})</option>
          ))}
        </select>
        <input name="pricePerUnit" type="number" step="0.01" placeholder="Price per unit" required />
        <button className="secondary-link" type="submit">Save price</button>
      </form>

      <form className="ops-card" onSubmit={handleInventory}>
        <p className="eyebrow">Step 4</p>
        <h3>Update inventory</h3>
        <input name="branchId" placeholder="Branch ID" defaultValue={branchId} required />
        <select name="productId" required>
          {products.map((product) => (
            <option key={product.id} value={product.id}>{product.name}</option>
          ))}
        </select>
        <select name="stockStatus" defaultValue="in_stock">
          <option value="in_stock">In stock</option>
          <option value="limited">Limited</option>
          <option value="sold_out">Sold out</option>
        </select>
        <input name="availableQuantity" type="number" step="0.01" placeholder="Available quantity" />
        <button className="secondary-link" type="submit">Save inventory</button>
      </form>

      <div className="ops-card ops-log">
        <p className="eyebrow">Activity log</p>
        <h3>Latest form responses</h3>
        {messages.length === 0 ? <p>No actions yet.</p> : messages.map((message) => <p key={message}>{message}</p>)}
      </div>
    </section>
  );
}
