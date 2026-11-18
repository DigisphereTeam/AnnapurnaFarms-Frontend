import React, { useEffect, useState, useRef } from "react";
import {
  Container,
  Form,
  Button,
  Row,
  Col,
  Table,
  Modal,
} from "react-bootstrap";

import "./AdminCoupons.css";
import { toast } from "react-toastify";
import { FaTrashAlt } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { COUPONS_API } from "../../../api/api";

const AdminCoupons = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [CouponCode, SetCouponCode] = useState("");
  const [Discount, SetDiscount] = useState("");
  const [StartDate, SetStartDate] = useState("");
  const [ExpiryDate, SetExpiryDate] = useState("");
  const [Amount, SetAmount] = useState("");
  const [Status, SetStatus] = useState("");

  const [GetCouponsData, SetGetCoupons] = useState([]);

  const formRef = useRef(null);

  useEffect(() => {
    Get_Coupons_Data_List();
  }, []);

  const Get_Coupons_Data_List = async () => {
    try {
      const response = await fetch(COUPONS_API.GET_ALL);
      const data = await response.json();
      SetGetCoupons(data.coupons);
      // console.log(data.coupons);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const AddBtn = async (e) => {
    e.preventDefault();
    if (
      !CouponCode ||
      !Discount ||
      !StartDate ||
      !ExpiryDate ||
      !Amount ||
      !Status
    ) {
      toast.error("Please fill in all fields!");
      return;
    }

    try {
      const response = await fetch(COUPONS_API.ADD, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          coupon_code: CouponCode,
          discount: Discount,
          amount: Amount,
          start_date: StartDate,
          expairy_date: ExpiryDate,
          status: Status,
        }),
      });

      const data = await response.json();
      // console.log("add coupons", data);
      if (response.ok) {
        toast.success(data.message);
        SetCouponCode("");
        SetDiscount("");
        SetStartDate("");
        SetExpiryDate("");
        SetAmount("");
        SetStatus("");
        Get_Coupons_Data_List();
      } else {
        toast.error(data.message);
        // console.log(data.message);
      }
    } catch (error) {
      // toast.error("Something went wrong. Please try again!");
      console.error("Error:", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const [CouponID, SetCouponID] = useState("");

  const DeleteModalBtn = (item) => {
    setShowDeleteModal(true);
    SetCouponID(item.coupon_id);
  };

  const DeleteBtn = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(COUPONS_API.DELETE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          coupon_id: CouponID,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
        setShowDeleteModal(false);
        Get_Coupons_Data_List();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      // toast.error("Something went wrong. Please try again!");
      console.error("Error:", error);
    }
  };

  const [UpdateItem, SetUpdateItem] = useState(false);

  const EditBtn = (item) => {
    SetUpdateItem(true);

    SetCouponID(item.coupon_id);
    SetCouponCode(item.coupon_code);
    SetDiscount(item.discount);
    SetStartDate(item.start_date.split("T")[0]);
    SetExpiryDate(item.expairy_date.split("T")[0]);
    SetAmount(item.amount);
    SetStatus(item.status);

    formRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const UpdateBtn = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(COUPONS_API.UPDATE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          coupon_id: CouponID,
          coupon_code: CouponCode,
          discount: Discount,
          amount: Amount,
          start_date: StartDate,
          expairy_date: ExpiryDate,
          status: Status,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        Get_Coupons_Data_List();
        SetUpdateItem(false);
        SetCouponCode("");
        SetDiscount("");
        SetStartDate("");
        SetExpiryDate("");
        SetAmount("");
        SetStatus("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      // toast.error("Something went wrong. Please try again!");
      console.error("Update Error:", error);
    }
  };

  const ResetForm = () => {
    SetCouponCode("");
    SetDiscount("");
    SetStartDate("");
    SetExpiryDate("");
    SetAmount("");
    SetStatus("");
    SetCouponID("");
    SetUpdateItem(false);
  };

  return (
    <section className="admin-products-container">
      <Container fluid>
        <h4 className="admin-dashboard-overall-heading">Coupons Management</h4>
        <Form className="mt-4" ref={formRef}>
          <Row className="gy-3">
            <Col md={4} sm={12}>
              <Form.Group>
                <Form.Label className="coupons-label">Coupon Code</Form.Label>
                <Form.Control
                  className="product-input-field"
                  type="text"
                  placeholder="Enter Coupon name"
                  value={CouponCode}
                  onChange={(e) => SetCouponCode(e.target.value)}
                />
              </Form.Group>
            </Col>

            <Col md={4} sm={12}>
              <Form.Group>
                <Form.Label className="coupons-label">Discount %</Form.Label>
                <Form.Control
                  className="product-input-field"
                  type="number"
                  placeholder="Enter Discount %"
                  value={Discount}
                  onChange={(e) => SetDiscount(e.target.value)}
                />
              </Form.Group>
            </Col>

            <Col md={4} sm={12}>
              <Form.Group>
                <Form.Label className="coupons-label">Amount</Form.Label>
                <Form.Control
                  className="product-input-field"
                  type="text"
                  placeholder="Enter Amount"
                  value={Amount}
                  onChange={(e) => SetAmount(e.target.value)}
                />
              </Form.Group>
            </Col>

            <Col md={4} sm={12}>
              <Form.Group>
                <Form.Label className="coupons-label">Start Date</Form.Label>
                <Form.Control
                  className="product-input-field"
                  type="date"
                  value={StartDate}
                  onChange={(e) => SetStartDate(e.target.value)}
                />
              </Form.Group>
            </Col>

            <Col md={4} sm={12}>
              <Form.Group>
                <Form.Label className="coupons-label">End Date</Form.Label>
                <Form.Control
                  className="product-input-field"
                  type="date"
                  value={ExpiryDate}
                  onChange={(e) => SetExpiryDate(e.target.value)}
                />
              </Form.Group>
            </Col>

            <Col md={4} sm={12}>
              <Form.Group>
                <Form.Label className="coupons-label">Status</Form.Label>
                <Form.Select
                  className="product-input-field"
                  value={Status}
                  onChange={(e) => SetStatus(e.target.value)}
                >
                  <option value="">Select Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col sm={12} className="text-center">
              {!UpdateItem ? (
                <Button
                  className="admin-dashboard-add-coupons-button"
                  onClick={AddBtn}
                >
                  Add Coupon
                </Button>
              ) : (
                <>
                  <Button
                    className="admin-dashboard-add-coupons-button me-2"
                    onClick={UpdateBtn}
                  >
                    Update Coupon
                  </Button>
                  <Button
                    variant="secondary"
                    className="add-product-cancel"
                    onClick={ResetForm}
                  >
                    Cancel
                  </Button>
                </>
              )}
            </Col>
          </Row>
        </Form>

        <section>
          <Table bordered className="mt-4 admin-dash-coupons-table">
            <thead>
              <tr className="product-head">
                <th>S.No</th>
                <th>Coupon Code</th>
                <th>Coupon Discount %</th>
                <th>Amount</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {GetCouponsData.length > 0 ? (
                GetCouponsData.map((item, index) => (
                  <tr key={index} className="admin-dash-coupons-row">
                    <td className="p-3">{index + 1}</td>
                    <td>{item.coupon_code}</td>
                    <td>{item.discount}</td>
                    <td>{item.amount}</td>
                    <td>{formatDate(item.start_date)}</td>
                    <td>{formatDate(item.expairy_date)}</td>
                    <td>{item.status || "null "}</td>
                    <td>
                      <FiEdit
                        className="admin-coupons-action-icon admin-coupons-edit-icon me-3"
                        onClick={() => EditBtn(item)}
                      />
                      <FaTrashAlt
                        className="admin-coupons-action-icon admin-coupons-delete-icon"
                        onClick={() => DeleteModalBtn(item)}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="empty-coupon-row">
                  <td colSpan="8" className="text-center py-4">
                    No Coupons Found
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </section>

        <Modal
          show={showDeleteModal}
          onHide={() => setShowDeleteModal(false)}
          centered
        >
          <Modal.Body>
            <h2
              style={{
                textAlign: "center",
                fontWeight: "600",
                fontSize: "18px",
                fontFamily: '"Inter", "Poppins", sans-serif',
              }}
              className="mt-3"
            >
              Do you want to Delete this Coupon ?
            </h2>
          </Modal.Body>
          <Modal.Footer
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "0px",
              border: "none",
            }}
          >
            <Button
              style={{ backgroundColor: "#ED1D1D", border: "none" }}
              onClick={DeleteBtn}
            >
              Yes,Delete
            </Button>
            <Button
              style={{ backgroundColor: "#304D30", border: "none" }}
              onClick={() => setShowDeleteModal(false)}
            >
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </section>
  );
};

export default AdminCoupons;
