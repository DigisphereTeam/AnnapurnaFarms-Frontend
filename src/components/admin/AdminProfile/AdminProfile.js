import React from "react";
import { Container, Table } from "react-bootstrap";

import "./AdminProfile.css";

const AdminProfile = () => {
  return (
    <Container fluid className="mt-4">
      <h4 className="mb-4 fw-semibold">Admin Profile</h4>
      <div className="table-responsive">
        <Table bordered className="profile-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            <tr className="profile-row">
              <td>Admin Name</td>
              <td id="admin-name">Annapurna farms</td>
            </tr>
            <tr  className="profile-row">
              <td>Mobile</td>
              <td id="admin-mobile">8179783793</td>
            </tr>
            <tr  className="profile-row">
              <td>Email</td>
              <td id="admin-email">support@annapurnafarms.in</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default AdminProfile;
