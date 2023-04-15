import React, { useRef, useState } from "react";
import path from "../../../paths.json";
import { useNavigate } from "react-router-dom";
const RestaurantLogin = () => {
  //
  let [message, setMessage] = useState(null);
  let navigate = useNavigate();
  let restaurantCred = useRef({});

  function readValue(property, value) {
    restaurantCred.current[property] = value;
    // console.log(property);
  }
  ////////////////////////////////////
  function login() {
    fetch(path.BASE_URL + path.RESTAURANT_LOGIN, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(restaurantCred.current),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success === true) {
          setMessage(null);
          // navigate to restaurant dashboard
          navigate("../restaurantdashboard");
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
        <h2>Restaurant Login</h2>

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
          <button className="btn btn_signup">Signin</button>
        </div>
        {message != null ? (
          <div className={`message ${message.msgclass}`}>{message.msg}</div>
        ) : null}
      </div>
    </div>
  );
};

export default RestaurantLogin;
