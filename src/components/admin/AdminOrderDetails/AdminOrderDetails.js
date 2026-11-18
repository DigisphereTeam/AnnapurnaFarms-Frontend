import React, { useState, useEffect } from "react";
import {
  Container,
  Table,
  Button,
  Modal,
  Form,
  Spinner,
} from "react-bootstrap";
import { BASE_URL, ORDERS_API, DASHBOARD_API } from "../../../api/api";

import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

import { MdVisibility } from "react-icons/md";

import "./AdminOrderDetails.css";

// STATUS FLOW
const statusFlow = ["Pending", "Confirmed", "Shipped", "Delivered"];

const getStatusIndex = (status) => statusFlow.indexOf(status);

const AdminOrderDetails = () => {
  const [orders, setOrders] = useState([]);
  const [orderProducts, setOrderProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const statusFromDashboard = location.state?.status || "All";

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          statusFromDashboard === "All"
            ? ORDERS_API.GET_ORDERS
            : DASHBOARD_API.GET_ORDERS_BY_STATUS,
          {
            method: statusFromDashboard === "All" ? "GET" : "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body:
              statusFromDashboard === "All"
                ? null
                : JSON.stringify({ status: statusFromDashboard }),
          },
        );

        const data = await response.json();
        if (data.statusCode === 200) {
          setOrders(data.data);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message || "Something went wrong");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [statusFromDashboard]);

  const fetchOrderProducts = async (orderId) => {
    try {
      const response = await fetch(ORDERS_API.GET_ORDER_PRODUCTS, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ order_id: orderId }),
      });

      const data = await response.json();
      if (data.statusCode === 200) {
        setOrderProducts(data.data); // Set the fetched order items into state
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
      console.error(error);
    }
  };

  const handleStatusChange = async (orderId, e) => {
    const newStatus = e.target.value;

    const previousOrders = [...orders];

    const updatedOrders = orders.map((order) =>
      order.order_id === orderId
        ? { ...order, order_status: newStatus }
        : order,
    );
    setOrders(updatedOrders);

    try {
      const response = await fetch(ORDERS_API.UPDATE_ORDER_STATUS, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          order_id: orderId,
          order_status: newStatus,
        }),
      });

      const data = await response.json();
      if (data.statusCode === 200) {
        toast.success(data.message);
      } else {
        setOrders(previousOrders);
        toast.error(data.message);
      }
    } catch (error) {
      setOrders(previousOrders);
      toast.error(error.message || "Something went wrong");
      console.error(error);
    }
  };

  const handleViewClick = async (order) => {
    await fetchOrderProducts(order.order_id);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setOrderProducts([]);
    setShowModal(false);
  };

  return (
    <section className="admin-orders-container">
      <Container fluid>
        <h4 className="admin-dashboard-orders-heading">
          {statusFromDashboard === "All"
            ? "All Orders"
            : `${statusFromDashboard} Orders`}
        </h4>

        {loading ? (
          <div className="text-center my-4">
            <Spinner animation="border" />
          </div>
        ) : (
          <div className="table-responsive">
            <Table bordered className="admin-order-table mt-4">
              <thead>
                <tr className="category-head">
                  <th>Date</th>
                  <th>Order ID</th>
                  <th>Customer Name</th>
                  <th>Customer Address</th>
                  <th>State</th>
                  <th>Pincode</th>
                  <th>PhoneNumber</th>
                  <th className="order-status-column"> Order Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
           {orders.length > 0 ? (
    orders.map((order) => (
                  <tr key={order.order_id} className="admin-orders-row">
                    <td>{new Date(order.order_date).toLocaleDateString()}</td>
                    <td>{order.order_number}</td>
                    <td>{`${order.first_name} ${order.last_name}`}</td>
                    <td>{`${order.address} ${order.city}`}</td>
                    <td>{order.state}</td>
                    <td>{order.pincode}</td>
                    <td>{order.phonenumber}</td>
                    <td className="order-status-column">
                      <Form.Select
                        className="admin-dash-order-status-select"
                        value={order.order_status}
                        onChange={(e) => handleStatusChange(order.order_id, e)}
                        size="sm"
                      >
                        {statusFlow.map((status, index) => (
                          <option
                            key={status}
                            value={status}
                            disabled={
                              index < getStatusIndex(order.order_status)
                            }
                          >
                            {status}
                          </option>
                        ))}
                      </Form.Select>
                    </td>
                    <td>
                      <Button
                        size="sm"
                        onClick={() => handleViewClick(order)}
                        className="admin-order-edit"
                      >
                        <MdVisibility />
                      </Button>
                    </td>
                  </tr>
                 ))
  ) : (
    <tr className="empty-order-row">
      <td colSpan="9" className="text-center py-4">
        No Orders Found
      </td>
    </tr>
  )}
              </tbody>
            </Table>
          </div>
        )}

        {/* Modal for Viewing Order Details */}
        <Modal
          show={showModal}
          onHide={handleCloseModal}
          className="admin-dashboard-order-model"
        >
          <Modal.Header closeButton>
            <Modal.Title className="admin-dashboard-order-model-title">
              Order Product Details
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {orderProducts.items && orderProducts.items.length > 0 ? (
              <>
                <ul className="product-list">
                  {orderProducts.items.map((product) => (
                    <li key={product.order_items_id} className="product-item">
                      <div className="product-info">
                        <img
                          src={`${BASE_URL}/${product.product_image}`}
                          alt={product.product_name}
                          className="product-image"
                        />
                        <div className="product-details">
                          <strong>
                            {product.product_name} - {product.quantity}
                            <span className="order-product-quantity">
                              {" "}
                              Qty{" "}
                            </span>
                            x {product.item_price}
                          </strong>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                {/* Total Amount */}
                <div className="admin-dashboard-order-model-total-amount">
                  <div className="">Total Amount : </div>
                  <div>Rs.{orderProducts.total_amount}/-</div>
                </div>
              </>
            ) : (
              <p>No products found for this order.</p>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </section>
  );
};

export default AdminOrderDetails;
