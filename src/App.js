import ProductDetails from "./pages/ProductDetails";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Shipping from "./pages/Shipping";
import Login from "./pages/Login";
import OrderSuccess from "./pages/OrderSuccess";
import MyOrder from "./pages/MyOrder";
import ConfirmOrder from "./pages/ConfirmOrder";


import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter,Router, Routes, Route, Link } from "react-router-dom";
import { logout } from "./actions/AuthAction";
import { clearMessage } from "./actions/message";
import { history } from "./helper/history";
import WebFont from "webfontloader";

// import AuthVerify from "./common/AuthVerify";
import EventBus from "./common/EventBus";
import MyCart from "./pages/MyCart";

const App = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage()); // clear message when changing location
    });
  }, [dispatch]);

  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
  }, []);
  

  useEffect(() => {
    // if (currentUser) {
    //   setShowModeratorBoard(currentUser.roles.includes("ROLE_MODERATOR"));
    //   setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
    // } else {
    //   setShowModeratorBoard(false);
    //   setShowAdminBoard(false);
    // }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, [currentUser, logOut]);

  return (
    <BrowserRouter history={history}>
        <div className="container mt-3">
          <Routes>
            <Route exact path="/"  element={<Home />}/>
            <Route path="/login" element={<Login />} />
            {/* <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route> */}
            <Route exact path="/products" element={<ProductList />} />
            {/* <Route exact path="/register" component={Register} />
            <Route exact path="/products" component={Product} />
            <Route exact path="/product/:id" component={ProductDetails} /> */}
             {/* <Route  path="/product/:id" element={<Product />} /> */}
             <Route exact path="/product/:id" element={<ProductDetails />} />
             <Route path="/cart" element={<MyCart />} />
             <Route exact path="/shipping" element={<Shipping />} />

            <Route exact path="/success" element={<OrderSuccess />} />

          <Route exact path="/orders" element={<MyOrder />} />

          <Route exact path="/order/confirm" element={<ConfirmOrder />} />
          </Routes>
        </div>
    </BrowserRouter>
  )
};

export default App;