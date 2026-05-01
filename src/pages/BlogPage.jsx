function BlogPage({ blogPosts }) {
  return (
    <>
      <section className="blog-page-hero" id="blog-page">
        <div className="blog-page-copy">
          <p className="eyebrow">Novel Silks Journal</p>
          <h1>Stories, styling notes, and saree inspirations with a luxury touch.</h1>
          <span>
            Explore curated reads on bridal sarees, timeless fabrics, and elegant ways to wear
            heritage drapes with confidence and grace.
          </span>
        </div>
      </section>

      <section className="blog-list-section">
        <div className="blog-grid">
          {blogPosts.map((post) => (
            <article className="blog-card" key={post.title}>
              <div className="blog-image-wrap">
                <img src={post.image} alt={post.title} className="blog-image" />
              </div>
              <div className="blog-card-copy">
                <p className="eyebrow">{post.category}</p>
                <h2>{post.title}</h2>
                <p>{post.excerpt}</p>
                <button type="button" className="blog-read-btn">Read More</button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

export default BlogPage;
