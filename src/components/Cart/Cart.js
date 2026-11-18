import React, { useState, useEffect } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { BASE_URL, CART_API } from "../../api/api";
import { toast } from "react-toastify";
import "./Cart.css";

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      const fetchCartDetails = async () => {
        try {
          const response = await fetch(CART_API.GET_ALL_CART_DETAILS, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ user_id: userId }),
          });

          const data = await response.json();

          if (data.statusCode === 200) {
            const transformedCartItems = data.cart.map((product) => ({
              cartId: product.cart_id,
              productId: product.product_id,
              name: product.product_name,
              weight: product.grams,
              price: Number(product.price),
              quantity: Number(product.quantity),
              stock: Number(product.stock),
              image: product.product_image || "default_image_path_here",
            }));

            setCartItems(transformedCartItems);
            window.dispatchEvent(new Event("cartUpdated"));
          } else {
            console.error("Failed to fetch cart details:", data.message);
          }
        } catch (error) {
          console.error("Error fetching cart details:", error);
        }
      };

      fetchCartDetails();
    }
  }, [userId]);

  // useEffect(() => {
  //   const totalItemsInCart = cartItems.reduce(
  //     (total, item) => total + parseInt(item.quantity),
  //     0,
  //   );

  //   localStorage.setItem("totalItemsInCart", totalItemsInCart.toString());
  //   window.dispatchEvent(new Event("cartCountUpdated"));
  // }, [cartItems]);

  // Clear the entire cart
  const clearCart = async () => {
    try {
      const response = await fetch(CART_API.DELETE_ALL_CART, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId }), // Send userId to API
      });

      const data = await response.json();

      if (data.statusCode === 200) {
        toast.success(data.message); // Success message for clearing the cart
        setCartItems([]); // Clear the UI cart items

         window.dispatchEvent(new Event("cartUpdated"));
      } else {
        toast.error(data.message); // Error message if API fails
      }
    } catch (error) {
      toast.error("Failed to clear cart. Please try again.");
    }
  };

  // Remove a single item from the cart
  const removeItem = async (cartId) => {
    try {
      const response = await fetch(CART_API.DELETE_CART, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId, cart_id: cartId }),
      });

      const data = await response.json();

      if (data.statusCode === 200) {
        toast.success(data.message);
        setCartItems((prevItems) =>
          prevItems.filter((item) => item.cartId !== cartId),
        );

         window.dispatchEvent(new Event("cartUpdated"));
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to remove item. Please try again.");
    }
  };

  // Increase item quantity
  const increaseQuantity = async (cartId, quantity, stock) => {
    if (quantity >= stock) {
      toast.warn(`Maximum available stock: ${stock}`);
      return;
    }

    const newQuantity = quantity + 1;

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.cartId === cartId ? { ...item, quantity: newQuantity } : item,
      ),
    );

    await updateCart(cartId, newQuantity);
  };

  // Decrease item quantity
  const decreaseQuantity = async (cartId, quantity) => {
    if (parseInt(quantity) > 1) {
      const newQuantity = parseInt(quantity) - 1;
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.cartId === cartId ? { ...item, quantity: newQuantity } : item,
        ),
      );

      await updateCart(cartId, newQuantity);
    }
  };

  // Update cart quantity on backend
  const updateCart = async (cartId, quantity) => {
    try {
      const response = await fetch(CART_API.UPDATE_CART, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cart_id: cartId,
          quantity: quantity.toString(),
        }),
      });

      const data = await response.json();

      if (data.statusCode === 200) {
        // toast.success(data.message);

         window.dispatchEvent(new Event("cartUpdated"));
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to update cart. Please try again.");
    }
  };

  // Calculate total price
  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const deliveryCharge = cartItems.length > 0 ? 50 : 0;
  const finalAmount = totalAmount + deliveryCharge;

  return (
    <div className="cart-container">
      {/* Cart Items Section */}
      <div className="cart-items">
        <h4 className="cart-count-products">
          Cart: {cartItems.length} Items
          <button
            className="go-to-product"
            onClick={() => navigate("/")} // Navigate to product page
          >
            Go to Product
          </button>
        </h4>

        {cartItems.length === 0 ? (
          <p className="empty-cart">Your cart is empty!</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.cartId} className="cart-item">
              <img
                src={`${BASE_URL}/${item.image}`}
                alt={item.name}
                className="cart-image"
              />
              <div className="cart-details">
                <h5 className="cart-details-product-title">
                  {item.name} ({item.weight})
                </h5>
                <p className="cart-details-product-price">Price: ₹{item.price}/-</p>

                <div className="cart-quantity">
                  <button
                    className="cart-btn"
                    onClick={() => decreaseQuantity(item.cartId, item.quantity)}
                    disabled={item.quantity <= 1}
                    title={item.quantity <= 1 ? "Minimum quantity is 1" : ""}
                  >
                    <FaMinus />
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className="cart-btn"
                    onClick={() =>
                      increaseQuantity(item.cartId, item.quantity, item.stock)
                    }
                    disabled={item.quantity >= item.stock}
                    title={
                      item.quantity >= item.stock
                        ? `Maximum available stock: ${item.stock}`
                        : ""
                    }
                  >
                    <FaPlus />
                  </button>
                  <button
                    className="cart-remove"
                    onClick={() => removeItem(item.cartId)}
                  >
                    Remove
                  </button>
                </div>
                <p className="cart-details-product-subtotal">
                  Subtotal: ₹{item.price * item.quantity}/-
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Cart Summary Section */}
      {cartItems.length > 0 && (
        <div className="cart-summary">
          <h5 className="pb-2">Price Details:</h5>
          <hr />
          {cartItems.map((item) => (
            <p key={item.cartId}>
              {item.name} ({item.weight}) ({item.quantity})
              <span> ₹{item.price * item.quantity}</span>
            </p>
          ))}
          <p>
            Delivery Charges: <span>₹{deliveryCharge.toFixed(2)}</span>
          </p>
          <hr />
          <h4 className="py-3 cart-summary-h4-amount">Total Amount: ₹{finalAmount.toFixed(2)}</h4>
          <button
            className="checkout-btn"
            onClick={() => navigate("/checkout")}
          >
            Proceed to Checkout
          </button>
          <button className="clear-btn" onClick={clearCart}>
            Clear Cart
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
