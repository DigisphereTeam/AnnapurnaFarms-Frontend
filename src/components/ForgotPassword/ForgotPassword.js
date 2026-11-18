import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Card,
  InputGroup,
} from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

import { FORGOT_PASSWORD_API } from "../../api/api";

import Logo from "../../assets/annapurna_logo.png";

import "./ForgotPassword.css";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    otp: "",
    password: "",
    confirmPassword: "",
  });

  const [showOtpInput, setShowOtpInput] = useState(false);
  const [showResetInputs, setShowResetInputs] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(FORGOT_PASSWORD_API.FORGOT_PASSWORD, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email }),
      });

      const data = await res.json();

      if (data.statusCode === 200) {
        toast.success(data.message);
        setShowOtpInput(true);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(FORGOT_PASSWORD_API.VERIFY_OTP, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          otp: form.otp,
        }),
      });

      const data = await res.json();

      if (data.statusCode === 200) {
        toast.success(data.message);
        setShowResetInputs(true);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("OTP verification failed");
    }
  };

  const validatePassword = () => {
    const pattern = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}/;

    if (!pattern.test(form.password)) {
      toast.error("Min 8 chars with uppercase, lowercase, number & symbol");
      return false;
    }

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match!");
      return false;
    }

    return true;
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!validatePassword()) return;

    try {
      const res = await fetch(FORGOT_PASSWORD_API.RESET_PASSWORD, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
          confirm_password: form.confirmPassword,
        }),
      });

      const data = await res.json();

      if (data.statusCode === 200) {
        toast.success(data.message);

        // optional redirect
        navigate("/signin");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error");
    }
  };

  return (
    <Container fluid className="forget-container">
      <Row className="w-100">
        <Col md={6} className="forget-image">
          <div>
            <h1>Forgot Password?</h1>
            <p>Enter your email to receive an OTP for password reset</p>
          </div>
        </Col>
        <Col
          md={6}
          className="d-flex justify-content-center align-items-center"
        >
          <Card className="forget-form">
            <div className="text-start mb-3">
              <Link to="/">
                <img src={Logo} alt="Logo" className="forget-logo" />
              </Link>
            </div>
            <h2 className="text-start mb-4 forgot-password-title">
              Reset Password
            </h2>
            <Form
              onSubmit={
                !showOtpInput
                  ? handleSendOtp
                  : !showResetInputs
                    ? handleVerifyOtp
                    : handleResetPassword
              }
            >
              {!showOtpInput && (
                <Form.Group controlId="formEmail" className="mb-3">
                  <Form.Label className="signin-input-label">Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email"
                    className="forget-input-field"
                  />
                </Form.Group>
              )}

              {/* OTP */}
              {showOtpInput && !showResetInputs && (
                <Form.Group controlId="formOtp" className="mb-3">
                  <Form.Label>Enter OTP</Form.Label>
                  <Form.Control
                    type="text"
                    name="otp"
                    value={form.otp}
                    onChange={handleChange}
                    required
                    placeholder="Enter OTP"
                  />
                </Form.Group>
              )}

              {/* PASSWORD */}
              {showResetInputs && (
                <>
                  <Form.Group controlId="formNewPassword" className="mb-3">
                    <Form.Label>New Password</Form.Label>
                    <InputGroup>
                      <Form.Control
                        type={showNewPassword ? "text" : "password"}
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                        placeholder="Enter new password"
                      />
                      <InputGroup.Text
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        style={{ cursor: "pointer" }}
                      >
                        {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                      </InputGroup.Text>
                    </InputGroup>
                  </Form.Group>

                  <Form.Group controlId="formConfirmPassword" className="mb-3">
                    <Form.Label>Confirm Password</Form.Label>
                    <InputGroup>
                      <Form.Control
                        type={showConfirmNewPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        required
                        placeholder="Confirm new password"
                      />
                      <InputGroup.Text
                        onClick={() =>
                          setShowConfirmNewPassword(!showConfirmNewPassword)
                        }
                        style={{ cursor: "pointer" }}
                      >
                        {showConfirmNewPassword ? <FaEyeSlash /> : <FaEye />}
                      </InputGroup.Text>
                    </InputGroup>
                  </Form.Group>
                </>
              )}

              <Button
                variant="success"
                type="submit"
                className="forget-btn w-100"
              >
                {!showOtpInput
                  ? "Send OTP"
                  : !showResetInputs
                    ? "Verify OTP"
                    : "Reset Password"}
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ForgotPassword;
