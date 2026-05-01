function ProductCard({ product, categories, onBuyNow, onViewDetails }) {
  const stock = Number.isFinite(Number(product.stock)) ? Math.max(0, Math.floor(Number(product.stock))) : 2;

  return (
    <article className="product-card" key={product.id}>
      <div className="product-image-wrap">
        <img src={product.image} alt={product.name} />
        <span className="product-tag">{product.tag}</span>
      </div>
      <div className="product-content">
        <p className="product-category">
          {categories.find((category) => category.id === product.category)?.name}
        </p>
        <h3>{product.name}</h3>
        <span className="product-stock">Stock: {stock}</span>
        <div className="product-meta">
          <strong>{product.price}</strong>
          <div className="product-card-actions">
            <button
              type="button"
              className="product-card-buy-btn"
              onClick={() => onBuyNow(product)}
              disabled={stock <= 0}
            >
              Buy Now
            </button>
            <button type="button" onClick={() => onViewDetails(product)}>
              View Details
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
