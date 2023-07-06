import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Store.css";
import { exportToCSV } from "../utils";

const StoreAdminCommision = () => {
  const [commisions, setCommisions] = useState([]);
  //must check endpoint

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API}/orders/commisions`).then((res) => {
      setCommisions(res.data);
    });
  }, []);

  return (
    <>
      <div
        style={{
          minHeight: "100vh",
        }}
        className="h-100 store-container d-flex justify-content-center p-5"
      >
        <div className=" w-100" id="store-admin-admin456412123">
          <p> These are the products exists inside the store </p>

          <div className="d-flex"></div>

          <div className="d-flex">
            <Link
              to="/store/product/add-product"
              style={{ marginRight: "30px" }}
            >
              <button className="btn btn-success">
                <i class="fa-solid fa-plus mx-2"></i> Add Product to Store
              </button>
            </Link>

            <button
              onClick={() => exportToCSV(commisions, "Products")}
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
                <th scope="col">#</th>
                <th scope="col">Comision ID</th>
                <th scope="col">Order ID</th>
                <th scope="col">Comision</th>
              </tr>
            </thead>
            <tbody>
              {commisions &&
                commisions.map((com, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{com.id}</td>
                    <td>{com.orderId}</td>
                    <td>{com.commision}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default StoreAdminCommision;
