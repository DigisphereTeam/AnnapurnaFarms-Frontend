import React, { useState, useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import { NOTIFY_API } from "../../../api/api";
import "./AdminNotify.css";

const AdminNotify = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch(NOTIFY_API.GET_NOTIFY_REQUEST);
        const data = await response.json();
        if (data.statusCode === 200) {
          setNotifications(data.data); // Set API data to state
        } else {
          toast.error(`Failed to fetch notifications: ${data.message}`);
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <section className="admin-notify-container">
      <Container fluid>
        <h4 className="admin-dashboard-overall-heading">
          Customer Notifications
        </h4>
        <div className="table-responsive">
          <Table bordered className="notify-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Customer Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Product Name</th>
                <th>Grams</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {notifications.length > 0 ? (
                notifications.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.first_name || "-"}</td>
                    <td>{item.user_email || "-"}</td>
                    <td>{item.phone_number || "-"}</td>
                    <td>{item.product_name || "-"}</td>
                    <td>{item.grams || "-"}</td>
                    <td>{item.price || "-"}</td>
                    <td>{item.stock || "-"}</td>
                    <td>{item.status || "-"}</td>
                  </tr>
                ))
              ) : (
                <tr className="empty-notify-row">
                  <td colSpan="9" className="text-center py-4">
                    No Notifications Found
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </Container>
    </section>
  );
};

export default AdminNotify;
