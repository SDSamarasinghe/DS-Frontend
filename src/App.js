import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";


import "./App.css";

//basic imports
import Navigator from "./components/Navigator/Navigator";
import Footer from "./components/Footer";


//User imports
import Login from "./components/Users/Login";
import Register from "./components/Users/Register";

//store imports
import StoreHome from "./components/Store/StoreHome";
import StoreAddProductForm from "./components/Store/StoreAddProductForm";
import StoreAdminProductsEdit from "./components/Store/StoreAdminProductsEdit";

function App() {
  useEffect(() => {}, []);

  return (
    <BrowserRouter>
      <Navigator />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<Register />} />
      

        <Route path="/store" element={<StoreHome />} />
        <Route
          path="/store/product/add-product"
          element={<StoreAddProductForm />}
        />

        <Route
          path="/store/store-admin-products/edit/:pid"
          element={<StoreAdminProductsEdit />}
        />
        
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
