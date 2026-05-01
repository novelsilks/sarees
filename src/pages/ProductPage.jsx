import ProductCard from '../components/ProductCard';

function ProductPage({
  activeProduct,
  categories,
  activeProductImage,
  setActiveProductImage,
  addToCart,
  serviceHighlights,
  relatedProducts,
  onViewDetails,
}) {
  return (
    <>
      <section className="product-page" id={`product-${activeProduct.id}`}>
        <div className="product-page-grid">
          <div className="product-gallery">
            <div className="product-gallery-main">
              <img
                src={activeProduct.gallery[activeProductImage]}
                alt={activeProduct.name}
                className="product-detail-main-image"
              />
            </div>
            <div className="product-gallery-thumbs">
              {activeProduct.gallery.map((image, index) => (
                <button
                  type="button"
                  key={image}
                  className={index === activeProductImage ? 'product-thumb active' : 'product-thumb'}
                  onClick={() => setActiveProductImage(index)}
                >
                  <img src={image} alt={`${activeProduct.name} view ${index + 1}`} />
                </button>
              ))}
            </div>
          </div>

          <div className="product-summary-card">
            <p className="eyebrow">
              {categories.find((category) => category.id === activeProduct.category)?.name}
            </p>
            <h1>{activeProduct.name}</h1>
            <strong className="product-page-price">{activeProduct.price}</strong>

            <div className="product-page-actions">
              <button type="button" className="buy-btn" onClick={() => addToCart(activeProduct, true)}>
                Buy it now
              </button>
              <button type="button" className="cart-btn" onClick={() => addToCart(activeProduct)}>
                Add to Cart
              </button>
            </div>

            <p className="product-page-note">
              Created once in design, every saree is uniquely yours.
            </p>

            <div className="weave-story-card">
              <div className="weave-story-icon">NS</div>
              <p>
                It takes about <strong>15 to 20 days</strong> to handweave a single Kanchipuram silk saree,
                reflecting the artistry, patience, and dedication behind every drape.
              </p>
            </div>

            <div className="product-service-strip">
              {serviceHighlights.map((item) => (
                <span className="service-pill" key={item.label}>
                  <i>{item.icon}</i>
                  {item.label}
                </span>
              ))}
            </div>

            <div className="product-detail-panels">
              <details open>
                <summary>Product Detail</summary>
                <p>{activeProduct.description}</p>
              </details>
            </div>
          </div>
        </div>
      </section>

      {relatedProducts.length > 0 ? (
        <section className="related-products-section">
          <div className="section-heading">
            <p className="eyebrow">People Also Bought</p>
            <h2>Explore more boutique saree selections.</h2>
          </div>
          <div className="product-grid">
            {relatedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                categories={categories}
                onBuyNow={(nextProduct) => addToCart(nextProduct, true)}
                onViewDetails={onViewDetails}
              />
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
}

export default ProductPage;
