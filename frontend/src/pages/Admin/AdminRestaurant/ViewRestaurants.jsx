import React,{useEffect, useState} from "react";
// import { FaEye, FaCheckCircle, FaBan } from "react-icons/fa";
import path from "../../../paths.json";


const ViewRestaurants = () => {

  let [restaurants,setRestaurants]= useState([]);

// endpoint to get all restaurant
  useEffect(()=>{
    fetch(path.BASE_URL+path.FETCH_RESTAURANT)
    .then((res)=>{
        return res.json();
    })
    .then((response)=>{
        
        if(response.success===true){
            console.log("success rest");
            setRestaurants(response.restaurant); //restaurant is  from backend restaurant.js line no 174
        }

    })
    .catch((err)=>{
        console.log(err);
    })
  },[])
  //

 
  return (
    <>
      <div className="mainContainer">
        <div className="title">
          <h2>View All Restaurants</h2>
        </div>
        <table className="table table-bordered text-center table-striped table-hover">
          <thead>
            <tr>
              <th className="th">#</th>
              <th className="th">Restaurant Name</th>
              <th className="th">Email</th>
              <th className="th">Contact</th>
              <th className="th">Address</th>
              <th className="th">Pincode</th>
              {/* <th className="th">Actions</th> */}
            </tr>
          </thead>
          <tbody>
            {restaurants.map((restaurant, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{restaurant.restaurantname}</td>
                  <td>{restaurant.email}</td>
                  <td>{restaurant.contact}</td>
                  <td>{restaurant.restaurantaddress}</td>
                  <td>{restaurant.pincode}</td>
                  {/* <td className="actions">
                    <FaEye
                      className="text-primary view"
                      onClick={() => {
                        toggleModal(product); // passing product object
                      }}
                    />
                    <FaCheckCircle
                      className="mx-3 edit show"
                      onClick={() => {
                        toggleUpdate(product);
                      }}
                    />
                     <FaBan
                      className="edit ban"
                      onClick={() => {
                        toggleUpdate(product);
                      }}
                    />
                  </td> */}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ViewRestaurants;
