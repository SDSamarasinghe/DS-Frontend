import React from "react";
import "./navigator.css";
import { Link } from "react-router-dom";

const Navigator = () => {
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
              <h1 className="mb-0 site-logo text-white">Save Sea</h1>
            </div>
            <div className="d-none d-xl-block  ">
              <nav
                className="site-navigation position-relative text-right"
                role="navigation"
              >
                <ul className="site-menu js-clone-nav mr-auto d-none d-lg-block">
                  <li>
                    <Link to="/store">
                      <span>Home</span>
                    </Link>
                  </li>
                  <li className="has-children">
                    <a href="about.html">
                      <span>
                        All Services <i class="fa-solid fa-caret-down mx-2"></i>
                      </span>{" "}
                    </a>
                    <ul className="dropdown arrow-top">
                      <li>
                        <Link to="/">
                          <a>1</a>
                        </Link>
                      </li>
                      <li>
                        <Link to="/">
                          <a>2</a>
                        </Link>
                      </li>
                      <li>
                        <Link to="/">
                          <a>3</a>
                        </Link>
                      </li>
                      <li>
                        <Link to="/">
                          <a>4</a>
                        </Link>
                      </li>
                      <li>
                        <Link to="/">
                          <a>5</a>
                        </Link>
                      </li>
                      <li>
                        <Link to="/">
                          <a>6</a>
                        </Link>
                      </li>
                      <li>
                        <Link to="/">
                          <a>7</a>
                        </Link>
                      </li>
                      <li>
                        <Link to="/">
                          <a>8</a>
                        </Link>
                      </li>
                      <li className="has-children">
                        <Link to="/">Services</Link>
                        
                        <ul className="dropdown">
                          <li>
                            <Link to="/">
                              <a> Admin1</a>
                            </Link>
                          </li>
                          <li>
                            <Link to="/">
                              <a>  Admin2</a>
                            </Link>
                          </li>
                          <li>
                            <Link to="/">
                              <a>  Admin3</a>
                            </Link>
                          </li>
                          <li>
                            <Link to="/">
                              <a> Admin4</a>
                            </Link>
                          </li>
                          <li>
                            <Link to="/">
                              <a> Admin5</a>
                            </Link>
                          </li>
                          <li>
                            <Link to="/">
                              <a>  Admin6</a>
                            </Link>
                          </li>
                          <li>
                            <Link to="/">
                              <a>  Admin7</a>
                            </Link>
                          </li>
                          <li>
                            <Link to="/">
                              <a> Admin8</a>
                            </Link>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link to="/login">
                      <span>Login</span>
                    </Link>
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
                href="#"
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
