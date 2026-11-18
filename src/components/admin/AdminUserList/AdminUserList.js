import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { Get_All_User_Data } from "../../../api/api";
import "./AdminUserList.css";

const AdminUserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   fetch(Get_All_User_Data)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setUsers(data.users || []);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.error("Failed to fetch users:", error);
  //       setLoading(false);
  //     });
  // }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);

        const response = await fetch(Get_All_User_Data);
        const data = await response.json();

        if (data.statusCode === 200) {
          setUsers(data.users || []);
        } else {
          console.error("API Error:", data.message);
          setUsers([]);
        }
      } catch (error) {
        console.error("Failed to fetch users:", error);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p>Loading users...</p>;

  return (
    <section className="admin-products-container">
      <Container fluid>
        <h4 className="admin-dashboard-overall-heading">Users Management</h4>
        <div className="table-responsive">
          <Table bordered className="user-list-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Street</th>
                <th>City</th>
                <th>State</th>
                <th>Pincode</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user, index) => (
                  <tr key={user.user_id} className="user-list-row">
                    <td>{index + 1}</td>
                    <td>{user.first_name || "-"}</td>
                    <td>{user.last_name || "-"}</td>
                    <td>{user.email || "-"}</td>
                    <td>{user.phone_number || "-"}</td>
                    <td>{user.street || "-"}</td>
                    <td>{user.city || "-"}</td>
                    <td>{user.state || "-"}</td>
                    <td>{user.pincode || "-"}</td>
                  </tr>
                ))
              ) : (
                <tr className="empty-user-row">
                  <td colSpan="9" className="text-center py-4">
                    No Users Found
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

export default AdminUserList;
