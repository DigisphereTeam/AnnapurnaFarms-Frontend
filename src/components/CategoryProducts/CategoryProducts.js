import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { FaShoppingCart, FaBell } from "react-icons/fa";

import { toast } from "react-toastify";

import ProductDetailPopup from "../ProductDetailPopup/ProductDetailPopup";
import {
  BASE_URL,
  GET_ALL_PRODUCTS,
  NOTIFY_API,
  FEATURED_PRODUCTS,
} from "../../api/api";

import commonBanner from "../../assets/categories-banner.jpg";

import "./CategoryProducts.css";

const CategoryProducts = () => {
  const { categoryName } = useParams();
  // const decodedCategoryName = decodeURIComponent(categoryName);
  const [categoryData, setCategoryData] = useState(null);
  const [recentlyViewedProducts, setRecentlyViewedProducts] = useState([]);

  const [showPopup, setShowPopup] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const res = await fetch(GET_ALL_PRODUCTS);
        const data = await res.json();

        if (data.statusCode === 200) {
          const matchedCategory = data.data.find(
            (cat) =>
              cat.category_name.toLowerCase().replace(/\s+/g, "-") ===
              categoryName,
          );

          setCategoryData(
            matchedCategory
              ? {
                  ...matchedCategory,
                  products: matchedCategory.products || [],
                }
              : null,
          );
        } else {
          console.error("API Error:", data.message);
        }
      } catch (err) {
        console.error("Failed to fetch category products", err);
      }
    };

    fetchCategoryProducts();
  }, [categoryName]);

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

  const handleShowPopup = (selectedItem) => {
    setSelectedProduct(selectedItem);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedProduct(null);
  };

  // Handle Notify API call
  const handleNotifyRequest = async (productId, gramId) => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      toast.warning("Please login to request notification");
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
        toast.info(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      // toast.error("Something went wrong. Please try again later");
    }
  };

  const categoryBanner = commonBanner;

  return (
    <Container
      fluid
      className="p-0 overflow-hidden category-products-main-container"
    >
      {categoryData ? (
        <>
          {/* Display the category banner */}
          {categoryBanner && (
            <Row className="category-banner-section mb-5">
              <Col lg={12} className="category-banner-content">
                <div
                  className="category-banner"
                  style={{
                    background: `url(${categoryBanner}) no-repeat center center/cover`,
                    height: "300px",
                  }}
                ></div>
              </Col>
            </Row>
          )}

          <div className="text-center">
            <h2 className="category-heading mb-5">
              {categoryData.category_name}
            </h2>
          </div>

          <Row className="px-5">
            {categoryData.products && categoryData.products.length > 0 ? (
              categoryData.products.map((product) => {
                const primaryVariant = product.pricegrams?.[0];

                return (
                  <Col
                    key={product.product_id}
                    sm={12}
                    md={6}
                    lg={3}
                    className="mb-4"
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
                        <div className="name-grams">
                          <Card.Title>{product.product_name}</Card.Title>
                          {primaryVariant?.grams && (
                            <span className="grams">
                              - {primaryVariant.grams}
                            </span>
                          )}
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
                <h6 className="text-center">
                  No products available in this category.
                </h6>
              </Col>
            )}
          </Row>
        </>
      ) : (
        <h2 className="text-center my-4"></h2>
        // No Products Found
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

export default CategoryProducts;
