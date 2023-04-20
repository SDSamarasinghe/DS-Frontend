import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import swal from "sweetalert";

const StoreAdminProductsEdit = () => {
  const [name, setName] = useState("");
  const [description, setdescription] = useState("");
  const [img, setImg] = useState("");
  const [price, setPrice] = useState("");
  const [stockCount, setStockCount] = useState("");
  const [buyPrice, setbuyPrice] = useState("");
  const [sellPrice, setsellPrice] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();
  const [errors, setErrors] = useState("");

  const { pid } = useParams();

  const saveProduct = async (e) => {
    e.preventDefault();
    const product = {
      name,
      description,
      image: img,
      price,
      stockCount,
      buyPrice,
      sellPrice,
      category,
    };

    axios
      .put(`http://florage-api.pasinduprabhashitha.com/api/inventory/products/${pid}`, product)
      .then((response) => {
        swal({
          title: "Product Updated Successfully!",
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "#12af39",
          className: "store-swal-button",
        }).then(() => {
          navigate(-1);
        });
      });
  };

  useEffect(() => {
    axios.get(`http://florage-api.pasinduprabhashitha.com/api/products/${pid}`).then((res) => {
      setName(res.data.name);
      setdescription(res.data.description);
      setImg(res.data.image);
      setPrice(res.data.price);
      setStockCount(res.data.stockCount);
      setbuyPrice(res.data.buyPrice);
      setsellPrice(res.data.sellPrice);
      setCategory(res.data.setCategory);
    });
  }, [pid]);

  return (
    <div className="store-add-product py-4 d-flex align-items-center flex-column justify-content-center">
      <div className="store-admin-edit-form p-4">
        <h2 className="display-6"> Edit Product on Store </h2>
        <small id="emailHelp" className="form-text text-muted">
          Enter thenew details that you need to edit
        </small>

        <div className="store-add-product-form-inner  py-4">
          <form>
            <div className="form-group my-2">
              <label className="my-1">Name</label>
              <input
                type="email"
                className="form-control"
                aria-describedby="emailHelp"
                placeholder="Name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            
            <div className="form-group my-4">
              <label className="my-1">Image</label>
              <input
                type="text"
                className="form-control"
                placeholder="Image"
                value={img}
                onChange={(e) => {
                  setImg(e.target.value);
                }}
              />
            </div>

            <div className="form-group my-4">
              <label className="my-1">Description</label>
              <textarea
                type="text"
                className="form-control"
                placeholder="Description"
                value={description}
                onChange={(e) => {
                  setdescription(e.target.value);
                }}
              />
            </div>

            <div className="form-group my-4">
              <label className="my-1">Stock Quantity</label>
              <input
                type="number"
                className="form-control"
                placeholder="Unit Price"
                value={stockCount}
                onChange={(e) => {
                  setStockCount(e.target.value);
                }}
              />
            </div>

            <div className="form-group my-4">
              <label className="my-1">Unit Price</label>
              <input
                
                className="form-control"
                placeholder="Unit Price"
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
            </div>


            <div className="form-group my-4">
              <label className="my-1">Buy Price</label>
              <input
                type="number"
                className="form-control"
                placeholder="Buy Price"
                value={buyPrice}
                onChange={(e) => {
                  setbuyPrice(e.target.value);
                }}
              />
            </div>

            <div className="form-group my-4">
              <label className="my-1">Sell Price</label>
              <input
                type="number"
                className="form-control"
                placeholder="Sell Price"
                value={sellPrice}
                onChange={(e) => {
                  setsellPrice(e.target.value);
                }}
              />
            </div>

            <div className="form-group my-2">
              <label className="my-1">Category</label>
              <input
                type="email"
                className="form-control"
                aria-describedby="emailHelp"
                placeholder="Category"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
              />
            </div>


            <button
              type="submit"
              className="btn w-100"
              onClick={saveProduct}
              style={{ background: "rgb(18, 175, 57)", color: "white" }}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StoreAdminProductsEdit;
