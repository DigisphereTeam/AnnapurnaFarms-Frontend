import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

import { useNavigate } from "react-router-dom";
import { BASE_URL, CATEGORY_API } from "../../api/api";
import { toast } from "react-toastify";

import "./OurProductsAndOffer.css";

import OfferImage from "../../assets/premium-quality.png";

const OurProductsAndOffer = () => {
  const navigate = useNavigate();
  const [userCategories, setUserCategories] = useState([]);

  // Fetch categories from API
  const fetchUserCategories = async () => {
    try {
      const userResponse = await fetch(CATEGORY_API.GET_ALL);
      const UserCategoriesData = await userResponse.json();

      if (UserCategoriesData.statusCode === 200) {
        const formatted = UserCategoriesData.categories.map((cat) => ({
          ...cat,
          category_image: `${BASE_URL}/${cat.category_image}`,
        }));
        setUserCategories(formatted);
      } else {
        toast.error(`Fetch user categories:, ${UserCategoriesData.message}`);
      }
    } catch (error) {
      console.error("Error fetching user categories:", error);
      toast.error("Something went wrong while fetching user categories");
    }
  };

  useEffect(() => {
    fetchUserCategories();
  }, []);

  const handleClickCategory = (categoryName) => {
    const formattedCategory = categoryName.toLowerCase().replace(/\s+/g, "-");
    navigate(`/category/${formattedCategory}`);
  };

  return (
    <div className="ourproducts-offers-section">
      {/* Our Products Section */}
      <section className="ourproducts-section text-center">
        <Container fluid>
          <h2 className="ourproducts-title">
            Our <span>Categories</span>
          </h2>
          <div className="ourproducts-underline mb-5"></div>

          <Row className="justify-content-center px-5">
            {userCategories.length > 0 ? (
              userCategories.map((cat) => (
                <Col
                  key={cat.category_id}
                  xs={6}
                  sm={4}
                  md={2}
                  className="ourproducts-item"
                >
                  <div
                    className="ourproducts-circle"
                    onClick={() => handleClickCategory(cat.category_name)}
                  >
                    <img
                      src={cat.category_image}
                      alt={`Our product category - ${cat.category_name}`}
                      className="img-fluid"
                    />
                  </div>
                  <p className="ourproducts-name">{cat.category_name}</p>
                </Col>
              ))
            ) : (
              <Col xs={12}>
                <p className="home-featured-prodcuts-no-data">No Categories available</p>
              </Col>
            )}
          </Row>
        </Container>
      </section>

      {/* Weekly Offer Section */}
      <section className="homeWeeklyOffer-section px-5">
        <Container fluid>
          <Row className="align-items-center homeWeeklyOffer-row">
            {/* Left Side: Content */}
            <Col md={6} className="homeWeeklyOffer-content">
              {/* <p className="homeWeeklyOffer-subtitle">Weekly Offer</p> */}
              <h2 className="homeWeeklyOffer-title">
                Premium Quality, Healthy, and
                <span>
                  <br />
                  Natural Powders
                </span>
              </h2>
              <p className="homeWeeklyOffer-desc">
                Boost your health with our range of pure and nutrient-rich
                powders. From superfood powders to specialty blends, each
                product is carefully crafted to support your well-being.
              </p>
              <Button
                onClick={() => navigate("/productList")}
                className="homeWeeklyOffer-btn"
              >
                Shop Now
              </Button>
            </Col>

            {/* Right Side: Image */}
            <Col md={6} className="homeWeeklyOffer-image">
              <img src={OfferImage} alt="Fresh Fruits" className="img-fluid" />
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default OurProductsAndOffer;
