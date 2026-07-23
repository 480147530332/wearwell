
import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AddToCartPage = () => {
  const {
    cart,
    clearCart,
    removeFromCart,
    increaseQty,
    decreaseQty,
  } = useContext(CartContext);

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [showCheckout, setShowCheckout] = useState(false);

  const [shippingData, setShippingData] = useState({
    fullName: '',
    mobile: '',
    pincode: '',
    city: '',
    state: '',
    address: '',
    landmark: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('cod');

  if (!cart.length) {
    return (
      <h2 style={{ marginTop: '3em', textAlign: 'center' }}>
        Your cart is empty.
      </h2>
    );
  }

  const subtotal = cart.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  const deliveryFee = subtotal > 999 ? 0 : 99;
  const gst = Math.round(subtotal * 0.18);
  const total = subtotal + deliveryFee + gst;

  const handleInputChange = (e) => {
    setShippingData({
      ...shippingData,
      [e.target.name]: e.target.value,
    });
  };

  const handleBuyNow = () => {
    if (!user) {
      alert('Please login first');
      navigate('/login');
      return;
    }

    setShowCheckout(true);
  };

  const placeOrder = () => {
    const {
      fullName,
      mobile,
      pincode,
      city,
      state,
      address,
    } = shippingData;

    if (
      !fullName ||
      !mobile ||
      !pincode ||
      !city ||
      !state ||
      !address
    ) {
      alert('Please fill all required shipping details');
      return;
    }

    alert(
      `Order placed successfully using ${paymentMethod.toUpperCase()}!`
    );

    clearCart();
    navigate('/');
  };

  return (
    <div style={styles.pageWrapper}>
      {/* LEFT SECTION */}
      <div style={styles.leftSection}>
        <h2 style={styles.heading}>Shopping Cart</h2>

        {cart.map((item, i) => (
          <div key={item.id || i} style={styles.cartItem}>
            <div style={styles.itemInfo}>
              <img
                src={item.image}
                alt={item.title}
                style={styles.image}
              />

              <div>
                <h3 style={styles.title}>{item.title}</h3>
                <p style={styles.price}>₹{item.price}</p>

                <div style={styles.qtyWrapper}>
                  <button
                    onClick={() => decreaseQty(item.id)}
                    style={styles.qtyBtn}
                  >
                    −
                  </button>

                  <span style={styles.qtyText}>{item.quantity}</span>

                  <button
                    onClick={() => increaseQty(item.id)}
                    style={styles.qtyBtn}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={() => removeFromCart(i)}
              style={styles.removeBtn}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* RIGHT SECTION */}
      <div style={styles.rightSection}>
        <h2 style={styles.summaryHeading}>Order Summary</h2>

        <div style={styles.summaryRow}>
          <span>Subtotal</span>
          <span>₹{subtotal}</span>
        </div>

        <div style={styles.summaryRow}>
          <span>Delivery Fee</span>
          <span>
            {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
          </span>
        </div>

        <div style={styles.summaryRow}>
          <span>GST (18%)</span>
          <span>₹{gst}</span>
        </div>

        <hr />

        <div style={styles.totalRow}>
          <span>Total</span>
          <span>₹{total}</span>
        </div>

        {!showCheckout ? (
          <>
            <button onClick={handleBuyNow} style={styles.checkoutBtn}>
              Proceed To Checkout
            </button>

            <button
              onClick={clearCart}
              style={styles.clearBtn}
            >
              Clear Cart
            </button>
          </>
        ) : (
          <div style={styles.checkoutContainer}>
            {/* SHIPPING ADDRESS */}
            <h3 style={styles.sectionTitle}>Shipping Address</h3>

            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={shippingData.fullName}
              onChange={handleInputChange}
              style={styles.input}
            />

            <input
              type="text"
              name="mobile"
              placeholder="Mobile Number"
              value={shippingData.mobile}
              onChange={handleInputChange}
              style={styles.input}
            />

            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              value={shippingData.pincode}
              onChange={handleInputChange}
              style={styles.input}
            />

            <input
              type="text"
              name="city"
              placeholder="City"
              value={shippingData.city}
              onChange={handleInputChange}
              style={styles.input}
            />

            <input
              type="text"
              name="state"
              placeholder="State"
              value={shippingData.state}
              onChange={handleInputChange}
              style={styles.input}
            />

            <textarea
              name="address"
              placeholder="Full Address"
              value={shippingData.address}
              onChange={handleInputChange}
              style={styles.textarea}
            />

            <input
              type="text"
              name="landmark"
              placeholder="Landmark (Optional)"
              value={shippingData.landmark}
              onChange={handleInputChange}
              style={styles.input}
            />

            {/* PAYMENT METHODS */}
            <h3 style={styles.sectionTitle}>Payment Method</h3>

            <div style={styles.paymentBox}>
              <label style={styles.paymentOption}>
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === 'cod'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Cash On Delivery
              </label>

              <label style={styles.paymentOption}>
                <input
                  type="radio"
                  name="payment"
                  value="upi"
                  checked={paymentMethod === 'upi'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                UPI / Google Pay / PhonePe
              </label>

              <label style={styles.paymentOption}>
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Credit / Debit Card
              </label>

              <label style={styles.paymentOption}>
                <input
                  type="radio"
                  name="payment"
                  value="netbanking"
                  checked={paymentMethod === 'netbanking'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Net Banking
              </label>
            </div>

            {/* CARD DETAILS */}
            {paymentMethod === 'card' && (
              <div style={styles.cardBox}>
                <input
                  type="text"
                  placeholder="Card Number"
                  style={styles.input}
                />

                <input
                  type="text"
                  placeholder="Card Holder Name"
                  style={styles.input}
                />

                <div style={styles.cardRow}>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    style={styles.smallInput}
                  />

                  <input
                    type="password"
                    placeholder="CVV"
                    style={styles.smallInput}
                  />
                </div>
              </div>
            )}

            {/* UPI DETAILS */}
            {paymentMethod === 'upi' && (
              <input
                type="text"
                placeholder="Enter UPI ID"
                style={styles.input}
              />
            )}

            {/* NET BANKING */}
            {paymentMethod === 'netbanking' && (
              <select style={styles.input}>
                <option>Select Bank</option>
                <option>State Bank Of India</option>
                <option>HDFC Bank</option>
                <option>ICICI Bank</option>
                <option>Axis Bank</option>
                <option>Kotak Mahindra Bank</option>
              </select>
            )}

            <button onClick={placeOrder} style={styles.placeOrderBtn}>
              Place Order
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddToCartPage;

const styles = {
  pageWrapper: {
    display: 'flex',
    gap: '2rem',
    padding: '2rem',
    flexWrap: 'wrap',
    backgroundColor: '#f5f5f5',
  },

  leftSection: {
    flex: 2,
  },

  rightSection: {
    flex: 1,
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    minWidth: '320px',
    height: 'fit-content',
  },

  heading: {
    marginBottom: '1rem',
  },

  cartItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: '1rem',
    borderRadius: '10px',
    marginBottom: '1rem',
    flexWrap: 'wrap',
  },

  itemInfo: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
    flexWrap: 'wrap',
  },

  image: {
    width: '100px',
    height: '100px',
    objectFit: 'cover',
    borderRadius: '10px',
  },

  title: {
    marginBottom: '0.5rem',
  },

  price: {
    fontWeight: 'bold',
  },

  qtyWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '0.5rem',
  },

  qtyBtn: {
    width: '30px',
    height: '30px',
    border: 'none',
    borderRadius: '50%',
    cursor: 'pointer',
    fontSize: '1rem',
  },

  qtyText: {
    margin: '0 10px',
    fontWeight: 'bold',
  },

  removeBtn: {
    backgroundColor: 'red',
    color: 'white',
    border: 'none',
    padding: '0.7rem 1rem',
    borderRadius: '5px',
    cursor: 'pointer',
  },

  summaryHeading: {
    marginBottom: '1rem',
  },

  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '1rem',
  },

  totalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    marginTop: '1rem',
  },

  checkoutBtn: {
    width: '100%',
    padding: '1rem',
    backgroundColor: '#2874f0',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '1.5rem',
    fontSize: '1rem',
  },

  clearBtn: {
    width: '100%',
    padding: '1rem',
    backgroundColor: '#444',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '1rem',
    fontSize: '1rem',
  },

  checkoutContainer: {
    marginTop: '2rem',
  },

  sectionTitle: {
    marginBottom: '1rem',
    marginTop: '1rem',
  },

  input: {
    width: '100%',
    padding: '0.9rem',
    marginBottom: '1rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '1rem',
  },

  textarea: {
    width: '100%',
    padding: '0.9rem',
    marginBottom: '1rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
    minHeight: '80px',
    fontSize: '1rem',
  },

  paymentBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.8rem',
    marginBottom: '1rem',
  },

  paymentOption: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },

  cardBox: {
    marginTop: '1rem',
  },

  cardRow: {
    display: 'flex',
    gap: '1rem',
  },

  smallInput: {
    flex: 1,
    padding: '0.9rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },

  placeOrderBtn: {
    width: '100%',
    padding: '1rem',
    backgroundColor: 'green',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
    marginTop: '1rem',
  },
};

