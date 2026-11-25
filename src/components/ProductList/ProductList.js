import React, { useState, useEffect } from "react";
import { FaShoppingCart, FaBell } from "react-icons/fa";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import ProductDetailPopup from "../ProductDetailPopup/ProductDetailPopup";
import {
  BASE_URL,
  GET_ALL_PRODUCTS,
  NOTIFY_API,
  FEATURED_PRODUCTS,
} from "../../api/api";

// assets-images
import walnuts from "../../assets/walnuts.png";
import tomatopickle from "../../assets/tomatopickle.png";
import recentmango from "../../assets/mango.png";
import redchilipowder from "../../assets/redchilipowder.png";

import "./ProductList.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [recentlyViewedProducts, setRecentlyViewedProducts] = useState([]);

  const [showPopup, setShowPopup] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(GET_ALL_PRODUCTS);
        const data = await response.json();

        if (data.statusCode === 200) {
          setProducts(data.data);
        } else {
          toast.error(`Failed to fetch products: ${data.message}`);
        }
      } catch (error) {
        toast.error(`Error fetching products: ${error.message}`);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchHomeProducts = async () => {
      try {
        const response = await fetch(FEATURED_PRODUCTS.GET_HOME_PRODUCTS);

        const data = await response.json();

        if (data.statusCode === 200) {
          setRecentlyViewedProducts(data.data.recent_viewed_products || []);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.error("Error fetching home products:", error);
      }
    };
    fetchHomeProducts();
  }, []);

  //  Handle “Notify Me” API request
  const handleNotifyRequest = async (productId, gramId) => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      toast.warning("Please login to request notification");
      navigate("/signin");
      return;
    }

    const payload = {
      user_id: userId,
      product_id: productId,
      gram_id: gramId,
    };

    try {
      const response = await fetch(NOTIFY_API.NOTIFY_REQUEST, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.statusCode === 200) {
        toast.info(
          data.message || "You'll be notified when it’s back in stock!",
        );
      } else {
        toast.error(data.message || "Failed to send notification request.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong. Please try again later");
    }
  };

  // Show product popup
  const handleShowPopup = (selectedItem) => {
    setSelectedProduct(selectedItem);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedProduct(null);
  };

  const handleViewMore = (categoryName) => {
    const formattedCategory = categoryName.toLowerCase().replace(/\s+/g, "-");
    navigate(`/category/${formattedCategory}`);
  };

  return (
    <Container fluid className="p-0 overflow-hidden product-list-container">
      {/* Banner Section */}

      <Row className="banner-section mb-5">
        <Col lg={12} className="banner-content">
          <h2>
            100% Pure, Natural & <br /> Nutrient Rich Powders
          </h2>
        </Col>
      </Row>

      <div className="product-list-container">
        <h2 className="product-list-heading">
          Product <span className="green-text">List</span>
        </h2>
      </div>

      {/* Product categories */}
      {products?.length > 0 ? (
        products.map(
          (category, index) =>
            category.products &&
            category.products.length > 0 && (
              <div key={index} className="category-section px-5 my-5">
                <h4 className="category-title">{category.category_name}</h4>
                <Row>
                  {category.products.slice(0, 4).map((product, idx) => {
                    const primaryVariant = product.pricegrams?.[0];

                    return (
                      <Col key={idx} sm={12} md={6} lg={3} className="mb-4">
                        <Card
                          className="product-card"
                          onClick={() => handleShowPopup(product)}
                        >
                          <Card.Img
                            variant="top"
                            src={`${BASE_URL}/${product.product_image}`}
                            className="product-img"
                            alt={product.product_name}
                          />
                          <Card.Body>
                            <div className="name-grams">
                              <Card.Title>{product.product_name}</Card.Title>
                              <span className="grams">
                                - {primaryVariant?.grams}
                              </span>
                            </div>
                            <div className="price-cart">
                              <span className="price">
                                Rs. {primaryVariant?.price}/-
                              </span>

                              {primaryVariant?.stock_status ===
                              "out_of_stock" ? (
                                <Button
                                  size="sm"
                                  className="add-cart"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleNotifyRequest(
                                      product.product_id,
                                      primaryVariant?.pricegrams_id,
                                    );
                                  }}
                                >
                                  <FaBell className="carticon" /> Notify Me
                                </Button>
                              ) : (
                                <Button size="sm" className="add-cart">
                                  <FaShoppingCart className="carticon" /> Add
                                </Button>
                              )}
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                    );
                  })}
                </Row>

                <div className="text-center">
                  <Button
                    variant="outline-success"
                    className="view-more-btn"
                    onClick={() => handleViewMore(category.category_name)}
                  >
                    View More
                  </Button>
                </div>
              </div>
            ),
        )
      ) : (
        <div className="mt-4">
          <p className="home-featured-prodcuts-no-data">
            No Categories Products Available
          </p>
        </div>
      )}

      {/* Recently Viewed Products Section */}
      <div className="recently-viewed-section px-5 mt-5">
        <h4 className="recently-view-title p-3">
          <span className="recently-view-underlined">Recently Viewed</span>
          <span className="recently-view-green"> Products</span>
        </h4>
        <Row>
          {recentlyViewedProducts.length > 0 ? (
            recentlyViewedProducts.map((product) => {
              const primaryVariant = product.pricegrams?.[0];

              return (
                <Col
                  key={product.product_id}
                  sm={12}
                  md={6}
                  lg={3}
                  className="mb-5"
                >
                  <Card
                    className="product-card"
                    onClick={() => handleShowPopup(product)}
                  >
                    <Card.Img
                      variant="top"
                      src={`${BASE_URL}/${product.product_image}`}
                      className="product-img"
                      alt={product.product_name}
                    />
                    <Card.Body>
                      <div className="category-name">
                        <span className="category">
                          {product.category_name}
                        </span>
                      </div>
                      <div className="name-grams">
                        <Card.Title>{product.product_name}</Card.Title>
                        <span className="grams">- {primaryVariant?.grams}</span>
                      </div>
                      <div className="price-cart">
                        <span className="price">
                          Rs. {primaryVariant?.price}/-
                        </span>

                        {primaryVariant?.stock_status === "out_of_stock" ? (
                          <Button
                            size="sm"
                            className="add-cart"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleNotifyRequest(
                                product.product_id,
                                primaryVariant?.pricegrams_id,
                              );
                            }}
                          >
                            <FaBell className="carticon" /> Notify Me
                          </Button>
                        ) : (
                          <Button size="sm" className="add-cart">
                            <FaShoppingCart className="carticon" /> Add
                          </Button>
                        )}
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })
          ) : (
            <Col xs={12}>
              <p className="recently-view-product-no-data">
                No recently viewed products available.
              </p>
            </Col>
          )}
        </Row>
      </div>

      {/* Popup for Product Details */}
      {selectedProduct && (
        <ProductDetailPopup
          show={showPopup}
          onHide={handleClosePopup}
          product={selectedProduct}
        />
      )}
    </Container>
  );
};

export default ProductList;
