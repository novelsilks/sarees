import ProductCard from '../components/ProductCard';

function CollectionsPage({
  selectedCategory,
  categories,
  handleCollectionSelect,
  visibleProducts,
  searchQuery,
  onBuyNow,
  onViewDetails,
}) {
  return (
    <>
      <section className="collections-page-hero" id="collections-page">
        <div className="collections-page-copy">
          <p className="eyebrow">All Collections</p>
          <h1>Browse every Novel Silks selection in one refined collection page.</h1>
          <span>
            Discover bridal drapes, elegant festive weaves, lighter cottons, and statement occasion sarees curated with a premium boutique sensibility.
          </span>
        </div>
      </section>

      <section className="collections-filters-section">
        <div className="filter-row">
          <button
            type="button"
            className={selectedCategory === 'all' ? 'filter-chip active' : 'filter-chip'}
            onClick={() => handleCollectionSelect('all', '#collections-page')}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              type="button"
              key={category.id}
              className={selectedCategory === category.id ? 'filter-chip active' : 'filter-chip'}
              onClick={() => handleCollectionSelect(category.id, '#collections-page')}
            >
              {category.name}
            </button>
          ))}
        </div>
        {visibleProducts.length === 0 ? (
          <div className="empty-state">
            <p>No products found for "{searchQuery}". Try another search.</p>
          </div>
        ) : null}
        <div className="product-grid">
          {visibleProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              categories={categories}
              onBuyNow={onBuyNow}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
      </section>
    </>
  );
}

export default CollectionsPage;
