export const BASE_URL = "https://annapurnafarms.digispheretech.in";

// AdminSignin
export const Admin_Login = BASE_URL + "/admin/adminlogin";

// User-Signin-SignUp
export const User_SignUp = BASE_URL + "/user/userRegister";
export const User_SignIn = BASE_URL + "/user/usersignin";

export const Get_All_User_Data = BASE_URL + "/user/getallusers";

//Get All Products user side
export const GET_ALL_PRODUCTS = BASE_URL + "/products/getAllcategoryproducts";

//Get All Products Home page Feature Product
export const GET_ALL_HOME_FEATURE_PRODUCT = BASE_URL + "/products/home";

// Categories
export const CATEGORY_API = {
  ADD: `${BASE_URL}/category/addCategory`,
  GET_ALL: `${BASE_URL}/category/getallcategories`,
  UPDATE: `${BASE_URL}/category/updatecategory`,
  DELETE: `${BASE_URL}/category/deletecategory`,
};

// Products
export const PRODUCT_API = {
  ADD: `${BASE_URL}/products/addproduct`,
  GET_ALL: `${BASE_URL}/products/getallProduct`,
  UPDATE: `${BASE_URL}/products/updateProduct`,
  DELETE: `${BASE_URL}/products/deleteProduct`,
  STATUS: `${BASE_URL}/products/updateProductStatus`,
};

// Carousel
export const CAROUSEL_API = {
  ADD: `${BASE_URL}/carousel/addcarousel`,
  GET_ALL: `${BASE_URL}/carousel/getallcarousel`,
  UPDATE: `${BASE_URL}/carousel/updatecarousel`,
  DELETE: `${BASE_URL}/carousel/deletecarousel`,
};

// Coupons
export const COUPONS_API = {
  ADD: `${BASE_URL}/coupons/addCoupon`,
  GET_ALL: `${BASE_URL}/coupons/getallCoupons`,
  UPDATE: `${BASE_URL}/coupons/updateCoupons`,
  DELETE: `${BASE_URL}/coupons/deleteCoupon`,
};

//User Profile
export const USERPROFILE_API = {
  GET_USER_DETAILS: `${BASE_URL}/user/getuser`,
  UPDATE_USER_DETAILS: `${BASE_URL}/user/updateUser`,
  CHANGE_PASSWORD: (userId) => `${BASE_URL}/user/${userId}/password`,
};

//Cart
export const CART_API = {
  ADD_CART: `${BASE_URL}/cart/addcart`,
  GET_ALL_CART_DETAILS: `${BASE_URL}/cart/getcartdetails`,
  UPDATE_CART: `${BASE_URL}/cart/updateCartproduct`,
  DELETE_CART: `${BASE_URL}/cart/deletecart`,
  DELETE_ALL_CART: `${BASE_URL}/cart/deleteallcart`,

  CART_COUNT: `${BASE_URL}/cart/count`,
};

//orders
export const ORDERS_API = {
  ADD_ORDER: `${BASE_URL}/order/addorder`,
  GET_ORDER_DETAILS_BY_USER: `${BASE_URL}/order/getorderdetailssuserbyid`,
  GET_ORDERS: `${BASE_URL}/order/getOrders`,
  GET_ORDER_PRODUCTS: `${BASE_URL}/order/getorderproducts`,
  UPDATE_ORDER_STATUS: `${BASE_URL}/order/updateOrderstatus`,
};

//Dashboard
export const DASHBOARD_API = {
  ORDER_STATUS_COUNT: `${BASE_URL}/dashboard/orderStatusCount`,
  GET_ORDERS_BY_STATUS: `${BASE_URL}/dashboard/getOrdersByStatus`,
};

// export const Add_Coupon = BASE_URL + '/coupons/addCoupon';
// export const Get_Coupons = BASE_URL + '/coupons/getallCoupons';
// export const Delete_Coupon = BASE_URL + '/coupons/deleteCoupon';
// export const Update_Coupon = BASE_URL + '/coupons/updateCoupons';

//Notify
export const NOTIFY_API = {
  NOTIFY_REQUEST: `${BASE_URL}/notify/notifyRequest`,
  GET_NOTIFY_REQUEST: `${BASE_URL}/notify/getnotifyrequest`,
  GET_USER_NOTIFY: `${BASE_URL}/notify/getusernotify`,
  UPDATE_NOTIFY_STATUS: `${BASE_URL}/notify/updatenotifystatus`,
};

//public contact api
export const CONTACT_API = {
  CONTACT_US: `${BASE_URL}/contact-us`,
};

//public forgot api
export const FORGOT_PASSWORD_API = {
  FORGOT_PASSWORD: `${BASE_URL}/user/forgotPassword`,
  VERIFY_OTP: `${BASE_URL}/user/verifyForgotPasswordOtp`,
  RESET_PASSWORD: `${BASE_URL}/user/resetPassword`,
};


export const FEATURED_PRODUCTS = {
  GET_HOME_PRODUCTS: `${BASE_URL}/products/home`,
};