import React, { useState } from "react";
import axios from "axios";
import "./StoreCart.css";
import { useEffect } from "react";
import { cartsub } from "../../services/cart";
import { loadStripe } from "@stripe/stripe-js";
import stripe from "stripe";
import { writeStorage } from "@rehooks/local-storage";
const pubkey =
  "pk_test_51N0pauHJfferNMktTgB3tTiM2ZIJGzxoNZ5JH0J2DmU1WFf70Ywb3WLXtR9Fe1axXSFxzmkECoazUJsA4t8ng4gb00APeKTdwc";
const promise = loadStripe(pubkey);

const secKey = stripe(
  "sk_test_51N0pauHJfferNMktadU200vTPM41Q7xccJJH57fgdNGLt5UmSEdhSJLl1LuIPMUWtkxXOaKtv1VNWV0liWG2prP100kzTHyPUw"
);

const StoreShoppingCart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    cartsub.asObservable().subscribe((x) => setCart(x));
  }, []);

  const createOrder = async () => {
    const order = {
      products: cart.map((x) => ({
        product: x.product.id,
        quantity: x.quantity,
      })),
    };

    await axios
      .post("http://florage-api.pasinduprabhashitha.com/api/orders", order)
      .then((res) => {
        sendToCheck(res);
      })
      .catch((error) => {
        console.log(error);
        alert("Something went wront. Please try again later.");

        return;
      });
  };

  const sendToCheck = async (res) => {
    const items =
      cart?.map((item) => {
        return {
          price_data: {
            currency: "usd",
            product_data: {
              images: [item.product.image],
              name: item.product.name,
            },
            unit_amount: item.product.price * 100,
          },
          quantity: item.quantity,
        };
      }) || [];

    const stripe = await promise;

    const redirectURL =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : process.env.FRONTEND_DOMAIN;

    console.log("res", res);

    const sess = await secKey.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: items,
      mode: "payment",
      success_url: redirectURL,
      cancel_url: redirectURL,
      metadata: {
        orderId: res.data.id,
      },
    });

    await stripe?.redirectToCheckout({
      sessionId: sess.id,
    });
  };

  return (
    <div>
      <div class="container py-5 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-12">
            <div
              class="card card-registration card-registration-2"
              style={{ borderRadius: "15px" }}
            >
              <div class="card-body p-0">
                <div class="row g-0">
                  <div class="col-lg-8">
                    <div class="p-5">
                      <div class="d-flex justify-content-between align-items-center mb-5">
                        <h1 class="fw-bold mb-0 text-black">Shopping Cart</h1>
                        <h6 class="mb-0 text-muted">{cart?.length} items</h6>
                      </div>

                      {cart?.map((item) => (
                        <div key={item.id}>
                          <hr class="my-4" />

                          <div class="row mb-4 d-flex justify-content-between align-items-center">
                            <div class="col-md-2 col-lg-2 col-xl-2">
                              <img
                                src={item.product.image}
                                class="img-fluid rounded-3"
                                alt="Cotton T-shirt"
                              />
                            </div>
                            <div class="col-md-3 col-lg-3 col-xl-3">
                              <h6 class="text-black mb-0">
                                {item.product.name}
                              </h6>
                            </div>
                            <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
                              <button
                                class="btn btn-link px-2"
                                onclick="this.parentNode.querySelector('input[type=number]').stepDown()"
                              >
                                <i class="fas fa-minus"></i>
                              </button>

                              <input
                                id="form1"
                                min="0"
                                name="quantity"
                                value={item.quantity}
                                type="number"
                                class="form-control form-control-sm"
                              />

                              <button
                                class="btn btn-link px-2"
                                onclick="this.parentNode.querySelector('input[type=number]').stepUp()"
                              >
                                <i class="fas fa-plus"></i>
                              </button>
                            </div>
                            <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                              <h6 class="mb-0">€ {item.product.price}</h6>
                            </div>
                            <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                              <i
                                style={{
                                  cursor: "pointer",
                                }}
                                class="fas fa-times"
                                onClick={() => {
                                  const cartN = cart.filter(
                                    (x) => x.id !== item.id
                                  );
                                  cartsub.next(cartN);
                                  writeStorage("cart", cartN);
                                }}
                              >
                                x
                              </i>
                            </div>
                          </div>

                          <hr class="my-4" />
                        </div>
                      ))}

                      <div class="pt-5">
                        <h6 class="mb-0">
                          <a href="/store" class="text-body">
                            <i class="fas fa-long-arrow-alt-left me-2"></i>
                            Back to shop
                          </a>
                        </h6>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-4 bg-grey">
                    <div class="p-5">
                      <h3 class="fw-bold mb-5 mt-2 pt-1">Summary</h3>
                      <hr class="my-4" />

                      <div class="d-flex justify-content-between mb-4">
                        <h5 class="text-uppercase">items {cart?.length}</h5>
                        <h5>
                          €{" "}
                          {cart?.reduce((accumulator, currentValue) => {
                            return (
                              accumulator +
                              currentValue?.product?.price *
                                currentValue?.quantity
                            );
                          }, 0)}
                        </h5>
                      </div>

                      <h5 class="text-uppercase mb-3">Shipping</h5>

                      <div class="mb-4 pb-2">
                        <select class="select">
                          <option value="1">Standard-Delivery- €5.00</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                          <option value="4">Four</option>
                        </select>
                      </div>

                      <hr class="my-4" />

                      <div class="d-flex justify-content-between mb-5">
                        <h5 class="text-uppercase">Total price</h5>
                        <h5>
                          €{" "}
                          {cart?.reduce((accumulator, currentValue) => {
                            return (
                              accumulator +
                              currentValue?.product?.price *
                                currentValue?.quantity
                            );
                          }, 0)}
                        </h5>
                      </div>

                      <button
                        type="button"
                        class="btn btn-dark btn-block btn-lg"
                        data-mdb-ripple-color="dark"
                        onClick={createOrder}
                      >
                        Place Order
                      </button>
                    </div>
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

export default StoreShoppingCart;
