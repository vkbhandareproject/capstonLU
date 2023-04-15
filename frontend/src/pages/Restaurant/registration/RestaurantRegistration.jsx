import React, { useRef, useState } from "react";
import path from "../../../paths.json";

const RestaurantRegistration = () => {
  //
  let [message, setMessage] = useState(null);

  let restaurant = useRef({});

  function readValue(property, value) {
    restaurant.current[property] = value;
    // console.log(property);
  }
  ////////////////////////////////////
  function register() {
    fetch(path.BASE_URL + path.RESTAURANT_REGISTRATION, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(restaurant.current),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success === true) {
          setMessage({
            msg: "Registration Successfull",
            msgclass: "success_msg",
          });
        } else {
          setMessage({ msg: data.message, msgclass: "errmsg" });
        }
        setTimeout(() => {
          setMessage(null);
        }, 3000);
      })
      .catch((err) => console.log(err, "errrr in admin fetch"));
  }
  return (
    <div className="admin_container">
      <div className="admin_login">
        <h2>Restaurant Registration</h2>
        <input
          type="text"
          placeholder="Enter Your Name"
          className="form-control"
          onChange={(e) => {
            readValue("name", e.target.value);
          }}
        />
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
        <input
          type="text"
          placeholder="Enter Your Restaurant Name"
          className="form-control"
          onChange={(e) => {
            readValue("restaurantname", e.target.value);
          }}
        />
          <input
          type="text"
          placeholder="Enter Your Restaurant Address"
          className="form-control"
          onChange={(e) => {
            readValue("restaurantaddress", e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Enter Your Restaurant Pincode"
          className="form-control"
          onChange={(e) => {
            readValue("pincode", e.target.value);
          }}
        />

        <input
          type="text"
          placeholder="Enter Your Contact Details"
          className="form-control"
          onChange={(e) => {
            readValue("contact", e.target.value);
          }}
        />

        <div className="button_continer">
          <button className="btn btn_login" onClick={register}>
            {" "}
            {/*calling register function */}
            Register
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

export default RestaurantRegistration;
