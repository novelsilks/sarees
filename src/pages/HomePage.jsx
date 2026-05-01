import ProductCard from '../components/ProductCard';

function HomePage({
  slides,
  activeSlide,
  setActiveSlide,
  aboutImages,
  categories,
  selectedCategory,
  showCategoryProducts,
  visibleProducts,
  reviews,
  onBuyNow,
  onViewDetails,
}) {
  return (
    <>
      <section className="hero-section" id="home">
        <div className="slider-panel">
          {slides.map((slide, index) => (
            <article
              key={slide.title}
              className={`slide ${index === activeSlide ? 'is-active' : ''}`}
              style={
                slide.type === 'image'
                  ? {
                      backgroundImage: `linear-gradient(rgba(255, 252, 247, 0.06), rgba(88, 41, 24, 0.18)), url(${slide.image})`,
                    }
                  : undefined
              }
            >
              {slide.type === 'video' ? (
                <>
                  <video
                    className="slide-video"
                    src={slide.video}
                    poster={slide.poster}
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                  <div className="slide-video-overlay" />
                </>
              ) : null}
            </article>
          ))}

          <div className="slider-dots" aria-label="Slide controls">
            {slides.map((slide, index) => (
              <button
                key={slide.eyebrow}
                type="button"
                className={index === activeSlide ? 'dot active' : 'dot'}
                onClick={() => setActiveSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="feature-strip">
        <div>Exclusive Bridal Sarees</div>
        <div>Authentic Silk Weaves</div>
        <div>Pan India Delivery</div>
        <div>Personal Boutique Support</div>
      </section>

      <section className="about-section" id="about">
        <div className="about-grid">
          <div className="about-visuals">
            <img src={aboutImages[0]} alt="Luxury silk saree drape" className="about-image about-image-large" />
            <img src={aboutImages[1]} alt="Traditional saree styling detail" className="about-image about-image-small" />
          </div>
          <div className="about-copy">
            <div className="section-heading">
              <p className="eyebrow">About Novel Silks</p>
              <h2>Tradition, elegance, and celebratory luxury in every weave.</h2>
            </div>
            <p>
              Novel Silks is a saree destination shaped around the beauty of Indian craftsmanship. Our
              collections celebrate silk, zari, color, and heritage with a polished and welcoming boutique feel.
            </p>
            <p>
              The experience is designed to feel bright, graceful, and easy to browse, helping every visitor
              discover sarees for weddings, festivals, gifting, and treasured family moments.
            </p>
          </div>
        </div>
      </section>

      <section className="categories-section" id="collections">
        <div className="section-heading centered">
          <p className="eyebrow">Shop By Category</p>
          <h2>Explore timeless collections for every occasion.</h2>
        </div>
        <div className="category-grid">
          {categories.map((category) => (
            <button
              type="button"
              key={category.id}
              className={selectedCategory === category.id ? 'category-card active' : 'category-card'}
              onClick={() => showCategoryProducts(category.id, '#products')}
            >
              <img src={category.image} alt={category.name} />
              <div className="category-card-copy">
                <strong>{category.name}</strong>
                <span>{category.note}</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="products-section" id="products">
        <div className="section-heading centered">
          <p className="eyebrow">Featured Products</p>
          <h2>
            {selectedCategory === 'all'
              ? 'Curated sarees for festive elegance.'
              : `Showing ${categories.find((category) => category.id === selectedCategory)?.name}`}
          </h2>
        </div>
        <div className="filter-row">
          <button
            type="button"
            className={selectedCategory === 'all' ? 'filter-chip active' : 'filter-chip'}
            onClick={() => showCategoryProducts('all', '#products')}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              type="button"
              key={category.id}
              className={selectedCategory === category.id ? 'filter-chip active' : 'filter-chip'}
              onClick={() => showCategoryProducts(category.id, '#products')}
            >
              {category.name}
            </button>
          ))}
        </div>
        {visibleProducts.length === 0 ? (
          <div className="empty-state">
            <p>No products found. Try another search.</p>
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

      <section className="reviews-section" id="reviews">
        <div className="section-heading centered">
          <p className="eyebrow">Customer Reviews</p>
          <h2>Loved for timeless weaves and an elevated shopping experience.</h2>
        </div>
        <div className="reviews-marquee">
          <div className="reviews-track">
            {[...reviews, ...reviews].map((review, index) => (
              <article className="review-card" key={`${review.name}-${index}`}>
                <span className="quote-mark">"</span>
                <p>{review.text}</p>
                <strong>{review.name}</strong>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePage;
