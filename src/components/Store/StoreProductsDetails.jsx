import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { writeStorage } from "@rehooks/local-storage";

import { cartsub } from "../../services/cart";
import "./Store.css";

const StoreProductsDetails = () => {
  const [quantity, setQuantity] = useState(0);
  const [product, setProduct] = useState();
  let params = useParams();

  //let navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/products/${params.id}`)
      .then((res) => {
        setProduct(res.data);
      });
  }, [params]);

  const addToCart = () => {
    let cart = cartsub.value || [];
    let productInCart = cart.find((x) => x.id === product.id);
    if (!productInCart) {
      cart.push({
        product,
        quantity,
      });
      cartsub.next(cart);
      writeStorage("cart", cart);
    }
  };

  return (
    <div className="mx-vw-100 min-vh-100">
      <div className="latest-store-details-cover position-relative">
        <img src="https://i.ibb.co/rkfrhCm/banner18.webp" alt="" />
        <div className="store-products-top text-secondary position-absolute top-50 start-50 translate-middle">
          <p> Home Products {product && product.name} </p>
        </div>
      </div>
      <div className="d-flex">
        <div className=" store-product-details-container">
          <div className="product-details-content w-100 h-100 d-flex flex-column align-items-center justify-content-center">
            <div class="row">
              <div class="col-4">
                {/* Image */}
                <img
                  className="product-details-img"
                  style={{
                    objectFit: "cover",
                  }}
                  src={product && product.image}
                  alt=""
                />
              </div>
              <div class="col-8">
                <div className="h-100 my-4 d-flex flex-column justify-content-center">
                  <h4>{product && product.name}</h4>
                  <h2 className="my-3" style={{ color: "#12af39" }}>
                    ${product && product.price}
                  </h2>
                  <p className="my-3">{product && product.description}</p>
                  <div className="quantity-area col-4 my-3">
                    <label className="form-label">Choose your quantity:</label>
                    <input
                      type="number"
                      className={`form-control ${quantity < 0 && "is-invalid"}`}
                      value={quantity}
                      style={{ width: "100px" }}
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                    <div class="invalid-feedback">
                      Please enter a valid amount
                    </div>
                  </div>
                  <div className="col-4 my-3">
                    <button
                      disabled={quantity <= 0}
                      onClick={addToCart}
                      id="product-details-buy-now"
                      className="btn product-details-buy-now w-100"
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreProductsDetails;
