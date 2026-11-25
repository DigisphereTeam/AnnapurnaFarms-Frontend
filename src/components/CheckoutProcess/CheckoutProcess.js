import React, { useState, useEffect, useCallback } from "react";
import { Container, Row, Col, Form, Button, Card, Modal} from "react-bootstrap";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { CART_API, ORDERS_API, ADDRESS_API } from "../../api/api";
import { toast } from "react-toastify";
import "./CheckoutProcess.css";

const emptyForm = {
  firstName: "",
  lastName: "",
  address: "",
  city: "",
  state: "",
  pinCode: "",
  phone: "",
};

const CheckoutProcess = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [isLoadingAddresses, setIsLoadingAddresses] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState(emptyForm);

  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const DELIVERY_CHARGES = 50;
  const userId = localStorage.getItem("userId");

  // New address form open -> order uses the form. Otherwise a saved address must be selected.
  const isOrderDisabled =
    isPlacingOrder || (showForm ? false : !selectedId || editingId !== null);

  const fetchAddresses = useCallback(
    async (selectNewest = false) => {
      try {
        const response = await fetch(ADDRESS_API.GET_ADDRESSES(userId));
        const data = await response.json();

        if (data.statusCode === 200) {
          // Map API field names to the names used in this component
          const list = (data.data || []).map((a) => ({
            id: a.address_id,
            firstName: a.first_name,
            lastName: a.last_name,
            address: a.address,
            city: a.city,
            state: a.state,
            pinCode: a.pincode,
            phone: a.phone_number,
            isDefault: a.is_default,
          }));

          setSavedAddresses(list);

          if (list.length === 0) {
            setSelectedId(null);
            setShowForm(true); // no saved address -> open the form
          } else if (selectNewest) {
            setSelectedId(list[0].id); // API returns newest first
          } else {
            const def = list.find((a) => a.isDefault) || list[0];
            setSelectedId(def.id);
          }
        } else {
          toast.error("Failed to fetch addresses");
        }
      } catch (error) {
        console.error("Address fetch error:", error);
        toast.error("Something went wrong fetching addresses");
      } finally {
        setIsLoadingAddresses(false);
      }
    },
    [userId],
  );

  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch(CART_API.GET_ALL_CART_DETAILS, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_id: userId }),
        });
        const data = await response.json();
        if (data.statusCode === 200) {
          const cart = data.cart || [];
          setCartItems(cart);
          setTotalAmount(
            cart.reduce(
              (acc, item) => acc + Number(item.price) * Number(item.quantity),
              0,
            ),
          );
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

  const validateForm = (data = formData) => {
    const newErrors = {};
    if (!data.firstName.trim()) newErrors.firstName = "First Name is required";
    if (!data.lastName.trim()) newErrors.lastName = "Last Name is required";
    if (!data.address.trim()) newErrors.address = "Address is required";
    if (!data.city.trim()) newErrors.city = "City is required";
    if (!data.state.trim()) newErrors.state = "State is required";
    if (!/^[0-9]{6}$/.test(data.pinCode.trim()))
      newErrors.pinCode = "PIN Code must be 6 digits";
    if (!/^[0-9]{10}$/.test(data.phone.trim()))
      newErrors.phone = "Phone must be 10 digits";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const openNewForm = () => {
    setEditingId(null);
    setFormData(emptyForm);
    setErrors({});
    setShowForm(true);
  };

  const closeNewForm = () => {
    setShowForm(false);
    setFormData(emptyForm);
    setErrors({});
  };

  const handleEditSave = async (addressId) => {
    if (!validateForm(editData)) return;

    const body = {
      first_name: editData.firstName,
      last_name: editData.lastName,
      address: editData.address,
      city: editData.city,
      state: editData.state,
      pincode: editData.pinCode,
      phone_number: editData.phone,
      // address_type: editData.addressType || "HOME",
      is_default: editData.isDefault ?? false,
    };

    try {
      const response = await fetch(
        ADDRESS_API.UPDATE_ADDRESS(userId, addressId),
        {
          method: "PUT", // change to "PATCH" if your backend uses PATCH
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        },
      );
      const data = await response.json();

      if (response.ok && data.statusCode === 200) {
        const a = data.data;
        // Update only this address in the list using the API response
        setSavedAddresses((prev) =>
          prev.map((addr) =>
            addr.id === addressId
              ? {
                id: a.address_id,
                firstName: a.first_name,
                lastName: a.last_name,
                address: a.address,
                city: a.city,
                state: a.state,
                pinCode: a.pincode,
                phone: a.phone_number,
                addressType: a.address_type,
                isDefault: a.is_default,
              }
              : addr,
          ),
        );
        setEditingId(null);
        setErrors({});
        toast.success(data.message);
      } else {
        toast.error(data.message || "Failed to update address");
      }
    } catch (error) {
      console.error("Address update error:", error);
      toast.error("Something went wrong while updating the address");
    }
  };

  const handleDelete = async (addressId) => {
    setIsDeleting(true);
    try {
      const response = await fetch(
        ADDRESS_API.DELETE_ADDRESS(userId, addressId),
        {
          method: "DELETE",
        },
      );

      // Some backends return an empty body for DELETE, so parse safely
      let data = {};
      try {
        data = await response.json();
      } catch (e) {
        data = {};
      }

      const isSuccess =
        response.ok &&
        (data.statusCode === undefined || data.statusCode === 200);

      if (isSuccess) {
        const remaining = savedAddresses.filter(
          (addr) => addr.id !== addressId,
        );
        setSavedAddresses(remaining);

        if (selectedId === addressId) {
          setSelectedId(remaining[0]?.id ?? null);
        }
        if (editingId === addressId) {
          setEditingId(null);
        }
        if (remaining.length === 0) {
          setShowForm(true);
        }
        toast.success(data.message || "Address removed");
      } else {
        toast.error(data.message || "Failed to delete address");
      }
    } catch (error) {
      console.error("Address delete error:", error);
      toast.error("Something went wrong while deleting the address");
    } finally {
      setIsDeleting(false);
      setDeleteId(null); // closes the dialog
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isOrderDisabled) return;

    let deliveryData;
    if (showForm) {
      if (!validateForm(formData)) {
        toast.error("Please fill all details in the form", {
          position: "top-right",
        });
        return;
      }
      deliveryData = formData;
    } else {
      deliveryData = savedAddresses.find((a) => a.id === selectedId);
      if (!deliveryData) {
        toast.error("Please select a delivery address");
        return;
      }
    }

    const orderPayload = {
      user_id: Number(userId),
      is_new_address: showForm,
      first_name: deliveryData.firstName,
      last_name: deliveryData.lastName,
      address: deliveryData.address,
      city: deliveryData.city,
      state: deliveryData.state,
      pincode: deliveryData.pinCode,
      phonenumber: deliveryData.phone,
      delivery_charges: DELIVERY_CHARGES,
    };

    setIsPlacingOrder(true);
    try {
      const response = await fetch(ORDERS_API.ADD_ORDER, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });
      const data = await response.json();

      if (response.ok && data.statusCode === 200) {
        if (showForm) {
          closeNewForm();
          await fetchAddresses(true);
        }
        toast.success(data.message);
        setCartItems([]);
        setTotalAmount(0);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Order submission error:", error);
      toast.error("Something went wrong while placing the order");
    } finally {
      setIsPlacingOrder(false);
    }
  };

  const renderAddressFields = (values, onChange) => (
    <>
      <Row className="mb-1">
        <Col md={6}>
          <Form.Group>
            <Form.Label className="checkout-label">First Name</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              placeholder="First name"
              onChange={onChange}
              value={values.firstName}
              className="checkout-input-field"
            />
            {errors.firstName && (
              <span className="text-danger">{errors.firstName}</span>
            )}
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label className="checkout-label">Last Name</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              placeholder="Last name"
              onChange={onChange}
              value={values.lastName}
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
          onChange={onChange}
          value={values.address}
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
              onChange={onChange}
              value={values.city}
              className="checkout-input-field"
            />
            {errors.city && <span className="text-danger">{errors.city}</span>}
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group>
            <Form.Label className="checkout-label">State</Form.Label>
            <Form.Control
              type="text"
              name="state"
              placeholder="State"
              onChange={onChange}
              value={values.state}
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
              onChange={onChange}
              value={values.pinCode}
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
          onChange={onChange}
          value={values.phone}
          className="checkout-input-field"
        />
        {errors.phone && <span className="text-danger">{errors.phone}</span>}
      </Form.Group>
    </>
  );

  return (
    <Container fluid className="payment-gateway-container">
      <Row>
        <Col md={8} className="mb-4 paymentgateway-inputcode">
          <Card className="p-4 paymentgateway-cards">
            <h4 className="mb-3">Delivery Information</h4>

            <Form onSubmit={handleSubmit}>
              <div className="d-flex flex-column gap-3">
                {/* Saved addresses */}
                {savedAddresses.map((addr) => {
                  const isEditing = editingId === addr.id;
                  // No saved address looks selected while the new address form is open
                  const isSelected = !showForm && selectedId === addr.id;

                  return (
                    <div
                      key={addr.id}
                      className={`saved-addr-card ${isSelected ? "selected" : ""}`}
                      onClick={() => {
                        if (isEditing) return;
                        setShowForm(false);
                        setErrors({});
                        setSelectedId(addr.id);
                      }}
                    >
                      {isEditing ? (
                        <div onClick={(e) => e.stopPropagation()}>
                          {renderAddressFields(editData, (e) =>
                            setEditData({
                              ...editData,
                              [e.target.name]: e.target.value,
                            }),
                          )}
                          <div className="d-flex gap-2 mt-2">
                            <Button
                              type="button"
                              size="sm"
                              variant="success"
                              onClick={() => handleEditSave(addr.id)}
                            >
                              Save
                            </Button>
                            <Button
                              type="button"
                              size="sm"
                              variant="outline-secondary"
                              onClick={() => {
                                setEditingId(null);
                                setErrors({});
                              }}
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <label
                            className="d-flex align-items-center gap-2 mb-2"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <input
                              type="radio"
                              name="selectedAddress"
                              checked={isSelected}
                              onChange={() => {
                                setShowForm(false);
                                setErrors({});
                                setSelectedId(addr.id);
                              }}
                            />
                            <strong>Deliver to this address</strong>
                          </label>
                          <div className="ps-4">
                            <div className="fw-semibold">
                              {addr.firstName} {addr.lastName}
                            </div>
                            <div>
                              {addr.address}, {addr.city}, {addr.state} -{" "}
                              {addr.pinCode}
                            </div>
                            <div>{addr.phone}</div>
                          </div>
                          <div
                            className="d-flex justify-content-end gap-3 mt-2"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <button
                              type="button"
                              className="addr-action-btn"
                              onClick={() => {
                                setShowForm(false);
                                setEditingId(addr.id);
                                setEditData(addr);
                                setErrors({});
                              }}
                            >
                              <FaEdit /> Edit
                            </button>
                            <button
                              type="button"
                              className="addr-action-btn"
                              onClick={() => setDeleteId(addr.id)}
                            >
                              <FaTrash /> Delete
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}

                {!showForm && !isLoadingAddresses && (
                  <button
                    type="button"
                    className="add-addr-card"
                    onClick={openNewForm}
                  >
                    <FaPlus /> Add New Address
                  </button>
                )}

                {showForm && (
                  <div className="new-addr-box">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <span className="new-addr-title">New Address</span>
                      {savedAddresses.length > 0 && (
                        <button
                          type="button"
                          className="addr-action-btn"
                          onClick={closeNewForm}
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                    {renderAddressFields(formData, handleChange)}
                  </div>
                )}
              </div>

              <Button
                type="submit"
                variant="primary"
                disabled={isOrderDisabled}
                className="w-100 mt-4 payment_gateway-btn"
              >
                {isPlacingOrder ? "Placing Order..." : "Order Now"}
              </Button>
            </Form>
          </Card>
        </Col>

        {/* Order Summary Section */}
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
                <p className="paymentgateway-box-left-para">
                  ₹{Number(item.quantity) * Number(item.price)}
                </p>
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
      {/* Confirm dailog for DELETE */}
      <Modal
        show={deleteId !== null}
        onHide={() => !isDeleting && setDeleteId(null)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: "18px" }}>Delete Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this address? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-secondary"
            disabled={isDeleting}
            onClick={() => setDeleteId(null)}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            disabled={isDeleting}
            onClick={() => handleDelete(deleteId)}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default CheckoutProcess;
