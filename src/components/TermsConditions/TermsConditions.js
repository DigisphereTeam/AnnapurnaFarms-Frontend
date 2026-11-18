import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./TermsConditions.css";

const TermsConditions = () => {
  return (
    <Container className="terms-container mt-5 mb-5">
      <Row>
        <Col>
          <h1 className="terms-title text-center">Terms & Conditions</h1>

          <p className="terms-intro mt-4 mb-4">
            Welcome to <strong>Annapurna Farms</strong> (“we”, “our”, “us”). By
            accessing our website <strong>annapurnafarms.shop</strong>, you
            agree to comply with and be bound by the following Terms and
            Conditions. Please read them carefully before making any purchase.
          </p>
        </Col>
      </Row>
      <Row>
        <Col lg={12}>
          <Card className="terms-card shadow-sm border-0">
            <Card.Body>
              {/* 1. General */}
              <section className="terms-section">
                <h4 className="terms-heading">1. General</h4>
                <ul>
                  <li>
                    These Terms govern your use of our website and the purchase
                    of our products.
                  </li>
                  <li>
                    By using our website, you confirm that you are at least 18
                    years old or have parental consent.
                  </li>
                </ul>
              </section>

              {/* 2. Products */}
              <section className="terms-section">
                <h4 className="terms-heading">2. Products</h4>
                <ul>
                  <li>
                    We sell homemade food items such as pickles, karam powders,
                    and other related products.
                  </li>
                  <li>
                    All our products are made with care and using quality
                    ingredients.
                  </li>
                  <li>
                    The actual color, texture, or taste of the product may
                    slightly vary due to the handmade nature.
                  </li>
                </ul>
              </section>

              {/* 3. Pricing & Payment */}
              <section className="terms-section">
                <h4 className="terms-heading">3. Pricing & Payment</h4>
                <ul>
                  <li>
                    All prices displayed on our website are in Indian Rupees (₹)
                    and inclusive of applicable taxes.
                  </li>
                  <li>
                    Payment must be made at the time of ordering through our
                    secure payment gateway.
                  </li>
                  <li>
                    We reserve the right to change prices or discontinue
                    products at any time without prior notice.
                  </li>
                </ul>
              </section>

              {/* 4. Shipping & Delivery */}
              <section className="terms-section">
                <h4 className="terms-heading">4. Shipping & Delivery</h4>
                <ul>
                  <li>
                    Orders are usually processed within 2–5 business days.
                  </li>
                  <li>Delivery times may vary based on location.</li>
                  <li>
                    We are not responsible for delays caused by courier
                    companies or unforeseen events.
                  </li>
                </ul>
              </section>

              {/* 5. Returns & Refunds */}
              <section className="terms-section">
                <h4 className="terms-heading">5. Returns & Refunds</h4>
                <ul>
                  <li>
                    Since our products are perishable food items, we do not
                    accept returns or exchanges once delivered.
                  </li>
                  <li>Refunds are only provided in cases of:</li>
                  <ul className="terms-sublist">
                    <li>Wrong product delivered</li>
                    <li>
                      Damaged or spoiled product upon delivery (must notify
                      within 24 hours with photos)
                    </li>
                  </ul>
                </ul>
              </section>

              {/* 6. Cancellations */}
              <section className="terms-section">
                <h4 className="terms-heading">6. Cancellations</h4>
                <ul>
                  <li>
                    Orders can be canceled within 6 hours of placing them.
                  </li>
                  <li>Once shipped, orders cannot be canceled.</li>
                </ul>
              </section>

              {/* 7. Intellectual Property */}
              <section className="terms-section">
                <h4 className="terms-heading">7. Intellectual Property</h4>
                <ul>
                  <li>
                    All website content including images, text, and designs are
                    the property of <strong>Annapurna Farms</strong>.
                  </li>
                  <li>
                    You may not reproduce, distribute, or use any material
                    without written permission.
                  </li>
                </ul>
              </section>

              {/* 8. Limitation of Liability */}
              <section className="terms-section">
                <h4 className="terms-heading">8. Limitation of Liability</h4>
                <ul>
                  <li>
                    We are not liable for any indirect, incidental, or
                    consequential damages arising from the use of our products
                    or website.
                  </li>
                  <li>
                    Customers are responsible for checking ingredient lists
                    before purchase in case of allergies.
                  </li>
                </ul>
              </section>

              {/* 9. Governing Law */}
              <section className="terms-section">
                <h4 className="terms-heading">9. Governing Law</h4>
                <ul>
                  <li>
                    These Terms shall be governed by and interpreted in
                    accordance with the laws of India, and disputes shall be
                    subject to the jurisdiction of <strong>Vijayawada</strong>,
                    Andhra Pradesh.
                  </li>
                </ul>
              </section>

              {/* 10. Contact Us */}
              <section className="terms-section">
                <h4 className="terms-heading">10. Contact Us</h4>
                <p className="terms-contact">
                  If you have any questions, please contact us at:{" "}
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

export default TermsConditions;
