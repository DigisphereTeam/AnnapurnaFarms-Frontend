import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Form,
  Button,
  Row,
  Col,
  Table,
  Image,
  Modal,
} from "react-bootstrap";
import { FaTimes, FaTrashAlt } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { MdVisibilityOff, MdVisibility } from "react-icons/md";
import { BASE_URL, CATEGORY_API, PRODUCT_API } from "../../../api/api";
import { toast } from "react-toastify";
import "./AdminProducts.css";

const AdminProducts = () => {
  const [productName, setProductName] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [variations, setVariations] = useState([
    { grams: "", price: "", stock: "" },
  ]);
  const [description, setDescription] = useState("");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const imageInputRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(CATEGORY_API.GET_ALL);
        const data = await response.json();

        if (data.statusCode === 200) {
          setCategories(data.categories); // Store categories in state
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(PRODUCT_API.GET_ALL);
      const data = await response.json();

      if (data.statusCode === 200) {
        setProducts(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      // toast.error("Failed to fetch products. Please try again.");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle file input and preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProductImage(file);
  };

  const handleVariationChange = (index, field, value) => {
    const updatedVariations = [...variations];
    updatedVariations[index][field] = value;
    setVariations(updatedVariations);
  };

  // Add product variations
  const handleAddVariation = () => {
    setVariations([...variations, { grams: "", price: "", stock: "" }]);
  };
  const handleRemoveVariation = (index) => {
    const updatedVariations = variations.filter((_, idx) => idx !== index);
    setVariations(updatedVariations);
  };

  const addProduct = async () => {
    // Validate the inputs before proceeding
    if (
      !productName ||
      !categoryId ||
      !description.trim() ||
      !variations.length ||
      !productImage
    ) {
      toast.error("Please fill in all fields.");
      return;
    }

    // Prepare FormData to send the request
    const formData = new FormData();
    formData.append("category_id", categoryId); // categoryId from dropdown
    formData.append("product_name", productName);
    formData.append("product_image", productImage); // image file for upload
    formData.append("description", description);

    // Append price_grams array (JSON) to FormData
    formData.append("price_grams", JSON.stringify(variations));

    try {
      const response = await fetch(PRODUCT_API.ADD, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.statusCode === 200) {
        toast.success(data.message);

        const newProduct = {
          productName: data.product.product_name,
          // stock: data.product.stock,
          description: data.product.description,
          categoryName: categoryName, // Use the categoryName from state
          productImage: `${BASE_URL}/${data.product.product_image}`, // Full image URL
          price_grams: data.product.price_grams, // Use the returned price_grams array
        };
        // Add the new product to the list of products (UI state)
        setProducts((prevProducts) => [...prevProducts, newProduct]);
        // Reset the form fields after successful submission
        fetchProducts();
        resetForm();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error adding product:", error);
      // toast.error("Failed to add product. Please try again.");
    }
  };

  const handleEditProduct = async () => {
    if (
      !productName ||
      !categoryId ||
      !description.trim() ||
      !variations.length
    ) {
      toast.error("Please fill in all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("product_id", products[editIndex].product_id); // Use the existing product_id
    formData.append("product_name", productName);
    formData.append("product_image", productImage);
    formData.append("description", description);
    formData.append("category_id", categoryId);
    formData.append("price_grams", JSON.stringify(variations));

    try {
      const response = await fetch(PRODUCT_API.UPDATE, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.statusCode === 200) {
        toast.success(data.message);
        const updatedProduct = data.product;
        const updatedProducts = [...products];
        updatedProducts[editIndex] = updatedProduct;
        setProducts(updatedProducts);
        resetForm();
        setEditIndex(null);
        fetchProducts();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error editing product:", error);
      // toast.error("Failed to edit product. Please try again.");
    }
  };

  // Reset the form after adding a product
  const resetForm = () => {
    setProductName("");
    setCategoryName("");
    setCategoryId(""); // Reset category ID
    setDescription("");
    setVariations([{ grams: "", price: "", stock: "" }]);
    setProductImage(null);
    imageInputRef.current.value = "";
  };

  const handleDeleteProduct = async () => {
    if (productToDelete !== null) {
      const product = products[productToDelete];
      try {
        // Send DELETE request to the API
        const response = await fetch(PRODUCT_API.DELETE, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ product_id: product.product_id }),
        });

        const data = await response.json();

        if (data.statusCode === 200) {
          // Successfully deleted, now remove the product from state
          const updatedProducts = products.filter(
            (_, index) => index !== productToDelete,
          );
          setProducts(updatedProducts);
          setShowDeleteModal(false);
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.error("Error deleting product:", error);
        // toast.error("Error deleting product");
      }
    }
  };

  const toggleHideProduct = async (index) => {
    const updatedProducts = [...products];
    const product = updatedProducts[index];
    const newStatus =
      product.product_status === "visible" ? "hidden" : "visible";

    // Update product status in the local state immediately
    updatedProducts[index].product_status = newStatus;
    setProducts(updatedProducts);

    try {
      const response = await fetch(PRODUCT_API.STATUS, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product_id: product.product_id,
          product_status: newStatus,
        }),
      });

      const data = await response.json();
      if (data.statusCode === 200) {
        toast.success(data.message);
      } else {
        // If the API response is not successful, revert the status change in the UI
        toast.error("Failed to update product status. Reverting changes.");
        updatedProducts[index].product_status = product.product_status; // Revert
        setProducts(updatedProducts);
      }
    } catch (error) {
      console.error("Error updating product status:", error);
      // Revert changes if an error occurs
      updatedProducts[index].product_status = product.product_status;
      setProducts(updatedProducts);
      // toast.error("Error updating product status.");
    }
  };

  return (
    <section className="admin-products-container">
      <Container fluid>
        <h4 className="admin-dashboard-overall-heading">Products Management</h4>
        <Form className="mt-4 mb-4" ref={formRef}>
          <Row className="gy-1 gx-3">
            <Col md={3}>
              <Form.Group>
                <Form.Label className="admin-product-label">
                  Category Name:
                </Form.Label>
                <Form.Select
                  className="product-input-field"
                  value={categoryId}
                  onChange={(e) => {
                    setCategoryId(e.target.value);
                    setCategoryName(
                      categories.find(
                        (cat) => cat.category_id === e.target.value,
                      )?.category_name,
                    );
                  }}
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option
                      key={category.category_id}
                      value={category.category_id}
                    >
                      {category.category_name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={3}>
              <Form.Group>
                <Form.Label className="admin-product-label">
                  Product Name:
                </Form.Label>
                <Form.Control
                  className="product-input-field"
                  type="text"
                  placeholder="Enter Product name"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
              </Form.Group>
            </Col>

            <Col md={3}>
              <Form.Group>
                <Form.Label className="admin-product-label">Images:</Form.Label>
                <Form.Control
                  className="product-input-field"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  ref={imageInputRef}
                />
              </Form.Group>
            </Col>

            <Col md={3}>
              <Form.Group>
                <Form.Label className="admin-product-label">
                  Description:
                </Form.Label>
                <Form.Control
                  className="product-input-field"
                  as="textarea"
                  rows={1}
                  placeholder="Enter Product Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>
            </Col>

            {/* <Col md={3}>
            <Form.Group>
              <Form.Label className="admin-product-label">
                Stock (Kg):
              </Form.Label>
              <Form.Control
                className="product-input-field"
                type="number"
                placeholder="Stock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </Form.Group>
          </Col> */}

            <Col md={9} className="mt-3">
              <Form.Group>
                {variations.map((variation, index) => (
                  <Row
                    key={index}
                    className="gy-1 gx-3 d-flex align-items-center"
                  >
                    <Col md={3}>
                      <Form.Label className="admin-product-label">
                        Grams:
                      </Form.Label>
                      <Form.Control
                        className="product-input-field"
                        type="text"
                        placeholder="Grams"
                        value={variation.grams}
                        onChange={(e) =>
                          handleVariationChange(index, "grams", e.target.value)
                        }
                      />
                    </Col>

                    <Col md={3}>
                      <Form.Label className="admin-product-label">
                        Price:
                      </Form.Label>
                      <Form.Control
                        className="product-input-field"
                        type="number"
                        placeholder="Price"
                        value={variation.price}
                        onChange={(e) =>
                          handleVariationChange(index, "price", e.target.value)
                        }
                      />
                    </Col>

                    <Col md={3}>
                      <Form.Label className="admin-product-label">
                        Stock (Kg):
                      </Form.Label>
                      <Form.Control
                        className="product-input-field"
                        type="number"
                        placeholder="Stock"
                        value={variation.stock}
                        onChange={(e) =>
                          handleVariationChange(index, "stock", e.target.value)
                        }
                      />
                    </Col>

                    <Col md={1} className="mt-5">
                      {index !== 0 && (
                        <Button
                          variant="light"
                          onClick={() => handleRemoveVariation(index)}
                          className="remove-variation-btn"
                        >
                          <FaTimes />
                        </Button>
                      )}
                    </Col>
                  </Row>
                ))}

                <Button
                  variant="link"
                  onClick={handleAddVariation}
                  className="admin-product-add-grams-price"
                >
                  Add Grams, Price & Stock
                </Button>
              </Form.Group>
            </Col>

            <Col md={3}>
              <div className="d-flex align-items-center">
                <Button
                  onClick={editIndex !== null ? handleEditProduct : addProduct}
                  className="add-product-list-button"
                  disabled={!productName.trim()}
                >
                  {editIndex !== null ? "Update Product" : "Add Product"}
                </Button>

                {editIndex !== null && (
                  <Button
                    className="add-product-cancel-button ms-2"
                    onClick={() => {
                      resetForm();
                      setEditIndex(null);
                    }}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </Col>
          </Row>
        </Form>

        {/* {products.length > 0 && ( */}
        <div className="table-responsive">
          <Table bordered className="mt-4 admin-product-table">
            <thead>
              <tr className="product-head">
                <th>S.No</th>
                <th>Product Name</th>
                {/* <th>Stock (Kg)</th> */}
                <th>Description</th>
                <th>Category</th>
                <th>Grams, Price & Stock</th>
                <th>Image</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((product, index) => (
                  <tr
                    key={index}
                    className={`admin-product-row ${
                      product.product_status === "hidden"
                        ? "hidden-product"
                        : ""
                    }`}
                  >
                    <td>{index + 1}</td>
                    <td>{product.product_name}</td>
                    {/* <td>{product.stock}</td> */}
                    <td className="product-description-column">
                      {product.description}
                    </td>
                    <td>{product.category_name}</td>
                    <td>
                      {product.price_grams?.map((variation, idx) => (
                        <div key={idx}>
                          {variation.grams} - ₹{variation.price} —{" "}
                          {variation.stock}
                        </div>
                      ))}
                    </td>
                    <td>
                      <Image
                        src={`${BASE_URL}/${product.product_image}`}
                        alt={product.product_name}
                        thumbnail
                        className="admin-product-thumbnail-img"
                      />
                    </td>
                    <td className="pt-3">
                      <div className="admin-product-actions">
                        <FiEdit
                          className="admin-product-action-icon admin-product-edit-icon me-3"
                          title="Edit"
                          onClick={() => {
                            setProductName(product.product_name);
                            setCategoryId(product.category_id);
                            setCategoryName(product.category_name);
                            setVariations(product.price_grams);
                            setDescription(product.description);
                            setEditIndex(index);

                            formRef.current?.scrollIntoView({
                              behavior: "smooth",
                              block: "start",
                            });
                          }}
                        />
                        <FaTrashAlt
                          className="admin-product-action-icon admin-product-delete-icon"
                          onClick={() => {
                            setProductToDelete(index);
                            setShowDeleteModal(true);
                          }}
                        />

                        <Button
                          onClick={() => toggleHideProduct(index)}
                          className="admin-product-toggle"
                        >
                          {product.product_status === "hidden" ? (
                            <MdVisibilityOff />
                          ) : (
                            <MdVisibility />
                          )}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="empty-product-row">
                  <td colSpan="7" className="text-center py-4">
                    No Products Found
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
        {/* )} */}

        {/* Delete Confirmation Modal */}
        <Modal
          show={showDeleteModal}
          onHide={() => setShowDeleteModal(false)}
          centered
        >
          <Modal.Body>
            <h2 className="product-delete-model">
              Are you sure you want to delete this product ?
            </h2>
          </Modal.Body>
          <Modal.Footer className="product-delete-model-buttons">
            <Button
              className="product-yes-delete-model-button"
              onClick={handleDeleteProduct}
            >
              Yes, Delete
            </Button>
            <Button
              className="product-cancel-delete-model-button"
              onClick={() => setShowDeleteModal(false)}
            >
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </section>
  );
};

export default AdminProducts;
