function CheckoutPage({
  checkoutForm,
  handleCheckoutInput,
  paymentMethod,
  setPaymentMethod,
  cartItems,
  formatPrice,
  cartSubtotal,
  shippingCharge,
  paymentCharge,
  orderTotal,
  paymentFeedback,
  isPaymentProcessing,
  handleRazorpayPayment,
  navigateTo,
}) {
  return (
    <>
      <section className="checkout-page-hero" id="checkout-page">
        <div className="checkout-page-copy">
          <p className="eyebrow">Secure Checkout</p>
          <h1>Complete your order with delivery and payment details.</h1>
          <span>
            Inspired by premium saree-store checkout flows, this page brings together address details, payment choice, and order review in one elegant step.
          </span>
        </div>
      </section>

      <section className="checkout-page-section">
        <div className="checkout-page-grid">
          <div className="checkout-form-stack">
            <div className="checkout-panel">
              <p className="eyebrow">Delivery Address</p>
              <div className="checkout-form-grid">
                <input name="fullName" value={checkoutForm.fullName} onChange={handleCheckoutInput} placeholder="Full Name" aria-label="Full Name" />
                <input name="email" value={checkoutForm.email} onChange={handleCheckoutInput} placeholder="Email Address" aria-label="Email Address" />
                <input name="phone" value={checkoutForm.phone} onChange={handleCheckoutInput} placeholder="Phone Number" aria-label="Phone Number" />
                <input name="city" value={checkoutForm.city} onChange={handleCheckoutInput} placeholder="City" aria-label="City" />
                <input name="state" value={checkoutForm.state} onChange={handleCheckoutInput} placeholder="State" aria-label="State" />
                <input name="pincode" value={checkoutForm.pincode} onChange={handleCheckoutInput} placeholder="Pincode" aria-label="Pincode" />
                <textarea
                  name="address"
                  value={checkoutForm.address}
                  onChange={handleCheckoutInput}
                  rows="4"
                  placeholder="House / Street / Area"
                  aria-label="Address"
                />
                <textarea
                  name="note"
                  value={checkoutForm.note}
                  onChange={handleCheckoutInput}
                  rows="4"
                  placeholder="Order note or delivery instruction"
                  aria-label="Order note"
                />
              </div>
            </div>

            <div className="checkout-panel">
              <p className="eyebrow">Payment Method</p>
              <div className="payment-methods">
                <label className={paymentMethod === 'upi' ? 'payment-method active' : 'payment-method'}>
                  <input type="radio" name="payment-method" checked={paymentMethod === 'upi'} onChange={() => setPaymentMethod('upi')} />
                  <span>UPI / QR Payment</span>
                </label>
                <label className={paymentMethod === 'card' ? 'payment-method active' : 'payment-method'}>
                  <input type="radio" name="payment-method" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} />
                  <span>Credit / Debit Card</span>
                </label>
                <label className={paymentMethod === 'netbanking' ? 'payment-method active' : 'payment-method'}>
                  <input type="radio" name="payment-method" checked={paymentMethod === 'netbanking'} onChange={() => setPaymentMethod('netbanking')} />
                  <span>Net Banking</span>
                </label>
              </div>
            </div>
          </div>

          <aside className="checkout-summary-card">
            <p className="eyebrow">Payment Summary</p>
            <div className="checkout-order-list">
              {cartItems.map((item) => (
                <div className="checkout-order-item" key={item.id}>
                  <img src={item.image} alt={item.name} />
                  <div>
                    <strong>{item.name}</strong>
                    <span>{item.optionLabel}</span>
                    <span>Qty {item.quantity}</span>
                  </div>
                  <strong>{formatPrice(item.basePrice * item.quantity)}</strong>
                </div>
              ))}
            </div>
            <div className="summary-row">
              <span>Subtotal</span>
              <strong>{formatPrice(cartSubtotal)}</strong>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <strong>{shippingCharge === 0 ? 'Free' : formatPrice(shippingCharge)}</strong>
            </div>
            <div className="summary-row">
              <span>Payment Charge</span>
              <strong>{paymentCharge === 0 ? 'Nil' : formatPrice(paymentCharge)}</strong>
            </div>
            <div className="summary-row total">
              <span>Total Payable</span>
              <strong>{formatPrice(orderTotal)}</strong>
            </div>
            {paymentFeedback.message ? (
              <p className={paymentFeedback.type === 'success' ? 'form-status success' : 'form-status error'}>
                {paymentFeedback.message}
              </p>
            ) : null}
            <button
              type="button"
              className="buy-btn checkout-btn"
              disabled={cartItems.length === 0 || isPaymentProcessing}
              onClick={handleRazorpayPayment}
            >
              {isPaymentProcessing ? 'Opening Razorpay...' : 'Complete Payment'}
            </button>
            <button type="button" className="cart-btn continue-btn" onClick={() => navigateTo('#cart-page')}>
              Back to Cart
            </button>
          </aside>
        </div>
      </section>
    </>
  );
}

export default CheckoutPage;
