import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./PrivacyPolicy.css";

const PrivacyPolicy = () => {
  return (
    <Container className="privacy-container mt-5 mb-5">
      <Row>
        <Col>
          <h1 className="privacy-title text-center">Privacy Policy</h1>
          <p className="privacy-intro mt-4 mb-4">
            Your privacy is important to us at <strong>Annapurna Farms</strong>.
            This Privacy Policy explains how we collect, use, and protect your
            personal information.
          </p>
        </Col>
      </Row>

      <Row>
        <Col lg={12}>
          <Card className="privacy-card shadow-sm border-0">
            <Card.Body>
              {/* 1. Information We Collect */}
              <section className="privacy-section">
                <h4 className="privacy-heading">1. Information We Collect</h4>
                <ul>
                  <li>
                    Name, email address, phone number, and shipping address
                  </li>
                  <li>
                    Payment information (processed securely through third-party
                    payment gateways)
                  </li>
                  <li>
                    Information collected automatically (like IP address,
                    browser type, device information)
                  </li>
                </ul>
              </section>

              {/* 2. How We Use Your Information */}
              <section className="privacy-section">
                <h4 className="privacy-heading">
                  2. How We Use Your Information
                </h4>
                <ul>
                  <li>Process and deliver your orders</li>
                  <li>Communicate order updates and promotions</li>
                  <li>Improve our website and customer experience</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </section>

              {/* 3. Data Security */}
              <section className="privacy-section">
                <h4 className="privacy-heading">3. Data Security</h4>
                <ul>
                  <li>
                    We use secure encryption and trusted payment gateways to
                    protect your data.
                  </li>
                  <li>We do not store or share your payment details.</li>
                </ul>
              </section>

              {/* 4. Cookies */}
              <section className="privacy-section">
                <h4 className="privacy-heading">4. Cookies</h4>
                <ul>
                  <li>
                    {" "}
                    Our website may use cookies to improve your browsing
                    experience. You can disable cookies in your browser settings
                    if you prefer.
                  </li>
                </ul>
              </section>

              {/* 5. Sharing of Information */}
              <section className="privacy-section">
                <h4 className="privacy-heading">5. Sharing of Information</h4>
                <p>
                  We do not sell or rent your personal data. We may share
                  information only with:
                </p>
                <ul>
                  <li>Trusted delivery partners for shipping</li>
                  <li>Payment processors for completing transactions</li>
                  <li>Legal authorities if required by law</li>
                </ul>
              </section>

              {/* 6. Your Rights */}
              <section className="privacy-section">
                <h4 className="privacy-heading">6. Your Rights</h4>
                <ul>
                  <li>Request a copy of your personal data</li>
                  <li>
                    Request correction or deletion of your data (unless required
                    by law)
                  </li>
                </ul>
              </section>

              {/* 7. Third-Party Links */}
              <section className="privacy-section">
                <h4 className="privacy-heading">7. Third-Party Links</h4>
                <ul>
                  <li>
                    Our website may contain links to other websites. We are not
                    responsible for their privacy practices or content.
                  </li>
                </ul>
              </section>

              {/* 8. Policy Updates */}
              <section className="privacy-section">
                <h4 className="privacy-heading">8. Policy Updates</h4>
                <ul>
                  <li>
                    We may update this Privacy Policy from time to time. Please
                    review it periodically for any changes.
                  </li>
                </ul>
              </section>

              {/* 9. Contact Us */}
              <section className="privacy-section">
                <h4 className="privacy-heading">9. Contact Us</h4>
                <p className="privacy-contact">
                  For any privacy-related concerns, contact us at:{" "}
                </p>
                <ul>
                  <li>support@annapurnafarms.in </li>
                  <li>Vijayawada, Andhra Pradesh, 521108, India</li>
                </ul>
              </section>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PrivacyPolicy;
