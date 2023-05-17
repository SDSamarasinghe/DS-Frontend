import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import "./Store.css";
import { exportToCSV } from "../utils";


const StoreAdminOrders = () => {
  const [products, setProducts] = useState([]);
  //must check endpoint

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/inventory/products`)
      .then((res) => {
        setProducts(res.data);
      });
  }, []);

  const deleteProduct = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this product!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .delete(`${process.env.REACT_APP_API}/inventory/products/${id}`)
          .then(() => {
            swal("Product Deleted Successfully!", {
              icon: "success",
            });

            axios
              .get(`${process.env.REACT_APP_API}/inventory/products`)
              .then((res) => {
                setProducts(res.data);
              });
          });
      }
    });
  };



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

          <div className="d-flex">
        
        </div>

          <div className="d-flex">
            <Link to="/store/product/add-product" style={{marginRight:"30px"}}>
              <button className="btn btn-success">
                <i class="fa-solid fa-plus mx-2"></i> Add Product to Store
              </button>
            </Link>

            <button
            onClick={() => exportToCSV(products, "Products")}
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
                <th scope="col">Product ID</th>
                <th scope="col">Product Name</th>
                <th scope="col">Category</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products &&
                products.map((prod, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>
                      <img
                        alt="product"
                        src={prod.image}
                        style={{
                          width: "40px",
                          height: "40px",
                          objectFit: "cover",
                          borderRadius: "8px",
                          marginRight: "20px",
                        }}
                      />
                      {prod.name}
                    </td>
                    <td>{prod.category}</td>
                    <td style={{ width: "300px" }}>
                      <Link to={`/store/store-admin-products/edit/${prod.id}`}>
                        <button
                          type="button"
                          class="btn btn-outline-warning mx-2"
                        >
                          Edit <i class="fa-solid fa-pen-to-square"></i>
                        </button>
                      </Link>

                      <button
                        onClick={() => deleteProduct(prod.id)}
                        type="button"
                        class="btn btn-outline-danger"
                      >
                        Delete <i class="fa-solid fa-xmark"></i>
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default StoreAdminOrders;
