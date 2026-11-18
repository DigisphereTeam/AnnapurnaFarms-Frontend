import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { FaShoppingCart, FaBell } from "react-icons/fa";

import { BASE_URL, FEATURED_PRODUCTS, NOTIFY_API } from "../../api/api";
import ProductDetailPopup from "../ProductDetailPopup/ProductDetailPopup";

import { toast } from "react-toastify";

import "./HomeFeaturedProducts.css";

const HomeFeaturedProducts = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [specialSaleProducts, setSpecialSaleProducts] = useState([]);
  const [recentlyViewedProducts, setRecentlyViewedProducts] = useState([]);

  const [showPopup, setShowPopup] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchHomeProducts = async () => {
      try {
        const response = await fetch(FEATURED_PRODUCTS.GET_HOME_PRODUCTS);

        const data = await response.json();

        if (data.statusCode === 200) {
          setFeaturedProducts(data.data.featured_products || []);
          setSpecialSaleProducts(data.data.special_sale_products || []);
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
      toast.error("Something went wrong. Please try again later");
    }
  };

  return (
    <>
      <Container fluid className="homefeaturedproducts-main px-5">
        <h2 className="homefeaturedproducts-title">
          <span>Featured</span> Products
        </h2>
        <Row className="justify-content-center">
          {featuredProducts.length > 0 ? (
            featuredProducts.map((product) => {
              const primaryVariant = product.pricegrams?.[0];

              return (
                <Col
                  key={product.product_id}
                  lg={3}
                  md={6}
                  sm={6}
                  xs={12}
                  className="mb-4"
                >
                  <Card
                    className="homefeaturedproducts-card"
                    onClick={() => handleShowPopup(product)}
                  >
                    <Card.Img
                      variant="top"
                      src={`${BASE_URL}/${product.product_image}`}
                      className="homefeaturedproducts-img"
                      alt={product.product_name}
                    />

                    <Card.Body>
                      <p className="homefeaturedproducts-category">
                        {product.category_name}
                      </p>
                      <h5 className="homefeaturedproducts-name">
                        {product.product_name}{" "}
                        <span className="homefeaturedproducts-weight">
                          {" "}
                          - {primaryVariant?.grams}
                        </span>
                      </h5>

                      <div className="homefeaturedproducts-actions">
                        <div className="homefeaturedproducts-price">
                          <span className="homefeaturedproducts-current">
                            Rs. {primaryVariant?.price}/-
                          </span>
                        </div>

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
                          <Button
                            size="sm"
                            className="homefeaturedproducts-add"
                          >
                            <FaShoppingCart className="homefeaturedproducts-carticon" />
                            Add
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
              <p className="home-featured-prodcuts-no-data">No featured products available.</p>
            </Col>
          )}
        </Row>
      </Container>

      <>
        {/* Special Sale Section */}
        <section className="SpecialSale-main container-fluid px-5">
          <Row className="SpecialSale-row1">
            <h2 className="SpecialSale-title">
              Special <span>Sale</span>
            </h2>

            {specialSaleProducts.length > 0 ? (
              specialSaleProducts.map((item) => {
                const primaryVariant = item.pricegrams?.[0];

                return (
                  <Col md={6} key={item.product_id} className="mb-4">
                    <Card
                      className="SpecialSale-card"
                      onClick={() => handleShowPopup(item)}
                    >
                      <div className="SpecialSale-content">
                        <div className="SpecialSale-image">
                          <img
                            src={`${BASE_URL}/${item.product_image}`}
                            alt={item.product_name}
                          />
                        </div>
                        <div className="SpecialSale-info">
                          <h5>
                            {item.product_name}{" "}
                            <span> - {item.category_name}</span>
                          </h5>
                          <p className="SpecialSale-weight">
                            {primaryVariant?.grams}
                          </p>
                          <p className="SpecialSale-price">
                            Rs. {primaryVariant?.price}/-
                          </p>
                          {/* <p className="SpecialSale-desc">
                        Lorem ipsum is simply dummy text of the printing and
                        typesetting industry.
                      </p> */}

                          {primaryVariant?.stock_status === "out_of_stock" ? (
                            <Button
                              size="sm"
                              className="add-cart"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleNotifyRequest(
                                  item.product_id,
                                  primaryVariant?.pricegrams_id,
                                );
                              }}
                            >
                              <FaBell className="carticon" /> Notify Me
                            </Button>
                          ) : (
                            <Button
                              variant="success"
                              className="SpecialSale-add-to-cart"
                            >
                              <FaShoppingCart className="SpecialSale-cart-icon" />{" "}
                              Add
                            </Button>
                          )}
                        </div>
                      </div>
                    </Card>
                  </Col>
                );
              })
            ) : (
              <Col xs={12}>
               <p className="home-featured-prodcuts-no-data pb-3">
                  No special sale products available.
                </p>
              </Col>
            )}
          </Row>
        </section>

        {/* Recently Viewed Products Section */}
        <section className="container-fluid recently-viewed-section-container">
          <div className="px-5 mt-5">
            <h4 className="recently-view-title p-4">
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
                            <span className="grams">
                      
                              - {primaryVariant?.grams}
                            </span>
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
        </section>
      </>

      {/* Popup for Product Details */}
      {selectedProduct && (
        <ProductDetailPopup
          show={showPopup}
          onHide={handleClosePopup}
          product={selectedProduct}
        />
      )}
    </>
  );
};

export default HomeFeaturedProducts;
