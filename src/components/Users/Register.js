import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [userName, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhone] = useState("");
  const [error, setError] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const navigate = useNavigate();

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    if (event.target.value === password) {
      setPasswordsMatch(true);
    } else {
      setPasswordsMatch(false);
    }
  };

  const onRegister = async () => {
    const user = {
      userName,
      email,
      password,
      phoneNumber,
    };

    if (
      user.userName.length <= 0 ||
      user.email.length <= 0 ||
      user.phoneNumber.length <= 0 ||
      user.password.length <= 0
    ) {
      setError("All the fields are required to create an account");
      return;
    }

    var re = /\S+@\S+\.\S+/;

    if (re.test(user.email)) {
      const { status } = await axios.post(
        "http://florage-api.pasinduprabhashitha.com/api/auth/register",
        user
      );

      if (status === 200) {
        navigate("/login");
      }
    } else {
      setError("Please enter a valid email");
    }
  };

  return (
    <div className="container min-vw-100 max-vw-100 vw-100 vh-100 min-vh-100">
      <div className="row  w-100 h-100 d-flex align-items-center justify-content-center">
        <div className="col  w-100 h-100 d-flex align-items-center justify-content-center">
          <form className="jumbotron">
            {error && (
              <h5 className="text-center text-danger form-text"> {error} </h5>
            )}

            <div className="mb-3">
              <label for="exampleInputEmail1" className="form-label">
                Full Name
              </label>
              <input
                type="email"
                className="form-control"
                style={{ width: "600px" }}
                value={userName}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>

            <div className="mb-3">
              <label for="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                style={{ width: "600px" }}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>

            <div className="mb-3">
              <label for="exampleInputEmail1" className="form-label">
                Phone Number
              </label>
              <input
                type="number"
                className="form-control"
                style={{ width: "600px" }}
                value={phoneNumber}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              />
            </div>
            <div className="mb-3">
              <label for="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                style={{ width: "600px" }}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />

              <small id="emailHelp" className="form-text">
                Your password will be encrypted automatically
              </small>
            </div>

            <div className="mb-3">
              <label for="exampleInputPassword1" className="form-label">
                Confirm Password:
              </label>
              <input
                type="password"
                className="form-control"
                style={{ width: "600px" }}
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
              <br />
              {passwordsMatch ? (
                <p>Passwords match!</p>
              ) : (
                <p>Passwords do not match.</p>
              )}
            </div>

            <button
              type="button"
              className="btn btn-primary btn-block w-100 mt-4"
              style={{ backgroundColor: "242B64" }}
              onClick={onRegister}
            >
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
