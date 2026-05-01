function OrderSuccessPage({ orderConfirmation, formatPrice, orderTotal, navigateTo }) {
  return (
    <>
      <section className="checkout-page-hero" id="order-success">
        <div className="checkout-page-copy">
          <p className="eyebrow">Order Confirmed</p>
          <h1>Your order has been placed successfully.</h1>
          <span>
            We have received your payment and sent the order details to both the customer email and the shop
            owner email.
          </span>
        </div>
      </section>

      <section className="checkout-page-section">
        <div className="checkout-page-grid">
          <div className="checkout-form-stack">
            <div className="checkout-panel">
              <p className="eyebrow">Confirmation Details</p>
              <div className="success-summary">
                {orderConfirmation?.emailWarning ? (
                  <p className="form-status error">{orderConfirmation.emailWarning}</p>
                ) : null}
                {orderConfirmation?.sheetsWarning ? (
                  <p className="form-status error">{orderConfirmation.sheetsWarning}</p>
                ) : null}
                <div className="summary-row">
                  <span>Order ID</span>
                  <strong>{orderConfirmation?.orderReference || 'Generated after payment'}</strong>
                </div>
                <div className="summary-row">
                  <span>Payment ID</span>
                  <strong>{orderConfirmation?.paymentId || '-'}</strong>
                </div>
                <div className="summary-row">
                  <span>Customer</span>
                  <strong>{orderConfirmation?.customerName || '-'}</strong>
                </div>
                <div className="summary-row">
                  <span>Confirmation Email</span>
                  <strong>{orderConfirmation?.email || '-'}</strong>
                </div>
                <div className="summary-row total">
                  <span>Amount Paid</span>
                  <strong>{orderConfirmation?.amountPaid || formatPrice(orderTotal)}</strong>
                </div>
              </div>
            </div>
          </div>

          <aside className="checkout-summary-card">
            <p className="eyebrow">Order Summary</p>
            <div className="checkout-order-list">
              {(orderConfirmation?.items || []).map((item) => (
                <div className="checkout-order-item" key={`${item.productId}-${item.name}`}>
                  <div>
                    <strong>{item.name}</strong>
                    <span>{item.category}</span>
                    <span>Qty {item.quantity}</span>
                  </div>
                  <strong>{item.price}</strong>
                </div>
              ))}
            </div>
            <button type="button" className="buy-btn checkout-btn" onClick={() => navigateTo('#home')}>
              Continue Shopping
            </button>
            <button
              type="button"
              className="cart-btn continue-btn"
              onClick={() => navigateTo('#collections-page')}
            >
              View Collections
            </button>
          </aside>
        </div>
      </section>
    </>
  );
}

export default OrderSuccessPage;
