import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";


import "./App.css";

//basic imports
import Navigator from "./components/Navigator/Navigator";
import Footer from "./components/Footer";


//User imports
import Login from "./components/Users/Login";
import Register from "./components/Users/Register";



function App() {
  useEffect(() => {}, []);

  return (
    <BrowserRouter>
      <Navigator />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<Register />} />
      
       
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
