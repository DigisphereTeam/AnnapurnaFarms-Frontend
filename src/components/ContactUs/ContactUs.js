import React, { useState } from "react";

import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./ContactUs.css";

import { CONTACT_API } from "../../api/api";

import { toast } from "react-toastify";
// Renaming the image import to avoid naming conflict
import contactImage from "../../assets/contact-img.jpg";

const ContactUs = () => {
 const [formData, setFormData] = useState({
    name: "",
    phone_number: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

   const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

    const validate = () => {
    const phoneRegex = /^[6-9]\d{9}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) {
      toast.error("Name is required");
      return false;
    }

    if (!phoneRegex.test(formData.phone_number)) {
      toast.error("Enter valid Indian mobile number");
      return false;
    }

    if (!emailRegex.test(formData.email)) {
      toast.error("Enter valid email");
      return false;
    }

    if (!formData.message.trim()) {
      toast.error("Message is required");
      return false;
    }

    return true;
  };


   const handleContactSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);

      const response = await fetch(CONTACT_API.CONTACT_US, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.statusCode === 200) {
        toast.success(result.message);

        setFormData({
          name: "",
          phone_number: "",
          email: "",
          message: "",
        });
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Contact API error:", error);
      // toast.error("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container fluid className="contact-container px-5 py-3">
      <Row className="align-items-center">
        {/* Form Section */}
        <Col md={6} className="contact-form">
          <h3>Contact Us</h3>
          <Form onSubmit={handleContactSubmit}>
            <Form.Group controlId="formName">
              <Form.Label className="form-label contact-form-label">
                Name
              </Form.Label>
              <Form.Control
                name="name"
                value={formData.name}
                onChange={handleChange}
                type="text"
                placeholder="Enter your name"
                className="contact-input-field"
              />
            </Form.Group>

            <Form.Group controlId="formPhone">
              <Form.Label className="contact-form-label">
                Phone Number
              </Form.Label>
              <Form.Control
              name="phone_number"
                value={formData.phone_number}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "").slice(0, 10);
                  setFormData({ ...formData, phone_number: val });
                }}
                type="text"
                placeholder="Enter your Number"
                className="contact-input-field"
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label className="contact-form-label">
                Email address
              </Form.Label>
              <Form.Control
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                placeholder="Enter your email"
                className="contact-input-field"
              />
            </Form.Group>

            <Form.Group controlId="formMessage">
              <Form.Label className="contact-form-label">
                Your Message
              </Form.Label>
              <Form.Control
                 name="message"
                value={formData.message}
                onChange={handleChange}
                as="textarea"
                rows={3}
                placeholder="Write your message"
                className="contact-input-field"
              />
            </Form.Group>

             <Button
              type="submit"
              className="contactus-btn"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </Form>
        </Col>

        {/* Image Section */}
        <Col md={6} className="contact-image">
          <img
            src={contactImage} // Using the updated variable
            alt="Contact Us"
            className="img-fluid"
          />
        </Col>
      </Row>
    </Container>
  );
};

export default ContactUs;
