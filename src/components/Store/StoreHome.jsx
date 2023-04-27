import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StoreProductSingle from "./StoreProductSingle";
import oil from "./img/essential-oils.jpg"
import cat1 from "./img/herbal-treatment.png"
import cat2 from "./img/herbal.png"
import cat3 from "./img/herbal-massage.png"
import cat4 from "./img/herbal (1).png"

const StoreHome = () => {
  const [products, setProducts] = useState([]);
//must check endpoint
  useEffect(() => {
    axios.get(`http://florage-api.pasinduprabhashitha.com/api/products/`).then((res) => {
      setProducts(res.data);
    });
  }, []);

  return (
    <div className="vw-100 min-vh-100" style={{ backgroundColor: "#F5F5F5" }}>
      {/* Upper Images */}

      <div
        id="carouselExampleCaptions"
        class="carousel slide store-carousel"
        data-bs-ride="carousel"
      >
        <div class="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="0"
            class="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img
              src="https://i.ibb.co/277NHWS/Cover1.jpg"
              class="d-block w-100"
              alt="..."
            />
            <div class="carousel-caption d-none d-md-block">
              <h5>First slide label</h5>
              <p>
                Some representative placeholder content for the first slide.
              </p>
            </div>
          </div>
          <div class="carousel-item">
            <img
              src="https://i.ibb.co/2cdLp79/Untitled-1.jpg"
              class="d-block w-100"
              alt="..."
            />
            <div class="carousel-caption d-none d-md-block">
              <h5>Second slide label</h5>
              <p>
                Some representative placeholder content for the second slide.
              </p>
            </div>
          </div>
          <div class="carousel-item">
            <img
              src="https://i.ibb.co/T1Qwh9K/fresh-stole.jpg"
              class="d-block w-100"
              alt="..."
            />
            <div class="carousel-caption d-none d-md-block">
              <h5>Third slide label</h5>
              <p>
                Some representative placeholder content for the third slide.
              </p>
            </div>
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>

      {/* Categories */}

      <div className="categories p-4">
        <h1 className="my-4 display-6 px-5">
          {" "}
          <b>Categories</b>{" "}
        </h1>

        <div className="category-list row gy-4 px-5">
          <div className="category col-3">
            <Link to="/store/products/vegetables">
              <img
                src={cat1}
                style={{
                  width: "300px",
                  height: "300px",
                  cursor: "pointer",
                }}
                alt=""
              />
                <h3>Digestive aids</h3>
            </Link>
          </div>

          <div className="category col-3">
            <Link to="/store/products/fruits">
              <img
                src={cat2}
                style={{
                  width: "300px",
                  height: "300px",
                  cursor: "pointer",
                }}
                alt=""
              />
                <h3>Relaxants and sedatives</h3>
            </Link>
          </div>

          <div className="category col-3">
            <Link to="/store/products/fertilizers">
              <img
                src={cat3}
                style={{
                  width: "300px",
                  height: "300px",
                  cursor: "pointer",
                }}
                alt="Relaxants and sedatives"
              />
              <h3 >Stimulants and tonics</h3>
            </Link>
          </div>

          <div className="category col-3">
            <Link to="/store/products/machinery">
              <img
                src={cat4}
                style={{
                  width: "300px",
                  height: "300px",
                  cursor: "pointer",
                }}
                alt=""
              />
                <h3 style={{marginLeft:"100px"}}>Immune system boosters</h3>
            </Link>
          </div>
        </div>
      </div>

      {/* <div className="latest-store-cover my-4">
        <img src="https://i.ibb.co/XJSwxr6/Cover1.jpg" alt="" />
      </div> */}
      <div className="latest-store-cover my-4">
        <img src={oil} alt="" />
      </div>

      <div className="latest-store-items p-4">
        <h1 className="display-6 px-5">
          <p>
            {" "}
            <b> Latest Products </b>{" "}
          </p>
        </h1>
        <div className="products-list row p-5">
          {products &&
            products.map((prod) => (
              <div className="col mt-4">
                <StoreProductSingle
                  key={prod.id}
                  img={prod.image}
                  title={prod.name}
                  price={prod.price}
                  id={prod.id}
                />
              </div>
            ))}
        </div>

        <div className="latest-store-cover my-4">
          <img src="https://i.ibb.co/Tqz0hW4/banner3sjndjs.jpg" alt="" />
        </div>
      </div>
    </div>
  );
};

export default StoreHome;
