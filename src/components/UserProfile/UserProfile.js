import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Form, Button, Nav } from "react-bootstrap";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { USERPROFILE_API } from "../../api/api";

import ProfilePicture from "../../assets/user-profile-icon.png";
import { useNavigate } from "react-router-dom";

import "./UserProfile.css";

const UserProfile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("userinfo");
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [passwordData, setPasswordData] = useState({
    old_password: "",
    new_password: "",
    confirm_new_password: "",
  });

  const [originalUser, setOriginalUser] = useState(null);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loadingPassword, setLoadingPassword] = useState(false);
  const userId = localStorage.getItem("userId");

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;

    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (!userId) {
      navigate("/signin");
    } else {
      const fetchUserData = async () => {
        try {
          const userResponse = await fetch(USERPROFILE_API.GET_USER_DETAILS, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ user_id: userId }),
          });

          const userData = await userResponse.json();
          if (userData.statusCode === 200) {
            const u = userData.user;
            const parsedUser = {
              firstName: u.first_name || "",
              lastName: u.last_name || "",
              email: u.email || "",
              phone: u.phone_number || "",
              street: u.street || "",
              city: u.city || "",
              state: u.state || "",
              pincode: u.pincode || "",
            };

            setUser(parsedUser);
            setOriginalUser(parsedUser);
          } else {
            toast.error(`Error fetching user: ${userData.message}`);
          }
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      };
      fetchUserData();
    }
  }, [userId, navigate]);

  const isUserDataChanged = () => {
    return JSON.stringify(user) !== JSON.stringify(originalUser);
  };

  const validateUser = () => {
    const nameRegex = /^[A-Za-z\s]+$/;
    const phoneRegex = /^[6-9]\d{9}$/;
    const pincodeRegex = /^\d{6}$/;
    const streetRegex = /^[A-Za-z0-9\s,.-]+$/;

    if (!nameRegex.test(user.firstName)) {
      toast.error("First name must contain only letters");
      return false;
    }

    if (!nameRegex.test(user.lastName)) {
      toast.error("Last name must contain only letters");
      return false;
    }

    if (!phoneRegex.test(user.phone)) {
      toast.error("Enter valid Indian mobile number");
      return false;
    }

    if (!streetRegex.test(user.street)) {
      toast.error("Invalid street format");
      return false;
    }

    if (!nameRegex.test(user.city)) {
      toast.error("City must contain only letters");
      return false;
    }

    if (!nameRegex.test(user.state)) {
      toast.error("State must contain only letters");
      return false;
    }

    if (!pincodeRegex.test(user.pincode)) {
      toast.error("Pincode must be 6 digits");
      return false;
    }

    return true;
  };

  const handleUpdateUserData = async () => {
    const requestBody = {
      user_id: userId,
      first_name: user.firstName,
      last_name: user.lastName,
      email: user.email,
      phone_number: user.phone,
      street: user.street,
      city: user.city,
      state: user.state,
      pincode: user.pincode,
    };
    try {
      const updateResponse = await fetch(USERPROFILE_API.UPDATE_USER_DETAILS, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      const userUpdateData = await updateResponse.json();
      if (userUpdateData.statusCode === 200) {
        toast.success(userUpdateData.message);
        setOriginalUser(user);
      } else {
        toast.error(`Update failed: ${userUpdateData.message}`);
      }
    } catch (err) {
      console.error("Update error:", err);
      toast.error("An error occurred while updating user info.");
    }
  };

  const handleCancel = () => {
    if (originalUser) {
      setUser(originalUser);
      // toast.info("Changes discarded");
    }
  };

  const validatePassword = () => {
    const pattern = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}/;

    if (!passwordData.old_password) {
      toast.error("Enter current password");
      return false;
    }

    if (!pattern.test(passwordData.new_password)) {
      toast.error("Min 8 chars with uppercase, lowercase, number & symbol");
      return false;
    }

    if (passwordData.new_password !== passwordData.confirm_new_password) {
      toast.error("Passwords do not match!");
      return false;
    }

    return true;
  };

  const handleChangePassword = async () => {
    if (!validatePassword()) return;

    try {
      setLoadingPassword(true);

      const response = await fetch(
        // `https://annapurnafarms.digispheretech.in/user/${userId}/password`,
      USERPROFILE_API.CHANGE_PASSWORD(userId),
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(passwordData),
        },
      );

      const result = await response.json();

      if (result.statusCode === 200) {
        toast.success(result.message);

        setPasswordData({
          old_password: "",
          new_password: "",
          confirm_new_password: "",
        });

        localStorage.clear();
        setTimeout(() => {
          navigate("/signin");
        }, 2000);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error(error);
      // toast.error("Server error");
    } finally {
      setLoadingPassword(false);
    }
  };

  return (
    <div className="userprofile-container">
      {/* Banner */}
      <div className="userprofile-banner"></div>

      <Container fluid className="px-5 py-3">
        <Card className="userprofile-card">
          <div className="text-center d-flex align-items-center justify-content-start gap-3">
            <img
              src={ProfilePicture}
              alt="Profile"
              className="userprofile-avatar"
            />
            <div className="text-start">
              <h4 className="userprofile-name mb-1">
                {user.firstName} {user.lastName}
              </h4>
              <p className="mb-0">{user.email}</p>
            </div>
          </div>

          {/* Tabs */}
          <Nav variant="tabs" className="user-profil-top mt-3">
            <Nav.Item>
              <Nav.Link
                eventKey="userinfo"
                className="user-profil-top-1"
                active={activeTab === "userinfo"}
                onClick={() => setActiveTab("userinfo")}
              >
                User Info
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="changepassword"
                className="user-profil-top-1"
                active={activeTab === "changepassword"}
                onClick={() => setActiveTab("changepassword")}
              >
                Change Password
              </Nav.Link>
            </Nav.Item>
          </Nav>

          {/* Tab Content */}
          <Card.Body>
            {activeTab === "userinfo" ? (
              <Form>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3 userprofile-small-title">
                      <Form.Label htmlFor="firstName">First Name</Form.Label>
                      <Form.Control
                        id="firstName"
                        type="text"
                        value={user.firstName}
                        onChange={(e) =>
                          setUser({ ...user, firstName: e.target.value })
                        }
                        className="signin-input-field user-profile-input-field"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3 userprofile-small-title">
                      <Form.Label htmlFor="lastName">Last Name</Form.Label>
                      <Form.Control
                        id="lastName"
                        type="text"
                        value={user.lastName}
                        onChange={(e) =>
                          setUser({ ...user, lastName: e.target.value })
                        }
                        className="signin-input-field user-profile-input-field"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3 userprofile-small-title">
                      <Form.Label htmlFor="email">Email Address</Form.Label>
                      <Form.Control
                        id="email"
                        type="email"
                        value={user.email}
                        onChange={(e) =>
                          setUser({ ...user, email: e.target.value })
                        }
                        className="signin-input-field user-profile-input-field"
                        readOnly
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3 userprofile-small-title">
                      <Form.Label htmlFor="phone">Mobile Number</Form.Label>
                      <Form.Control
                        id="phone"
                        type="text"
                        value={user.phone}
                        onChange={(e) =>
                          setUser({ ...user, phone: e.target.value })
                        }
                        className="signin-input-field user-profile-input-field"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3 userprofile-small-title">
                      <Form.Label htmlFor="street">
                        House No / Street
                      </Form.Label>
                      <Form.Control
                        id="street"
                        type="text"
                        value={user.street}
                        onChange={(e) =>
                          setUser({ ...user, street: e.target.value })
                        }
                        className="signin-input-field user-profile-input-field"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3 userprofile-small-title">
                      <Form.Label htmlFor="city">City</Form.Label>
                      <Form.Control
                        id="city"
                        type="text"
                        value={user.city}
                        onChange={(e) =>
                          setUser({ ...user, city: e.target.value })
                        }
                        className="signin-input-field user-profile-input-field"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3 userprofile-small-title">
                      <Form.Label htmlFor="state">State</Form.Label>
                      <Form.Control
                        id="state"
                        type="text"
                        value={user.state}
                        onChange={(e) =>
                          setUser({ ...user, state: e.target.value })
                        }
                        className="signin-input-field user-profile-input-field"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3 userprofile-small-title">
                      <Form.Label htmlFor="pincode">Pincode</Form.Label>
                      <Form.Control
                        id="pincode"
                        type="text"
                        value={user.pincode}
                        onChange={(e) =>
                          setUser({ ...user, pincode: e.target.value })
                        }
                        className="signin-input-field user-profile-input-field"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <div className="userprofile-buttons">
                  <Button
                    // variant="success"
                    className="me-2 user-profile-btn-save"
                    onClick={() => {
                      if (validateUser()) {
                        handleUpdateUserData();
                      }
                    }}
                    disabled={!isUserDataChanged()}
                  >
                    Save Changes
                  </Button>

                  {isUserDataChanged() && (
                    <Button
                      variant="danger"
                      className="user-profile-btn-cancel"
                      onClick={handleCancel}
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              </Form>
            ) : (
              <Form>
                <Form.Group className="mb-3 userprofile-small-title">
                  <Form.Label>Current Password</Form.Label>
                  <div className="password-wrapper">
                    <Form.Control
                      type={showCurrentPassword ? "text" : "password"}
                      className="user-profile-inputbar"
                      name="old_password"
                      value={passwordData.old_password}
                      onChange={handlePasswordChange}
                    />
                    <span
                      className="eye-icon"
                      onClick={() =>
                        setShowCurrentPassword(!showCurrentPassword)
                      }
                    >
                      {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                </Form.Group>
                {/* New Password Field */}
                <Form.Group className="mb-3 userprofile-small-title">
                  <Form.Label>New Password</Form.Label>
                  <div className="password-wrapper">
                    <Form.Control
                      type={showNewPassword ? "text" : "password"}
                      className="user-profile-inputbar"
                      name="new_password"
                      value={passwordData.new_password}
                      onChange={handlePasswordChange}
                      pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}"
                      title="Min 8 chars with uppercase, lowercase, number & symbol"
                    />
                    <span
                      className="eye-icon"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                </Form.Group>

                {/* Confirm Password Field */}
                <Form.Group className="mb-3 userprofile-small-title">
                  <Form.Label>Confirm Password</Form.Label>
                  <div className="password-wrapper">
                    <Form.Control
                      type={showConfirmPassword ? "text" : "password"}
                      className="user-profile-inputbar"
                      name="confirm_new_password"
                      value={passwordData.confirm_new_password}
                      onChange={handlePasswordChange}
                    />
                    <span
                      className="eye-icon"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                </Form.Group>

                <Button
                  type="button"
                  className="update-bnt"
                  onClick={handleChangePassword}
                  disabled={loadingPassword}
                >
                  {loadingPassword ? "Updating..." : "Update Password"}
                </Button>
              </Form>
            )}
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default UserProfile;
