import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  FaFacebook,
  FaInstagram,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import "./Footer.css";
import Logo from "../../assets/annapurna_logo.png";

const Footer = () => {
  const navigate = useNavigate();

  const handleClickCategory = (categoryName) => {
    const formattedCategory = categoryName.toLowerCase().replace(/\s+/g, "-");
    navigate(`/category/${formattedCategory}`);
  };

  return (
    <footer className="footer-main bg-success text-white py-4">
      <Container fluid className="px-5">
        <Row>
          {/* Logo Section */}
          <Col md={3} className="footer-logo">
            <Link to="/">
              <img src={Logo} alt="Business Logo" className="img-fluid" />
            </Link>
          </Col>

          {/* Support Section */}
          <Col md={2} className="footer-links">
            <h5>Support</h5>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/blog">Our Blog</Link>
              </li>
              <li>
                <Link to="/contact">Contact Us</Link>
              </li>
            </ul>
          </Col>

          {/* Menu Section */}
          <Col md={2} className="footer-links">
            <h5>Menu</h5>
            <ul>
              <li>
                <span onClick={() => handleClickCategory("fruits")}>
                  Fruits
                </span>
              </li>
              <li>
                <span onClick={() => handleClickCategory("Dry Fruits")}>
                  Dry Fruits
                </span>
              </li>
              <li>
                <span onClick={() => handleClickCategory("powders")}>
                  Powders
                </span>
              </li>
              <li>
                <span onClick={() => handleClickCategory("spices")}>
                  Spices
                </span>
              </li>
            </ul>
          </Col>

          {/* Company Section */}
          <Col md={2} className="footer-links">
            <h5>Company</h5>
            <ul>
              <li>
                <Link to="/signin">Login</Link>
              </li>
              <li>
                <Link to="/signup">Register</Link>
              </li>
              <li>
                <Link to="/terms-and-conditions">Terms & Conditions</Link>
              </li>
              <li>
                <Link to="/privacy-policy">Privacy Policy</Link>
              </li>
            </ul>
          </Col>

          {/* Contact Information Section */}
          <Col md={3} className="footer-contact">
            <h5>Contact Information</h5>
            <p>
              <FaMapMarkerAlt /> Vijayawada, Andhra Pradesh, 521108, India
            </p>
            <p>
              <FaPhone /> +918179783793
            </p>
            <p>
              <FaEnvelope /> support@annapurnafarms.in
            </p>

            {/* Social Icons */}
            <div className="footer-social">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaYoutube />
              </a>
              <a
                href="https://whatsapp.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp />
              </a>
            </div>
          </Col>
        </Row>

        {/* Copyright Section */}
        <Row className="footer-bottom">
          <Col className="text-center d-flex justify-content-center mt-3">
            <p>
              Copyright © 2025{" "}
              <a
                href="https://digispheretech.in/"
                target="_blank"
                rel="noopener noreferrer"

              >
                Digisphere
              </a>
              . All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
