import axios from "axios";
import React, { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import StoreProductSingle from "./StoreProductSingle";
import bg1 from "./img/1111.jpg";
import bg2 from "./img/2222.jpg";
import bg3 from "./img/3333.jpg";
import ct1 from "./img/111.jpg";
import ct2 from "./img/222.jpg";
import ct4 from "./img/444.jpg";
import ct3 from "./img/sss.jpg";

const StoreHome = () => {
  const [products, setProducts] = useState([]);

  //must check endpoint
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API}/products/`).then((res) => {
      setProducts(res.data);
    });
  }, []);

  return (
    <div className="vw-100 min-vh-100" style={{ backgroundColor: "#F5F5F5" }}>
      {/* Upper Images */}

      <Carousel>
        <Carousel.Item>
          <img className="d-block w-100" src={bg1} alt="First slide" style={{height:"500px"}}/>
          <Carousel.Caption>
            <h3>Herbal Supplements</h3>
            <p>Relating to or denoting organic compounds containing a planar unsaturated ring of atoms</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={bg2} alt="Second slide" style={{height:"500px"}} />

          <Carousel.Caption>
            <h3>Herbal Skincare</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={bg3} alt="Third slide" style={{height:"500px"}} />

          <Carousel.Caption>
            <h3>Herbal Hair Care</h3>
            <p>
            producing one of the four basic taste sensations; not sour, sweet, or salt.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      {/* Categories */}

      <div className="categories p-4">
        <h1 className="my-4 display-6 px-5">
          {" "}
          <b>Categories</b>{" "}
        </h1>

        <div className="category-list row gy-4 px-5">
          <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
            <div class="hovereffect">
              <img class="img-responsive" src={ct1} alt="" />
              <div class="overlay">
                <h2>Herbal Supplements</h2>
                <a class="info" href="A link to carousal image">
                  Click here
                </a>
              </div>
            </div>
          </div>

          <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
            <div class="hovereffect">
              <img class="img-responsive" src={ct2} alt="" />
              <div class="overlay">
                <h2>Herbal Skincare</h2>
                <a class="info" href="A link to carousal image">
                Click here
                </a>
              </div>
            </div>
          </div>

          <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
            <div class="hovereffect">
              <img class="img-responsive" src={ct3} alt="" />
              <div class="overlay">
                <h2>Herbal Hair Care</h2>
                <a class="info" href="A link to carousal image">
                Click here
                </a>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
            <div class="hovereffect">
              <img class="img-responsive" src={ct4} alt="" />
              <div class="overlay">
                <h2>Herbal Beauty and Personal Care</h2>
                <a class="info" href="A link to carousal image">
                Click here
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="latest-store-cover my-4">
        <img src="https://i.ibb.co/XJSwxr6/Cover1.jpg" alt="" />
      </div> */}

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
              <div className="col mt-4" key={prod.id}>
                <StoreProductSingle
                  img={prod.image}
                  title={prod.name}
                  price={prod.price}
                  cat={prod.category}
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
