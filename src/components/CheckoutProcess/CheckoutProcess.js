import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";

import { CART_API, ORDERS_API } from "../../api/api";
import { toast } from "react-toastify";
// import PaymentGate from "../../assets/pay_1.webp";

import "./CheckoutProcess.css";

const CheckoutProcess = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    pinCode: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const DELIVERY_CHARGES = 50;
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchCart = async () => {
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
         const cart = data.cart || [];

  setCartItems(cart);

          // const total = data.cart.reduce((acc, item) => {
          //   return acc + parseFloat(item.price) * item.quantity;
          // }, 0);

          const total = data.cart.reduce((acc, item) => {
  return (
    acc +
    Number(item.price) *
    Number(item.quantity)
  );
}, 0);

          setTotalAmount(total);
        } else {
          toast.error("Failed to fetch cart");
        }
      } catch (error) {
        console.error("Fetch error:", error);
        toast.error("Something went wrong fetching the cart");
      }
    };

    fetchCart();
  }, [userId]);

  const validateForm = () => {
    let newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First Name is required";
    if (!formData.lastName) newErrors.lastName = "Last Name is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.state) newErrors.state = "State is required";
    if (!/^[0-9]{6}$/.test(formData.pinCode))
      newErrors.pinCode = "PIN Code must be 6 digits";
    if (!/^[0-9]{10}$/.test(formData.phone))
      newErrors.phone = "Phone must be 10 digits";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form", {
        position: "top-right",
      });
      return;
    }

    const orderPayload = {
      user_id: userId,
      first_name: formData.firstName,
      last_name: formData.lastName,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      pincode: formData.pinCode,
      phonenumber: formData.phone,
      delivery_charges: DELIVERY_CHARGES,
    };

    try {
      const response = await fetch(ORDERS_API.ADD_ORDER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderPayload),
      });

      const data = await response.json();

      if (response.ok && data.statusCode === 200) {
        toast.success(data.message);
        // Reset form and cart
        setFormData({
          firstName: "",
          lastName: "",
          address: "",
          city: "",
          state: "",
          pinCode: "",
          phone: "",
        });
        setCartItems([]);
        setTotalAmount(0);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Order submission error:", error);
      toast.error("Something went wrong while placing the order");
    }
  };

  return (
    <Container fluid className="payment-gateway-container">
      <Row>
        <Col md={8} className="mb-4 paymentgateway-inputcode">
          <Card className="p-4 paymentgateway-cards">
            <h4 className="mb-3">Delivery Information</h4>
            <Form onSubmit={handleSubmit}>
              <Row className="mb-1">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="checkout-label">
                      First Name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="firstName"
                      placeholder="First name"
                      onChange={handleChange}
                      value={formData.firstName}
                      className="checkout-input-field"
                    />
                    {errors.firstName && (
                      <span className="text-danger">{errors.firstName}</span>
                    )}
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="checkout-label">
                      Last Name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="lastName"
                      placeholder="Last name"
                      onChange={handleChange}
                      value={formData.lastName}
                      className="checkout-input-field"
                    />
                    {errors.lastName && (
                      <span className="text-danger">{errors.lastName}</span>
                    )}
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-1">
                <Form.Label className="checkout-label">Address</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  placeholder="Street address"
                  onChange={handleChange}
                  value={formData.address}
                  className="checkout-input-field"
                />
                {errors.address && (
                  <span className="text-danger">{errors.address}</span>
                )}
              </Form.Group>

              <Row className="mb-1">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="checkout-label">City</Form.Label>
                    <Form.Control
                      type="text"
                      name="city"
                      placeholder="City"
                      onChange={handleChange}
                      value={formData.city}
                      className="checkout-input-field"
                    />
                    {errors.city && (
                      <span className="text-danger">{errors.city}</span>
                    )}
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group>
                    <Form.Label className="checkout-label">State</Form.Label>
                    <Form.Control
                      type="text"
                      name="state"
                      placeholder="State"
                      onChange={handleChange}
                      value={formData.state}
                      className="checkout-input-field"
                    />
                    {errors.state && (
                      <span className="text-danger">{errors.state}</span>
                    )}
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group>
                    <Form.Label className="checkout-label">PIN Code</Form.Label>
                    <Form.Control
                      type="text"
                      name="pinCode"
                      placeholder="PIN Code"
                      onChange={handleChange}
                      value={formData.pinCode}
                      className="checkout-input-field"
                    />
                    {errors.pinCode && (
                      <span className="text-danger">{errors.pinCode}</span>
                    )}
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-1">
                <Form.Label className="checkout-label">Phone</Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  onChange={handleChange}
                  value={formData.phone}
                  className="checkout-input-field"
                />
                {errors.phone && (
                  <span className="text-danger">{errors.phone}</span>
                )}
              </Form.Group>

              {/* <h4 className="mt-3">Payment Method</h4> */}
              {/* <Form.Group className="mb-1">
                <Form.Label>
                  All transactions are secure and encrypted.
                </Form.Label>
                <img
                  src={PaymentGate}
                  alt="UPI Payment"
                  className="img-fluid mt-1 payment_gateway-ImgUPI"
                />
              </Form.Group> */}

              <Button
                type="submit"
                variant="primary"
                className="w-100 mt-4 payment_gateway-btn"
              >
                Order Now
              </Button>
            </Form>
          </Card>
        </Col>

        {/* 🧾 Order Summary Section */}
        <Col md={4} className="paymentgateway-leftside">
          <Card className="paymentgateway-box">
            <h4 className="paymentgateway-box-left-h4">Order Summary</h4>
            <hr />
            {cartItems.map((item) => (
              <div
                className="d-flex justify-content-between"
                key={item.cart_id}
              >
                <p className="paymentgateway-box-left-para">
                  {item.product_name} ({item.grams}) ({item.quantity})
                </p>
                <p className="paymentgateway-box-left-para">₹{Number(item.quantity) * Number(item.price)}</p>
              </div>
            ))}
            <div className="d-flex justify-content-between">
              <p className="paymentgateway-box-left-para">Delivery Charges :</p>
              <p className="paymentgateway-box-left-para">₹50.00</p>
            </div>
            <hr />
            <div className="paymentgateway-box-left-total">
              <p>Total</p>
              <p>₹{(totalAmount + DELIVERY_CHARGES).toFixed(2)}</p>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CheckoutProcess;
