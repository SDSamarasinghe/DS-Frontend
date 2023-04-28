import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StoreProductSingle from "./StoreProductSingle";
import oil from "./img/essential-oils.jpg"
import cat1 from "./img/herbal-treatment.png"
import cat2 from "./img/herbal.png"
import cat3 from "./img/herbal-massage.png"
import cat4 from "./img/herbal (1).png"
import bg from "./img/bulk-herbs.jpg"

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

     <div >
      <img src={bg} width="1400px" height="350px"></img>
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
