import React, { useEffect } from "react";
import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { addUser, adminSub, userSub } from "./services/user";

import "./App.css";

//basic imports
import Navigator from "./components/Navigator/Navigator";
import Footer from "./components/Footer";

//User imports
import Login from "./components/Users/Login";
import Register from "./components/Users/Register";
import Profile from "./components/Users/Profile";

//store imports
import StorePaymentScreen from "./components/Store/StorePaymentScreen";
import StoreAdminProductsEdit from "./components/Store/StoreAdminProductsEdit";
import StoreAdminProducts from "./components/Store/StoreAdminProducts";
import StoreShoppingCart from "./components/Store/StoreShoppingCart";
import StoreAdminOrders from "./components/Store/StoreAdminOrders";
import StoreAdminPayments from "./components/Store/StoreAdminPayments";
import StoreHome from "./components/Store/StoreHome";
import StoreAdminCommisions from "./components/Store/StoreAdminCommision";
import StoreProducts from "./components/Store/StoreProducts";
import StoreProductsDetails from "./components/Store/StoreProductsDetails";
import StoreOrderForm from "./components/Store/StoreOrderForm";
import StoreAddProductForm from "./components/Store/StoreAddProductForm";
import { useLocalStorage } from "@rehooks/local-storage";
import { cartsub } from "./services/cart";

function App() {
  const [user] = useLocalStorage("florage-user");
  const [cart] = useLocalStorage("cart");
  const [admin] = useLocalStorage("florage-admin");

  useEffect(() => {
    userSub.next(user);
    cartsub.next(cart);
    adminSub.next(admin);
    userSub.asObservable().subscribe((user) => {
      if (user) {
        axios.defaults.headers.common["Authorization"] = addUser(user);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BrowserRouter>
      <Navigator />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<Register />} />
        <Route path="/profile" element={<Profile />}>
          <Route path=":status" element={<Profile />} />
        </Route>

        <Route path="/" element={<StoreHome />} />
        <Route path="/store/products/:category" element={<StoreProducts />} />
        <Route
          path="/store/products/product/:id"
          element={<StoreProductsDetails />}
        />
        <Route
          path="/store/order/store-order-create/:product/:quantity/:price"
          element={<StoreOrderForm />}
        />
        <Route
          path="/store/order/payment/:orderId"
          element={<StorePaymentScreen />}
        />
        <Route
          path="/store/product/add-product"
          element={<StoreAddProductForm />}
        />
        <Route
          path="/store/store-admin-products"
          element={<StoreAdminProducts />}
        />
        <Route
          path="/store/store-admin-orders"
          element={<StoreAdminOrders />}
        />
        <Route
          path="/store/store-admin-payments"
          element={<StoreAdminPayments />}
        />
        <Route
          path="/store/store-admin-products/edit/:pid"
          element={<StoreAdminProductsEdit />}
        />
        <Route
          path="/store/store-shopping-cart"
          element={<StoreShoppingCart />}
        />

        <Route path="/store/commisions" element={<StoreAdminCommisions />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
