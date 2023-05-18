import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Store.css";
import { exportToCSV } from "../utils";
import swal from "sweetalert";

const StoreAdminOrders = () => {
  const [orders, setOrders] = useState([]);

  //must check endpoint
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API}/orders`).then((res) => {
      setOrders(res.data);
    });
  }, []);

  const approveOrder = (orderid) => {
    axios
      .post(`${process.env.REACT_APP_API}/orders/approved?orderId=${orderid}`)
      .then(() => {
        swal("Order Approved Successfully!", {
          icon: "success",
        });

        axios.get(`${process.env.REACT_APP_API}/orders`).then((res) => {
          setOrders(res.data);
        });
      });
  };

  return (
    <div className="store-container d-flex justify-content-center p-5">
      <div className="min-vh-100 w-100" id="store-admin-admin456412123">
        <h3> Store Order Admin </h3>
        <p> These are the orders recived inside this month </p>

        <div className="d-flex">
          <button
            onClick={() => exportToCSV(orders, "Orders")}
            type="button"
            class="btn btn-primary"
          >
            Download Report
          </button>
        </div>

        <table
          class="table mt-4 store-orders-container pdfdiv"
          id="app-store-admin-table-header-44512135"
        >
          <thead className="store-admin-table-header">
            <tr>
              <th scope="col">Order ID</th>
              <th scope="col">Customer ID</th>
              <th scope="col">Amount</th>
              <th scope="col">Status</th>
              <th scope="col">Total Price</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders &&
              orders.map((order) => (
                <tr key={order.id}>
                  {/* <div key={order.id}> */}
                  <td>
                    <h5>Order {order.id}</h5>
                  </td>
                  <td>
                    <p>User ID: {order.userId}</p>
                  </td>
                  <td>
                    <p>Total Price: {order.totalPrice}</p>
                  </td>
                  <td>
                    <p>Status: {order.status}</p>
                  </td>
                  <td>
                    <ul>
                      {order.products.map((item) => (
                        <li key={item.product.id}>
                          {item.product.name} - {item.quantity} x $
                          {item.product.price} = $
                          {item.quantity * item.product.price}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>
                    {order.status === "Pending" && (
                      <button
                        className="btn btn-success"
                        onClick={() => {
                          approveOrder(order.id);
                        }}
                      >
                        <i class="fa-solid fa-check mx-2"></i> Approve Order
                      </button>
                    )}
                  </td>
                  {/* </div> */}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StoreAdminOrders;
