import axios from "axios";
import React, { useEffect, useState } from "react";
import swal from "sweetalert";

import { useParams, useNavigate } from "react-router-dom";
import "../Store/Store.css";
import { loadStripe } from "@stripe/stripe-js";
import stripe from "stripe";

const Profile = () => {
  const { status } = useParams();
  const navigate = useNavigate();

  const pubkey =
    "pk_test_51N0pauHJfferNMktTgB3tTiM2ZIJGzxoNZ5JH0J2DmU1WFf70Ywb3WLXtR9Fe1axXSFxzmkECoazUJsA4t8ng4gb00APeKTdwc";
  const promise = loadStripe(pubkey);

  const secKey = stripe(
    "sk_test_51N0pauHJfferNMktadU200vTPM41Q7xccJJH57fgdNGLt5UmSEdhSJLl1LuIPMUWtkxXOaKtv1VNWV0liWG2prP100kzTHyPUw"
  );

  const [currentUsers, setCurrentUser] = useState([]);

  //must check endpoint
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/orders/current-user`)
      .then((res) => {
        setCurrentUser(res.data);
      });
  }, []);

  useEffect(() => {
    if (status === "success") {
      swal({
        title:
          "Thank you, your payment was successful! We will deliver the order to you soon!",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#12af39",
        className: "store-swal-button",
      }).then(() => {
        navigate("/profile");
      });
    }

    if (status === "failed") {
      swal({
        title: "Payment failed! Please try again later!",
        icon: "warning",
        confirmButtonText: "OK",
        confirmButtonColor: "#12af39",
        dangerMode: true,
      }).then(() => {
        navigate("/profile");
      });
    }
  }, [status, navigate]);

  const sendToCheck = async (order) => {
    const items =
      order.products.map((product) => {
        return {
          price_data: {
            currency: "usd",
            product_data: {
              images: [product.product.image],
              name: product.product.name,
            },
            unit_amount: product.product.price * 100,
          },
          quantity: product.quantity,
        };
      }) || [];

    const stripe = await promise;

    const redirectURL =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/profile/success"
        : `${process.env.REACT_APP_API}/profile/success`;

    const redirectURL1 =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/profile/failed"
        : `${process.env.REACT_APP_API}/profile/failed`;

    const sess = await secKey.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: items,
      mode: "payment",
      success_url: redirectURL,
      cancel_url: redirectURL1,
      metadata: {
        orderId: order.id,
      },
    });

    await stripe?.redirectToCheckout({
      sessionId: sess.id,
    });
  };

  return (
    <div className="store-container d-flex justify-content-center p-5">
      <div>
        {currentUsers.map((data) => (
          <div key={data.id}>
            {console.log(data)}
            <h3>Order ID: {data.id}</h3>
            <p>User ID: {data.userId}</p>
            <p>Status: {data.status}</p>
            <h4>Products:</h4>
            {data.products.map((item) => (
              <div key={item.product.id}>
                <p>Name: {item.product.name}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Price: {item.product.price}</p>
                <p>Buy Price: {item.product.buyPrice}</p>
              </div>
            ))}

            {data.status === "Approved" && (
              <button
                onClick={() => {
                  sendToCheck(data);
                }}
                className="btn btn-success"
              >
                Pay Bill
              </button>
            )}
            <p>Total Price: {data.totalPrice}</p>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
