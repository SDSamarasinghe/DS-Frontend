import React from "react";
import "./navigator.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { adminSub, userSub } from "../../services/user";
import { deleteFromStorage } from "@rehooks/local-storage";

const Navigator = () => {
  const [user, setUser] = React.useState(false);
  const [admin, setAdmin] = React.useState(false); // [1
  const navigate = useNavigate();

  useEffect(() => {
    userSub.asObservable().subscribe((user) => {
      if (user) {
        setUser(true);
      } else {
        setUser(false);
      }
    });

    adminSub.asObservable().subscribe((admin) => {
      if (admin) {
        setAdmin(true);
      } else {
        setAdmin(false);
      }
    });
  }, []);

  return (
    <div>
      <div className="site-mobile-menu">
        <div className="site-mobile-menu-header">
          <div className="site-mobile-menu-close mt-3">
            <span className="icon-close2 js-menu-toggle"></span>
          </div>
        </div>
        <div className="site-mobile-menu-body"></div>
      </div>

      <header className="site-navbar" role="banner">
        <div style={{ backgroundColor: "#4E5180" }} className="px-3">
          <div className="align-items-center justify-content-between d-flex">
            <div className="">
              <h1 className="mb-0 site-logo text-white">Florage</h1>
            </div>
            <div className="d-none d-xl-block  ">
              <nav
                className="site-navigation position-relative text-right"
                role="navigation"
              >
                <ul className="site-menu js-clone-nav mr-auto d-none d-lg-block">
                  <li>
                    <Link to="/">
                      <span>Home</span>
                    </Link>
                  </li>
                 {user && (
                  <li>
                    <Link to="/store/store-shopping-cart">
                      <span>Cart</span>
                    </Link>
                  </li>
                 ) }
                  {admin && (
                    <li className="has-children">
                      <a href="/about.html">
                        <span>
                          Admin <i class="fa-solid fa-caret-down mx-2"></i>
                        </span>{" "}
                      </a>
                      <ul className="dropdown arrow-top">
                        <li>
                          <Link to="/store/store-admin-products">Products</Link>
                        </li>
                        <li>
                          <Link to="/store/store-admin-orders">Orders</Link>
                        </li>
                        <li>
                          <Link to="/">Payments</Link>
                        </li>
                        <li>
                          <Link to="/store/commisions">Order Commisions</Link>
                        </li>
                      </ul>
                    </li>
                  )}
                  <li>
                    {!user && (
                      <Link to="/login">
                        <span>Login</span>
                      </Link>
                    )}
                  </li>
                  <li>
                    {user && (
                      <>
                        <span
                          style={{ cursor: "pointer" }}
                          className="text-white"
                          onClick={() => {
                            deleteFromStorage("florage-user");
                            userSub.next(null);
                            adminSub.next(false);
                            deleteFromStorage("florage-admin");
                            navigate("/");
                          }}
                        >
                          Logout
                        </span>

                        <Link to="/profile">
                          <span>Profile</span>
                        </Link>
                      </>
                    )}
                  </li>
                  <li>
                    <a href="about.html">
                      <span>About</span>
                    </a>
                  </li>
                  <li>
                    <a href="blog.html">
                      <span>Blog</span>
                    </a>
                  </li>
                  <li>
                    <a href="contact.html">
                      <span>Contact</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>

            <div
              className="d-inline-block d-xl-none ml-md-0 mr-auto py-3"
              style={{ position: "relative", top: "3px" }}
            >
              <a
                href="/"
                className="site-menu-toggle js-menu-toggle text-white"
              >
                <span className="icon-menu h3"></span>
              </a>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navigator;
