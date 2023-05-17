import axios from "axios";
import React, { useEffect, useState } from "react";
import "../Store/Store.css";
import { exportToCSV } from "../utils";

const Profile = () => {
  const [currentUsers, setCurrentUser] = useState([]);

  //must check endpoint
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/orders/current-user`)
      .then((res) => {
        setCurrentUser(res.data);
      });
  }, []);

  return (
    <div className="store-container d-flex justify-content-center p-5">
      <div>
      {currentUsers.map((data) => (
        <div key={data.id}>
          <h3>Order ID: {data.id}</h3>
          <p>User ID: {data.userId}</p>
          <p>Status: {data.status}</p>
          <h4>Products:</h4>
          {data.products.map((item) => (
            <div key={item.product.id}>
              <p>Name: {item.product.name}</p>
              <p>Description: {item.product.description}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Price: {item.product.price}</p>
              <p>Buy Price: {item.product.buyPrice}</p>
            </div>
          ))}
          <p>Total Price: {data.totalPrice}</p>
          <hr />
        </div>
      ))}
    </div>
    </div>
  );
};

export default Profile;
