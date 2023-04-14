import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div style={{ backgroundColor: "#4E5180" }}>
      <footer className="page-footer font-small  teal py-4 text-white">
        <div className="container-fluid text-center text-md-left">
          <div className="row d-flex py-4 justify-content-around">
            <div className="col-md-3 mt-md-0 mt-3">
              <h5 className="text-uppercase font-weight-bold">Navigation</h5>
              Home
              <br />
              Services
              <br />
              Event & Contact Support
              <br />
              Contact
              <br />
              Help
              <br />
            </div>

            <div className="col-md-3 mt-md-0 mt-3">
              <h5 className="text-uppercase font-weight-bold">Navigation</h5>
              Home
              <br />
              Services
              <br />
              Event & Contact Support
              <br />
              Contact
              <br />
              Help
              <br />
            </div>

            <div className="col-md-5 mb-md-0 mb-3 text-start">
              <h5 className="text-uppercase font-weight-bold">About</h5>
              <small>
              Save Sea is a project aimed at addressing the problem of plastic waste in our oceans. 
              It is a web-based platform that provides a user-friendly interface for people to report plastic pollution sightings, 
              which are then plotted on a map for everyone to see. 
              By raising awareness of plastic pollution and encouraging individuals to take action, 
              Save Sea hopes to reduce the amount of plastic waste in our oceans and protect marine life.
              </small>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
