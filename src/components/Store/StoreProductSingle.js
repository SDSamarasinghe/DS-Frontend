import React from "react";
import { useNavigate } from "react-router";
import "./Store.css";

const StoreProductSingle = ({ img, title, price, cat, id }) => {
  //must check endpoint
  // const deleteProduct = async () => {
  //   const { status } = await axios.delete(
  //     `http://florage-api.pasinduprabhashitha.com/api/Products/${id}`
  //   );

  //   alert("Product Deleted Successfully");
  // };
  const navigate = useNavigate();

  return (
    <div className="product-card">
      <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
        <div class="hovereffect" style={{ width: "270px" }}>
          <img className="product-image" src={img} alt="" />
          <div class="overlay">
            <h2>Florage Products</h2>
            <p className="my-2" style={{ fontSize: "30px", color: "#ffffff" }}>
              <b>{title}</b>
            </p>
            <p style={{ fontSize: "30px", color: "#12af39" }}>
              <b>${price}</b>
            </p>

            <button
              class="btn btn-primary"
              href="A link to carousal image"
              onClick={() => {
                navigate(`/store/products/product/${id}`);
              }}
            >
              Buy now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreProductSingle;
