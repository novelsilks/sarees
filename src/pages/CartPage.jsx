function CartPage({
  cartItems,
  categories,
  formatPrice,
  cartSubtotal,
  shippingCharge,
  updateCartQuantity,
  removeCartItem,
  navigateTo,
}) {
  return (
    <>
      <section className="cart-page-hero" id="cart-page">
        <div className="cart-page-copy">
          <p className="eyebrow">Shopping Bag</p>
          <h1>Review your saree selection before checkout.</h1>
          <span>
            Confirm styling options, update quantity, and proceed to secure payment with a refined boutique checkout flow.
          </span>
        </div>
      </section>

      <section className="cart-page-section">
        <div className="cart-page-grid">
          <div className="cart-items-panel">
            {cartItems.length === 0 ? (
              <div className="cart-empty-state">
                <h2>Your cart is currently empty.</h2>
                <p>Explore the collection and add your saree to begin checkout.</p>
                <button type="button" className="ghost-btn" onClick={() => navigateTo('#collections-page')}>
                  Browse Collection
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <article className="cart-item-card" key={item.id}>
                  <img src={item.image} alt={item.name} className="cart-item-image" />
                  <div className="cart-item-copy">
                    <p className="product-category">
                      {categories.find((category) => category.id === item.category)?.name}
                    </p>
                    <h2>{item.name}</h2>
                    <strong>{formatPrice(item.basePrice)}</strong>
                  </div>
                  <div className="cart-item-controls">
                    <div className="quantity-control">
                      <button type="button" onClick={() => updateCartQuantity(item.id, item.quantity - 1)}>-</button>
                      <span>{item.quantity}</span>
                      <button type="button" onClick={() => updateCartQuantity(item.id, item.quantity + 1)}>+</button>
                    </div>
                    <button type="button" className="remove-item-btn" onClick={() => removeCartItem(item.id)}>
                      Remove
                    </button>
                  </div>
                </article>
              ))
            )}
          </div>

          <aside className="cart-summary-card">
            <p className="eyebrow">Order Summary</p>
            <div className="summary-row">
              <span>Subtotal</span>
              <strong>{formatPrice(cartSubtotal)}</strong>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <strong>{shippingCharge === 0 ? 'Free' : formatPrice(shippingCharge)}</strong>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <strong>{formatPrice(cartSubtotal + shippingCharge)}</strong>
            </div>
            <button
              type="button"
              className="buy-btn checkout-btn"
              disabled={cartItems.length === 0}
              onClick={() => navigateTo('#checkout-page')}
            >
              Proceed to Checkout
            </button>
            <button type="button" className="cart-btn continue-btn" onClick={() => navigateTo('#collections-page')}>
              Continue Shopping
            </button>
          </aside>
        </div>
      </section>
    </>
  );
}

export default CartPage;
