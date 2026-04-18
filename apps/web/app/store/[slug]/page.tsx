import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getStoreBySlug } from '../../../lib/data';
import { MarketShell } from '../../../components/MarketShell';

export default function StorePage({ params }: { params: { slug: string } }) {
  const store = getStoreBySlug(params.slug);

  if (!store) notFound();

  return (
    <MarketShell>
      <main className="detail-page">
        <section className="detail-hero">
          <div>
            <p className="eyebrow">{store.area}</p>
            <h1>{store.name}</h1>
            <p className="detail-copy">{store.description}</p>
            <div className="hero-facts">
              <span>Rating {store.rating.toFixed(1)}</span>
              <span>INR {store.todayPrice} today</span>
              <span>{store.eta}</span>
            </div>
          </div>
          <div className="hero-sidecard">
            <p className="mini-label">Delivery windows</p>
            {store.deliveryWindows.map((window) => (
              <strong key={window}>{window}</strong>
            ))}
          </div>
        </section>

        <section className="detail-grid">
          <div>
            <div className="section-header">
              <div>
                <p className="eyebrow">Products</p>
                <h2>Order with exact cutting instructions</h2>
              </div>
              <Link href={store.mapUrl} target="_blank" className="secondary-link">
                Open maps
              </Link>
            </div>
            <div className="product-list">
              {store.products.map((product) => (
                <article key={product.id} className="product-row">
                  <div>
                    <h3>{product.name}</h3>
                    <p>{product.notes || 'Cut instructions available at checkout.'}</p>
                    <div className="cut-list">
                      {product.cuts.map((cut) => (
                        <span key={cut}>{cut}</span>
                      ))}
                    </div>
                  </div>
                  <div className="product-price">
                    <strong>INR {product.price}</strong>
                    <span>per {product.unit}</span>
                    <em>{product.availability}</em>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <aside className="detail-sidebar">
            <section>
              <p className="eyebrow">Coverage</p>
              <h3>Service area</h3>
              <ul>
                {store.serviceArea.map((area) => (
                  <li key={area}>{area}</li>
                ))}
              </ul>
            </section>
            <section>
              <p className="eyebrow">Bulk</p>
              <h3>Event order friendly</h3>
              <p>{store.bulkOrders ? 'Bulk order intake is enabled for this store.' : 'Bulk ordering will be available soon.'}</p>
            </section>
            <section>
              <p className="eyebrow">Reviews</p>
              <div className="review-stack">
                {store.reviewsList.map((review) => (
                  <blockquote key={review.id}>
                    "{review.quote}"
                    <footer>
                      {review.author} - {review.rating}/5
                    </footer>
                  </blockquote>
                ))}
              </div>
            </section>
          </aside>
        </section>
      </main>
    </MarketShell>
  );
}
