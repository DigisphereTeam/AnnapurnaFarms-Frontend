import React, { useEffect, useState } from "react";
import { Card, Row, Col, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { DASHBOARD_API } from "../../../api/api";
import { toast } from "react-toastify";

import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState({
    products: {},
    orders: {},
    coupons: {},
    payments: {},
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch(DASHBOARD_API.ORDER_STATUS_COUNT);
        const data = await response.json();

        if (data.statusCode === 200) {
          setDashboardData(data.data);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.error("Error fetching dashboard count:", error);
      }
    };

    fetchDashboardData();
  }, []);

  const Product_management = [
    {
      title: "Total Product Sale",
      count: dashboardData.products?.sales_count || 0,
    },
    {
      title: "Total Category Count",
      count: dashboardData.products?.category_count || 0,
    },
    {
      title: "Total Product Count",
      count: dashboardData.products?.total_count || 0,
    },
    {
      title: "Total Hidden Product",
      count: dashboardData.products?.hidden_count || 0,
    },
  ];

  const Coupons_Management = [
    {
      title: "Active Coupons Count",
      count: dashboardData.coupons?.active_count || 0,
    },
    {
      title: "Inactive Coupons Count",
      count: dashboardData.coupons?.inactive_count || 0,
    },
    {
      title: "Coupons Usage Users",
      count: dashboardData.coupons?.users_usage_count || 0,
    },
    {
      title: "Total Added Coupons",
      count: dashboardData.coupons?.total_count || 0,
    },
  ];

  const Order_Management = [
    {
      title: "Total Confirmed Orders",
      count: dashboardData.orders?.confirmed_count || 0,
      status: "Confirmed",
    },
    {
      title: "Total Delivered Orders",
      count: dashboardData.orders?.delivered_count || 0,
      status: "Delivered",
    },
    {
      title: "Total Pending Orders",
      count: dashboardData.orders?.pending_count || 0,
      status: "Pending",
    },
    {
      title: "Total Shipped Orders",
      count: dashboardData.orders?.shipped_count || 0,
      status: "Shipped",
    },
  ];

  const Payment_Management = [
    {
      title: "Pending Settlements",
      count: `Rs. ${dashboardData.payments?.pending_settlements_amount || 0}`,
    },
    {
      title: "Total Successful Payments",
      count: `Rs. ${dashboardData.payments?.total_successful_payments_amount || 0}`,
    },
    {
      title: "Total Settled Amount",
      count: `Rs. ${dashboardData.payments?.total_settled_amount || 0}`,
    },
    {
      title: "Failed Transactions",
      count: `Rs. ${dashboardData.payments?.failed_transactions_amount || 0}`,
    },
  ];

  return (
    <section className="admin-dashboard-overall-count">
      <Container fluid className="mt-3">
        <h4 className="admin-dashboard-overall-heading">Dashboard</h4>
        <Row className="g-3">
          {Product_management.map((item, index) => (
            <Col key={index} xl={3} lg={4} md={6} sm={12}>
              <Card className="admin-dashboard-overall-product-card">
                <Card.Body className="d-flex flex-column align-items-center justify-content-center">
                  <Card.Title className="admin-dashboard-overall-title-card-product">
                    {item.title}
                  </Card.Title>
                  <h4 className="admin-dashboard-overall-product-count-card">
                    {item.count}
                  </h4>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <h4 className="admin-dashboard-overall-sub-heading">Coupons</h4>
        <Row className="g-3">
          {Coupons_Management.map((item, index) => (
            <Col key={index} xl={3} lg={4} md={6} sm={12}>
              <Card className="admin-dashboard-overall-coupon-card">
                <Card.Body className="d-flex flex-column align-items-center justify-content-center">
                  <Card.Title className="admin-dashboard-overall-coupons-title-card">
                    {item.title}
                  </Card.Title>
                  <h6 className="admin-dashboard-overall-coupons-count-card">
                    {item.count}
                  </h6>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <h4 className="admin-dashboard-overall-sub-heading">Payment</h4>
        <Row className="g-3">
          {Payment_Management.map((item, index) => (
            <Col key={index} xl={3} lg={4} md={6} sm={12}>
              <Card className="admin-dashboard-overall-payment-card">
                <Card.Body className="d-flex flex-column align-items-center justify-content-center">
                  <Card.Title className="admin-dashboard-overall-card-title-payment">
                    {item.title}
                  </Card.Title>
                  <h4 className="admin-dashboard-overall-card-count-payment">
                    {item.count}
                  </h4>
                </Card.Body>
                {/* <Card.Footer>
                  <Row>
                    <Col className="d-flex align-items-center justify-content-between">
                      <span className="admin-dashboard-overall-value-payment">
                        {item.value}
                      </span>
                      <span>{item.icon}</span>
                    </Col>
                  </Row>
                </Card.Footer> */}
              </Card>
            </Col>
          ))}
        </Row>

        <h4 className="admin-dashboard-overall-sub-heading">Orders</h4>
        <Row className="g-3">
          {Order_Management.map((item, index) => (
            <Col key={index} xl={3} lg={4} md={6} sm={12}>
              <Card className="admin-dashboard-overall-order-card">
                <Card.Body className="d-flex flex-column align-items-center justify-content-center">
                  <Card.Header>
                    <Card.Title className="admin-dashboard-overall-order-title-card">
                      {item.title}
                    </Card.Title>
                    <h4 className="admin-dashboard-overall-order-count-card">
                      {item.count}
                    </h4>
                  </Card.Header>
                </Card.Body>
                <Card.Footer>
                  <Button
                    variant="link"
                    className="admin-dashboard-overall-more-info-order"
                    onClick={() => {
                      navigate("/admin-dashboard/orders", {
                        state: { status: item.status },
                      });
                    }}
                  >
                    More info &nbsp;
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Dashboard;
