import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Form,
  Button,
  Container,
  Card,
  Row,
  Col,
  Image,
  InputGroup,
} from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { User_SignIn } from "../../api/api";

import "./SignIn.css";

import Logo from "../../assets/annapurna_logo.png";

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      navigate("/");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields!");
      return;
    }

    try {
      const response = await fetch(User_SignIn, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (data.statusCode === 200) {
        toast.success(data.message);

        localStorage.setItem("userId", data.user.user_id);

        navigate("/");
      } else {
        toast.error(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login Error:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <Container fluid className="signin-container">
      <Row className="vh-100">
        {/* Left Side - Full Image (6 Columns) */}
        <Col
          md={6}
          className="d-none d-md-flex align-items-center justify-content-center signin-image"
        >
          <div className="text-center">
            <h1 className="text-white">Welcome Back!</h1>
            <p className="text-white">
              Join us today and explore new opportunities.
            </p>
            <Link to="/signup" className="btn custom-btn mt-1">
              Create an Account
            </Link>
          </div>
        </Col>

        {/* Right Side - Sign In Form (6 Columns) */}
        <Col
          md={6}
          className="d-flex align-items-center justify-content-center"
        >
          <Card className="signin-form">
            {/* Logo on Top */}
            <div className="text-start mb-3">
              <Link to="/">
                <Image src={Logo} alt="Logo" className="signin-logo" />
              </Link>
            </div>

            <h3 className="text-start mb-4 signin-page-title">Sign In</h3>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Label className="signin-input-label">Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email"
                  className="signin-input-field"
                />
              </Form.Group>

              {/* Password Field with Show/Hide Toggle */}
              <Form.Group controlId="formPassword" className="mb-3">
                <Form.Label className="signin-input-label">Password</Form.Label>
                <InputGroup>
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="Enter your password"
                    className="signin-input-field"
                  />
                  <InputGroup.Text
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ cursor: "pointer" }}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </InputGroup.Text>
                </InputGroup>
              </Form.Group>

              {/* Forgot Password Link */}
              <div className="d-flex justify-content-between mb-3">
                <Link to="/signup" className="sigin-create-account">
                  Create an account
                </Link>
                <Link to="/forgot-password" className="sigin-create-account">
                  Forgot Password?
                </Link>
              </div>

              <Button variant="success" type="submit" className="signin-btn">
                Sign In
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignIn;
