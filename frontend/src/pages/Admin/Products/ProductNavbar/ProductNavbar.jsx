import React from "react";
import "./ProductNavbar.css";
import { Link } from "react-router-dom";

const ProductNavbar = () => {
  return (
    <div className="optionsNavbar">
      <ul className="nav">
        <Link to={"/admindashboard/createproduct"}>
          <li className="nav-link create-btn">Add New Product</li>
        </Link>
        <Link to={"/admindashboard/viewproduct"}>
          <li className="nav-link view-btn">View Product</li>
        </Link>
      </ul>
    </div>
  );
};

export default ProductNavbar;
