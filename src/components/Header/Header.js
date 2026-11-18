import React, { useState, useEffect, useRef } from "react";

import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Button,
  Form,
} from "react-bootstrap";

import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FaShoppingCart,
  FaUser,
  FaSearch,
  FaBars,
  FaTimes,
  FaBell,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Header.css";
import Logo from "../../assets/annapurna_logo.png";

import ProductDetailPopup from "../ProductDetailPopup/ProductDetailPopup";
import useOutsideClick from "../../hooks/useOutsideClick";

import { toast } from "react-toastify";
import {
  BASE_URL,
  CATEGORY_API,
  GET_ALL_PRODUCTS,
  NOTIFY_API,
  CART_API,
} from "../../api/api";

const Header = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [showProductsDropdown, setShowProductsDropdown] = useState(false);

  const [showPopup, setShowPopup] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [allProducts, setAllProducts] = useState([]);
  // const [loading, setLoading] = useState(false);  

  const [userCategories, setUserCategories] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  // Notifications
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const notificationRef = useRef(null);
  const searchRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchUserCategories();
    fetchAllProducts();
    setIsMobile(false);

    const userId = localStorage.getItem("userId");
    setLoggedIn(!!userId);

    if (userId) {
      fetchCartCount(userId);
      fetchUserNotifications(userId);
    }
  }, [location]);

  useEffect(() => {
    const refreshCartCount = () => {
      const userId = localStorage.getItem("userId");

      if (userId) {
        fetchCartCount(userId);
      } else {
        setCartCount(0);
      }
    };

    window.addEventListener("cartUpdated", refreshCartCount);

    return () => {
      window.removeEventListener("cartUpdated", refreshCartCount);
    };
  }, []);

  const fetchCartCount = async (userId) => {
    try {
      const response = await fetch(CART_API.CART_COUNT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
        }),
      });

      const data = await response.json();

      if (data.statusCode === 200) {
        setCartCount(Number(data?.data?.cart_count || 0));
      }
    } catch (error) {
      console.error("Error fetching cart count:", error);
    }
  };

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
      // toast.error("Something went wrong while fetching user categories");
    }
  };

  const fetchAllProducts = async () => {
    try {
      const response = await fetch(GET_ALL_PRODUCTS);
      const data = await response.json();

      if (data.statusCode === 200) {
        const products = [];

        (data?.data || []).forEach((category) => {
          if (Array.isArray(category.products)) {
            category.products.forEach((product) => {
              products.push({
                ...product,
                category_name: category.category_name,
              });
            });
          }
        });

        setAllProducts(products);
      } else {
        toast.error(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      // toast.error("Failed to load products");
    }
  };

  // Fetch notifications
  const fetchUserNotifications = async (userId) => {
    try {
      const response = await fetch(
        // "https://annapurnafarms.digispheretech.in/notify/getusernotify",
        NOTIFY_API.GET_USER_NOTIFY,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_id: userId }),
        },
      );

      const data = await response.json();
      if (data.statusCode === 200 && Array.isArray(data.notifications)) {
        setNotifications(data.notifications);
        setUnreadCount(data.notifications.length);
      } else {
        setNotifications([]);
        setUnreadCount(0);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  // Mark notification as read
  const markAsRead = async (notifyId) => {
    try {
      // Update the notification status in the backend
      const response = await fetch(
        // "https://annapurnafarms.digispheretech.in/notify/updatenotifystatus",
        NOTIFY_API.UPDATE_NOTIFY_STATUS,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ notify_id: notifyId }), // Sending the notify_id
        },
      );

      const data = await response.json();

      if (data.statusCode === 200) {
        // If the response is successful, update the state
        setNotifications((prev) =>
          prev.filter((n) => n.notify_id !== notifyId),
        );
        setUnreadCount((prev) => Math.max(prev - 1, 0));
      } else {
        toast.error(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error marking notification as read:", error);
      toast.error("Failed to update notification status.");
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value.trim() === "") {
      setFilteredResults([]);
    } else {
      const results = allProducts.filter((product) =>
        product.product_name.toLowerCase().includes(value.toLowerCase()),
      );
      setFilteredResults(results);
    }
  };

  const handleCategoryClick = (categoryName) => {
      setIsMobile(false);
  setShowProductsDropdown(false);
  
    const formattedCategory = categoryName.toLowerCase().replace(/\s+/g, "-");
    navigate(`/category/${formattedCategory}`);
  };

  const handleShowPopup = (selectedItem) => {
    setSelectedProduct(selectedItem);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedProduct(null);
  };

  useOutsideClick(searchRef, () => {
    setShowSearch(false);
    setSearchQuery("");
    setFilteredResults([]);
  });

  useOutsideClick(notificationRef, () => {
    setShowNotifications(false);
  });

  const handleLogout = () => {
    localStorage.removeItem("userId");
    setLoggedIn(false);
    setCartCount(0);
    navigate("/");
  };

  return (
    <>
      <Navbar
        expand="lg"
        className="header fixed-top px-4"
        // bg="success"
        variant="light"
      >
        <Container fluid>
          {/* Logo */}
          <Navbar.Brand as={Link} to="/" onClick={() => setIsMobile(false)}>
            <img src={Logo} alt="Shop Logo" width="130" />
          </Navbar.Brand>

          {/* Mobile Toggle Button */}
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={() => setIsMobile(!isMobile)}
            className="custom-toggler"
          >
            {isMobile ? (
              <FaTimes size={20} color="#285f3f" />
            ) : (
              <FaBars size={20} color="#285f3f" />
            )}
          </Navbar.Toggle>

          <Navbar.Collapse id="basic-navbar-nav" in={isMobile}>
            <Nav className="ms-auto gap-2">
              <Nav.Link as={Link} to="/" onClick={() => setIsMobile(false)}>
                Home
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/about"
                onClick={() => setIsMobile(false)}
              >
                About Us
              </Nav.Link>

              {/* Products Dropdown (Hover to Open) */}
              <NavDropdown
                title="Products"
                id="products-dropdown"
                show={showProductsDropdown}
                onMouseEnter={() => setShowProductsDropdown(true)}
                onMouseLeave={() => setShowProductsDropdown(false)}
              >
                {/*  Clicking "Products" itself navigates to all products */}
                <NavDropdown.Item
                  as={Link}
                  to="/productList"
                  className="custom-dropdown-item"
                >
                  View All Products
                </NavDropdown.Item>

                <NavDropdown.Divider />

                {userCategories.length > 0 ? (
                  userCategories.map((category) => (
                    <NavDropdown.Item
                      key={category.category_id}
                      className="custom-dropdown-item"
                      onClick={() => {
                        setIsMobile(false);
                        handleCategoryClick(category.category_name);
                      }}
                    >
                      {category.category_name}
                    </NavDropdown.Item>
                  ))
                ) : (
                  <NavDropdown.Item disabled className="custom-dropdown-item">
                    No Categories Available
                  </NavDropdown.Item>
                )}
              </NavDropdown>

              <Nav.Link as={Link} to="/blog" onClick={() => setIsMobile(false)}>
                Our Blog
              </Nav.Link>
              <Nav.Link as={Link} to="/faqs" onClick={() => setIsMobile(false)}>
                FAQs
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/contact"
                onClick={() => setIsMobile(false)}
              >
                Contact Us
              </Nav.Link>
            </Nav>

            {/* Search Icon (Click to Open Popup) */}
            <Button
              variant="none"
              className="header-icon ms-2"
              onClick={() => setShowSearch(!showSearch)}
            >
              <FaSearch />
            </Button>

            {/* Notifications (visible only if logged in) */}
            {loggedIn && (
              <div
                className="notifications-header-icon position-relative ms-2"
                ref={notificationRef}
              >
                <Button
                  variant="none"
                  className="p-0"
                  onClick={() => setShowNotifications(!showNotifications)}
                  style={{ background: "none", border: "none" }}
                >
                  <FaBell size={22} className="notifications-bell-icon" />
                  {unreadCount > 0 && (
                    <span className="header-notifications-count">
                      {unreadCount}
                    </span>
                  )}
                </Button>

                {showNotifications && (
                  <div className="notifications-dropdown">
                    {notifications.length > 0 ? (
                      notifications.map((n) => (
                        <div key={n.notify_id} className="notification-item">
                          <p>
                            <strong>{n.product_name}</strong> ({n.grams}) is now
                            in stock.
                          </p>

                          <Button
                            size="sm"
                            // variant="success"
                            onClick={() => markAsRead(n.notify_id)}
                            className="notifications-dropdown-mark-read-btn"
                          >
                            Mark as Read
                          </Button>
                        </div>
                      ))
                    ) : (
                      <div className="notification-item no-data">
                        No notifications found.
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Cart & Profile Icons */}
            <Nav className="d-flex ">
              <Nav.Link as={Link} to="/cart" className="header-icon">
                <FaShoppingCart size={22} />
                {cartCount > 0 && (
                  <span className="header-cart-count">{cartCount}</span>
                )}
              </Nav.Link>

              {/* Profile Dropdown */}
              {loggedIn ? (
                <NavDropdown
                  title={<FaUser size={22} />}
                  id="profile-dropdown"
                  align="end"
                  className="header-icon"
                >
                  <NavDropdown.Item
                    as={Link}
                    to="/user-profile"
                    onClick={() => setIsMobile(false)}
                    className="custom-dropdown-item"
                  >
                    My Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    to="/user-orders"
                    onClick={() => setIsMobile(false)}
                    className="custom-dropdown-item"
                  >
                    My Orders
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    onClick={handleLogout}
                    className="custom-dropdown-item"
                  >
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                // If not logged in: show login icon
                <Nav.Link
                  as={Link}
                  to="/signin"
                  className="header-icon"
                  onClick={() => setIsMobile(false)}
                >
                  <FaUser size={22} />
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Search Popup */}
      {showSearch && (
        <div className="search-popup" ref={searchRef}>
          <Form.Control
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleSearch}
            className="search-input-field"
          />
          <button
            className="search-close-btn"
            onClick={() => {
              setShowSearch(false);
              setSearchQuery("");
              setFilteredResults([]);
            }}
          >
            <FaTimes />
          </button>

          {/* Search Results */}
          <div className="search-results">
            {searchQuery.trim() !== "" ? (
              filteredResults.length > 0 ? (
                filteredResults.map((product, idx) => (
                  <div
                    key={idx}
                    className="result-item"
                    onClick={() => handleShowPopup(product)}
                  >
                    <img
                      src={`${BASE_URL}/${product.product_image}`}
                      // src={product.product_image}
                      alt={product.product_name}
                      className="result-image"
                    />
                    <span>{product.product_name}</span>
                  </div>
                ))
              ) : (
                <div className="result-item no-results">
                  {/* <img src="your-no-results-image.png" alt="No results" className="result-image" /> */}
                  <span>No results found.</span>
                </div>
              )
            ) : null}
          </div>
        </div>
      )}

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

export default Header;
