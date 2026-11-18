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
import { User_SignUp } from "../../api/api";

import "./SignUp.css";

import Logo from "../../assets/annapurna_logo.png";

const SignUp = () => {
  const navigate = useNavigate();
  const [userSignupData, setUserSignupData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      navigate("/");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setUserSignupData({ ...userSignupData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { firstName, lastName, email, phone, password, confirmPassword } =
      userSignupData;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !password ||
      !confirmPassword
    ) {
      toast.error("All fields are required!");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Invalid email format!");
      return false;
    }

    if (!/^\d{10}$/.test(phone)) {
      toast.error("Phone number must be exactly 10 digits!");
      return false;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters!");
      return false;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Prepare data for the POST request
      const userFormData = {
        first_name: userSignupData.firstName,
        last_name: userSignupData.lastName,
        email: userSignupData.email,
        phone_number: userSignupData.phone,
        password: userSignupData.password,
        confirm_password: userSignupData.confirmPassword,
      };

      try {
        const apiResponse = await fetch(User_SignUp, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userFormData),
        });

        const userApiAata = await apiResponse.json();

        if (userApiAata.statusCode === 200) {
          toast.success(userApiAata.message);
          setUserSignupData({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            password: "",
            confirmPassword: "",
          });

          navigate("/signin");
        } else {
          toast.error(userApiAata.message || "An error occurred!");
        }
      } catch (error) {
        console.error("Error creating account:", error);
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <Container fluid className="signup-container overflow-hidden">
      <Row className="w-100">
        <Col md={6} className="signup-image">
          <div>
            <h1>Join Us Today</h1>
            <p>Create an account to access exclusive features</p>
          </div>
        </Col>

        <Col
          md={6}
          className="d-flex justify-content-center align-items-center"
        >
          <Card className="signup-form p-4">
            <div className="text-start mb-2">
              <Link to="/">
                <img src={Logo} alt="Logo" className="signup-logo" />
              </Link>
            </div>
            <h2 className="signup-page-title mb-3">Register</h2>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col sm={6}>
                  <Form.Group controlId="formFirstName" className="mb-2">
                    <Form.Label className="singup-label">First Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="firstName"
                      value={userSignupData.firstName}
                      onChange={handleChange}
                      placeholder="Enter first name"
                      className="signup-input-field"
                    />
                  </Form.Group>
                </Col>
                <Col sm={6}>
                  <Form.Group controlId="formLastName" className="mb-2">
                    <Form.Label className="singup-label">Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="lastName"
                      value={userSignupData.lastName}
                      onChange={handleChange}
                      placeholder="Enter last name"
                      className="signup-input-field"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group controlId="formEmail" className="mb-2">
                <Form.Label className="singup-label">Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={userSignupData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="signup-input-field"
                />
              </Form.Group>

              <Form.Group controlId="formPhone" className="mb-2">
                <Form.Label className="singup-label">Phone Number</Form.Label>
                <Form.Control
                  type="tel"
                  name="phone"
                  value={userSignupData.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  className="signup-input-field"
                />
              </Form.Group>

              <Row>
                <Col sm={6}>
                  <Form.Group controlId="formPassword" className="mb-3">
                    <Form.Label className="singup-label">Password</Form.Label>
                    <InputGroup>
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={userSignupData.password}
                        onChange={handleChange}
                        placeholder="Enter password"
                        className="signup-input-field"
                      />
                      <InputGroup.Text
                        onClick={() => setShowPassword(!showPassword)}
                        style={{ cursor: "pointer" }}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </InputGroup.Text>
                    </InputGroup>
                  </Form.Group>
                </Col>

                <Col sm={6}>
                  <Form.Group controlId="formConfirmPassword" className="mb-3">
                    <Form.Label className="singup-label">Confirm Password</Form.Label>
                    <InputGroup>
                      <Form.Control
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={userSignupData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm password"
                        className="signup-input-field"
                      />
                      <InputGroup.Text
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        style={{ cursor: "pointer" }}
                      >
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                      </InputGroup.Text>
                    </InputGroup>
                  </Form.Group>
                </Col>
              </Row>

              <Button
                variant="success"
                type="submit"
                className="signup-btn w-100"
              >
                Create Account
              </Button>
            </Form>

            <p className="text-start mt-3 signup-links">
              Already have an account? <Link to="/signin">Sign In</Link>
            </p>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
