import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { FaShoppingCart, FaBell, FaShoppingBag, FaWhatsapp, FaFacebook, FaInstagram } from "react-icons/fa";
import { RiShareForwardFill } from "react-icons/ri";
import { BASE_URL, CART_API, NOTIFY_API } from "../../api/api";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import "./ProductDetailPopup.css";

const ProductDetailPopup = ({ show, onHide, product }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedGrams, setSelectedGrams] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedStockStatus, setSelectedStockStatus] = useState("");
  const [selectedPricegramsId, setSelectedPricegramsId] = useState("");
  const [shareModal, setShareModal] = useState(false);

  const [selectedStock, setSelectedStock] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (product?.pricegrams?.length > 0) {
      const first = product.pricegrams[0];

      setSelectedGrams(first.grams);
      setSelectedPrice(first.price);
      setSelectedStockStatus(first.stock_status);
      setSelectedPricegramsId(first.pricegrams_id);
      setSelectedStock(first.stock);

      setQuantity(first.stock > 0 ? 1 : 0);
    }
  }, [product]);

  // const handleQuantityIncrease = () => setQuantity((prev) => prev + 1);
  const handleQuantityIncrease = () => {
    if (quantity < selectedStock) {
      setQuantity((prev) => prev + 1);
    } else {
      toast.warn(`Only ${selectedStock} items available in stock.`);
    }
  };

  const handleQuantityDecrease = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleGramSelection = (
    gram,
    price,
    stock_status,
    pricegrams_id,
    stock,
  ) => {
    setSelectedGrams(gram);
    setSelectedPrice(price);
    setSelectedStockStatus(stock_status);
    setSelectedPricegramsId(pricegrams_id);
    setSelectedStock(stock);

    setQuantity(stock > 0 ? 1 : 0);
  };

  // Open share modal
  const openShareModal = () => setShareModal(true);
  const closeShareModal = () => setShareModal(false);

  // Share links
  const productUrl = window.location.href;
  const shareText = `${product?.title} - ₹${product?.price}/- \nBuy Now: ${productUrl}`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    productUrl,
  )}`;
  const instagramUrl = `https://www.instagram.com/`; // No direct share support

  const userId = localStorage.getItem("userId");

  const handleAddToCart = async () => {
    if (!userId) {
      toast.info("Please log in to add items to the cart!");
      onHide()
      navigate("/signin")
      return;
    }

    if (quantity > 30) {
      toast.error("You cannot add more than 30 items to the cart.");
      return;
    }

    try {
      const selectedPricegram = product.pricegrams.find(
        (pg) => pg.grams === selectedGrams,
      );

      const payload = {
        product_id: product.product_id,
        pricegrams_id: selectedPricegram.pricegrams_id,
        quantity: quantity,
        user_id: userId,
        price: selectedPrice,
      };

      const response = await fetch(CART_API.ADD_CART, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.statusCode === 200) {
        toast.success(data.message);
        window.dispatchEvent(new Event("cartUpdated"));
      } else {
        toast.error(data.message);
      }

      // console.log("Cart API response:", data);
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };
  const handleBuyNow = async () => {
    if (!userId) {
      toast.info("Please log in to purchase items!");
      onHide()
      navigate("/signin")
      return;
    }

    if (quantity > 30) {
      toast.error("You cannot add more than 30 items to the cart.");
      return;
    }

    try {
      const selectedPricegram = product.pricegrams.find(
        (pg) => pg.grams === selectedGrams,
      );

      const payload = {
        product_id: product.product_id,
        pricegrams_id: selectedPricegram.pricegrams_id,
        quantity: quantity,
        user_id: userId,
        price: selectedPrice,
      };

      // Reusing the same Add to Cart API endpoint
      const response = await fetch(CART_API.ADD_CART, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.statusCode === 200) {
        toast.success(data.message || "Added to cart successfully!");
        window.dispatchEvent(new Event("cartUpdated"));

        onHide();

        navigate("/cart");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error with Buy Now:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleNotifyMe = async () => {
    if (!userId) {
      toast.info("Please log in to register for notification!");
      onHide();
      navigate("/signin");
      return;
    }

    try {
      const payload = {
        user_id: userId,
        product_id: product.product_id,
        gram_id: selectedPricegramsId,
      };

      const response = await fetch(NOTIFY_API.NOTIFY_REQUEST, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      toast.info(data.message);
    } catch (error) {
      console.error("Error in notify request:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <Modal show={show} onHide={onHide} centered size="lg">
        <Modal.Header closeButton />
        <Modal.Body>
          <div className="popup-container">
            <div className="popup-image-wrapper">
              <img
                src={`${BASE_URL}/${product.product_image}`}
                alt={product.product_name}
                className="popup-product-img"
              />
            </div>
            <div
              className={`stock-status-badge ${
                selectedStockStatus === "in_stock" ? "in-stock" : "out-of-stock"
              }`}
            >
              {selectedStockStatus === "in_stock" ? "In Stock" : "Out of Stock"}
            </div>

            <div className="popup-buttons">
              {selectedStockStatus === "in_stock" ? (
                <>
                  <Button className="popup-btn" onClick={handleAddToCart}>
                    <FaShoppingCart size={22} /> Add to Cart
                  </Button>

                  <Button className="popup-btn btn-success" onClick={handleBuyNow} >
                    <FaShoppingBag size={22}/>Buy Now
                  </Button>
                </>
              ) : (
                <Button className="popup-btn" onClick={handleNotifyMe}>
                  <FaBell size={22} /> Notify Me
                </Button>
              )}
              <Button className="popup-btn" onClick={openShareModal}>
                <RiShareForwardFill size={22} /> Share
              </Button>
            </div>

            <Modal.Title className="popup-title">
              {product.product_name}
            </Modal.Title>
            <p className="popup-description">{product.description}</p>
            <p className="popup-price">Price ₹ {selectedPrice}/-</p>

            <div className="quantity-controls">
              <button
                onClick={handleQuantityDecrease}
                className="quantity-btn"
                disabled={selectedStock === 0 || quantity <= 1}
              >
                -
              </button>
              <span className="quantity-value">{quantity}</span>
              <button
                onClick={handleQuantityIncrease}
                className="quantity-btn"
                disabled={selectedStock === 0 || quantity >= selectedStock}
                title={
                  quantity >= selectedStock
                    ? `Maximum available stock: ${selectedStock}`
                    : ""
                }
              >
                +
              </button>
            </div>

            <p className="popup-grams-label">Select Quantity</p>
            <div className="grams-container">
              {product.pricegrams?.map((item, index) => (
                <button
                  key={index}
                  className={`grams-btn ${
                    selectedGrams === item.grams ? "selected" : ""
                  }`}
                  onClick={() =>
                    handleGramSelection(
                      item.grams,
                      item.price,
                      item.stock_status,
                      item.pricegrams_id,
                      item.stock,
                    )
                  }
                >
                  {item.grams}
                </button>
              ))}
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* Share Modal */}
      <Modal
        show={shareModal}
        onHide={closeShareModal}
        centered
        className="share-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Share this Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="share-icons">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp"
            >
              <FaWhatsapp />
            </a>
            <a
              href={facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="facebook"
            >
              <FaFacebook />
            </a>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="instagram"
            >
              <FaInstagram />
            </a>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ProductDetailPopup;
