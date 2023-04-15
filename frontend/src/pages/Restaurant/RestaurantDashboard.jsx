import React from 'react'
import "./RestaurantDashboard.css";
import { Link, Outlet } from "react-router-dom";

const RestaurantDashboard = () => {
  return (
    <div className="adminDashboadContainer">
      <div className="adminDashboardHeader">
        <div className="adminLogo">
          <h2 className="logo-title">Restaurant Dashboard</h2>
        </div>
      </div>
      <div className="adminContentContainer">
        <div className="adminSidebar">
          <div className="adminMenuContainer">
            <Link to={"/restaurantdashboard/createproduct"}>
              <div className="adminMenuItem text-dark">Add Dish</div>
            </Link>
            <Link to={"/admindashboard/viewrestaurant"}>
              <div className="adminMenuItem">Select Dish</div>
            </Link>
            <Link to={"/admindashboard/viewrestaurant"}>
              <div className="adminMenuItem">Orders</div>
            </Link>
          </div>
        </div>
        <div className="adminMainContentContainer">
          <Outlet />
          {/* <CreateProduct/> */}
        </div>
      </div>
    </div>
  )
}

export default RestaurantDashboard