import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import SignIn from "./Backoffice/Login/login-view";
import SignUp from "./Backoffice/Login/Register";

import EnhancedTable from "./Backoffice/Users/user-list";
import EnhancedTableContact from "./Backoffice/Contacts/contact-list";
import EnhancedTableProduct from "./Backoffice/Products/product-list";
import EnhancedTableOrder from "./Backoffice/orders/order-list";

import PageNotFound from "./Backoffice/layout/PageNotFound";
import Layout from "./Backoffice/layout/Layout";
import Dashboard from "./Backoffice/Dashboard/Dashboard";
import Products from "./Ecommerce/components/products/products";
import ProductOverview from "./Ecommerce/components/products/ProductOverview";
import Storenav from "./Ecommerce/components/Storenav";
import Storelayout from "./Ecommerce/components/Storelayout";
import CartMenu from "./Ecommerce/components/cart/Cart";
import Checkout from "./Ecommerce/components/checkout/Checkout";
import Home from "./Ecommerce/components/home/Home";
import CategoryFil from "./Ecommerce/components/CategoryFil";
import Profile from "./Ecommerce/components/Profile"

import PrivateRoute from "./Backoffice/Login/PrivateRoute";

import { jwtDecode } from 'jwt-decode'

import ContactPage from "./Ecommerce/components/ContactPage";

function App() {
  const [cartItems, setCartItems] = useState([]);
  console.log("CARTITEMS FROM APP.JS", cartItems);

  const [token, setToken] = useState(null);
  const [userToken, setUserToken] = useState({});
  const [searchTerm, setSearchTerm] = useState(null);

  console.log("SEEEEEEARCH", searchTerm);

  useEffect(() => {
    const tokenTest = localStorage.getItem("token");
    console.log("tokenTest ??? : ", tokenTest);

    const cartitemStorage = localStorage.getItem("cartItems");
    console.log("cartitemStorage ///// : ", cartitemStorage);

 
    if (tokenTest) {
      setToken(tokenTest);

      const DecodeToken = jwtDecode(tokenTest);
      setUserToken({
        name: DecodeToken.user_name,
        role: DecodeToken.user_role,
        email: DecodeToken.user_email,
        phone: DecodeToken.user_phone,
      });

      console.log("userToken : ", {
        name: DecodeToken.user_name,
        role: DecodeToken.user_role,
        email: DecodeToken.user_email,
        phone: DecodeToken.user_phone,
      });
    }
  }, []);

  console.log("TOKEEEEN !!", token);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<SignIn setToken={setToken} setUserToken={setUserToken} />} />
        <Route path="register" element={<SignUp />} />

        {/* ****************** ECOMMERCE ************************ */}
        <Route path="/" element={<Storelayout cartItems={cartItems} setCartItems={setCartItems} userToken={userToken} onSearch={setSearchTerm}/>}>
          <Route index element={<Home />} />
          <Route path="products" element={<CategoryFil searchTerm={searchTerm} onSearch={setSearchTerm} />} />
          <Route path="/product/:productId" element={<ProductOverview cartItems={cartItems} setCartItems={setCartItems} />} />
          <Route path="/checkout" element={<Checkout cartItems={cartItems} setCartItems={setCartItems}  userToken={userToken} />} />
          <Route path="/profile" element={<Profile userToken={userToken}/>} />
          <Route path="/contact" element={<ContactPage userToken={userToken}/>} />

        </Route>

        {/* ********************** ADMIN *********************************** */}
        <Route element={<PrivateRoute userToken={userToken} setUserToken={setUserToken} allowedRoles={['Admin', 'Manager']} />}>
          <Route path="/admin" element={<Layout userToken={userToken} />}>
            <Route index element={<Dashboard />} />
            <Route path="users" element={<EnhancedTable />} />
            <Route path="contacts" element={<EnhancedTableContact />} />
            <Route path="products" element={<EnhancedTableProduct />} />
            <Route path="orders" element={<EnhancedTableOrder />} />
          </Route>
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
