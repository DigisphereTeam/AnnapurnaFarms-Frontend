import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Form, Spinner } from "react-bootstrap";
import { BASE_URL, ORDERS_API } from "../../api/api";
import "./UserOrders.css";

const UserOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState({
    Delivered: false,
    // "On the way": false,
    Shipped: false,
    Confirmed: false,
    Cancelled: false,
    // Processing: false,
    Pending: false,
  });
  const [selectedYears, setSelectedYears] = useState({
    2026: false,
    2027: false,
    2028: false,
    2029: false,
    2030: false,
  });

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) {
      navigate("/signin");
    } else {
      const fetchOrders = async () => {
        try {
          setLoading(true);
          const res = await fetch(ORDERS_API.GET_ORDER_DETAILS_BY_USER, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ user_id: userId }),
          });

          const data = await res.json();
          if (res.ok && data.statusCode === 200) {
            // Flatten items and attach order info
            const allItems = data.orders.flatMap((order) =>
              order.items.map((item) => ({
                ...item,
                order_id: order.order_id,
                order_date: order.order_date,
                order_status: order.order_status,
                year: new Date(order.order_date).getFullYear(),
              }))
            );
            setOrders(allItems);
          }
        } catch (error) {
          console.error("Error fetching orders:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchOrders();
    }
  }, [userId, navigate]);

  // Handle status checkbox change
  const handleStatusChange = (e) => {
    const { name, checked } = e.target;
    setSelectedStatus((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  // Handle year checkbox change
  const handleYearChange = (e) => {
    const { name, checked } = e.target;
    setSelectedYears((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  // Clear All Filters
  const handleClearAll = () => {
    setSelectedStatus({
      Delivered: false,
      // "On the way": false,
      Shipped: false,
      Confirmed: false,
      Cancelled: false,
      // Processing: false,
      Pending: false,
    });
    setSelectedYears({
    2026: false,
    2027: false,
    2028: false,
    2029: false,
    2030: false,
    });
    setSearchTerm("");
  };

  // Filter orders based on search, selected status, and selected year
  const filteredOrders = orders.filter((item) => {
    const matchSearch = item.product_name
      .toLowerCase()
      .includes(searchTerm.toLowerCase().trim());

    const matchStatus = Object.values(selectedStatus).some((val) => val)
      ? selectedStatus[item.order_status]
      : true;

    const matchYear = Object.values(selectedYears).some((val) => val)
      ? selectedYears[item.year]
      : true;

    return matchSearch && matchStatus && matchYear;
  });

  return (
    <Container fluid className="user-orders-container mt-4 px-5 py-5">
      <Row>
        <Col md={3} className="border-end pe-3">
          <div className="d-flex justify-content-between align-items-center">
            <h5>Filters</h5>
            <span
              className="clear-all-filter"
              onClick={handleClearAll}
              size="sm"
            >
              Clear All
            </span>
          </div>

          <hr />

          {/* Order Status Filter */}
          <Form.Group className="mt-2">
            <Form.Label>Order Status</Form.Label>
            {Object.keys(selectedStatus).map((status) => (
              <Form.Check
                key={status}
                type="checkbox"
                label={status}
                name={status}
                checked={selectedStatus[status]}
                onChange={handleStatusChange}
                className="pb-1 custom-checkbox"
                controlId={`status-${status}`} 
              />
            ))}
          </Form.Group>

          <hr />

          {/* Order Year Filter */}
          <Form.Group className="mt-2">
            <Form.Label>Order Year</Form.Label>
            {Object.keys(selectedYears).map((year) => (
              <Form.Check
                key={year}
                type="checkbox"
                label={year}
                name={year}
                checked={selectedYears[year]}
                onChange={handleYearChange}
                className="pb-1 custom-checkbox"
                controlId={`year-${year}`} 
              />
            ))}
          </Form.Group>
        </Col>

        <Col md={9} className="ps-4">
          <Row>
            <Col className="mb-5">
              <Form.Group controlId="search">
                <Form.Control
                  type="text"
                  placeholder="Search orders..."
                  value={searchTerm}
                  className="order-input-field"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Render the filtered orders */}
          {loading ? (
            <div className="text-center my-5">
              <Spinner animation="border" />
              <p>Loading orders...</p>
            </div>
          ) : filteredOrders.length > 0 ? (
            filteredOrders.map((item, index) => (
              <Card key={index} className="mb-3">
                <Card.Body>
                  <Row>
                    {/* Image Column */}
                    <Col md={3}>
                      <img
                        src={`${BASE_URL}/${item.product_image}`}
                        alt={item.product_name}
                        className="img-fluid"
                        style={{ maxHeight: "100px", objectFit: "cover" }} // Adjust styling as needed
                      />
                    </Col>

                    {/* Order Details Column */}
                    <Col
                      md={5}
                      className="d-flex flex-column justify-content-center"
                    >
                      <h6>{item.product_name}</h6>
                      <p>
                        Weight: {item.grams} | Quantity: {item.quantity} |
                        Price: ₹{item.price} <br />
                        Ordered On:{" "}
                        {new Date(item.order_date).toLocaleDateString()}
                      </p>
                    </Col>

                    {/* Status Column */}
                    <Col
                      md={4}
                      className="text-end d-flex flex-column justify-content-center"
                    >
                      <span style={{ fontWeight: "bold", color: "#333" }}>
                        {item.order_status}
                      </span>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            ))
          ) : (
            <p>No orders found.</p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default UserOrders;
