import React, { useState } from "react";
import path from "../../paths.json";
import "./AdminLogin.css";
import { useNavigate } from "react-router-dom";
const AdminLogin = () => {
  let [message, setMessage] = useState(null);
  let navigate = useNavigate();

  let adminCredentials = {};

  function readValue(property, value) {
    adminCredentials[property] = value;
    // console.log(property);
  }
  ////////////////////////////////////
  function login() {
    fetch(path.BASE_URL + path.ADMIN_LOGIN, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(adminCredentials),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success === true) {
          navigate("/admindashboard");
        } else {
          setMessage({ msg: data.message, msgclass: "errmsg" });
          setTimeout(() => {
            setMessage(null);
          }, 3000);
        }
      })
      .catch((err) => console.log(err, "errrr in admin fetch"));
  }
  return (
    <div className="admin_container">
      <div className="admin_login">
        <h2>Admin Login</h2>
        <input
          type="text"
          placeholder="Enter Your Email"
          className="form-control"
          onChange={(e) => {
            readValue("email", e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Enter Your Password"
          className="form-control"
          onChange={(e) => {
            readValue("password", e.target.value);
          }}
        />
        <div className="button_continer">
          <button className="btn btn_login" onClick={login}>
            Login
          </button>
          <button className="btn btn_signup">Signup</button>
        </div>
        {message != null ? (
          <div className={`message ${message.msgclass}`}>
              {message.msg}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default AdminLogin;
