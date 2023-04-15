import React, {useRef, useEffect, useState } from "react";
import "./CreateProduct.css";
import ProductNavbar from "../ProductNavbar/ProductNavbar";
import path from "../../../../paths.json";

const CreateProduct = () => {
  let product = new FormData();
  let [categories, setCategories] = useState([]);
  let createForm = useRef();
  useEffect(() => {
    fetch(path.BASE_URL + path.FETCH_CATEGORIES)
      .then((response) => {
        return response.json(); // add return here
      })
      .then((data) => {
        if(data.success === true){
          setCategories(data.categories)
        }
      })
      .catch((err) => {
        console.log(err, "errorr");
      });
  }, []);
  function readValue(property, value) {
    product.append(property, value);
  }

  function create() {
    fetch("http://localhost:8000/product/create", {
      method: "POST",
      body: product,
    })
      .then((res) => {
        return res.json(); // add return here
      })
      .then((data) => {
        
      })
      .catch((err) => {
        console.log(err, "err in product creation");
      });
  }
  return (
    <>
      <ProductNavbar />
      <div className="mainContainer">
        <div className="title">
          <h2>Add New Product</h2>
        </div>
        <form ref={createForm} className="formContainer">
          <input
            type="text"
            className="form-control"
            placeholder="Enter Product Name"
            onChange={(e) => {
              readValue("name", e.target.value);
            }}
          />

          <input
            type="number"
            className="form-control"
            placeholder="Enter Product Price"
            onChange={(e) => {
              readValue("price", e.target.value);
            }}
          />

          <input
            type="text"
            className="form-control"
            placeholder="Enter Product Description"
            onChange={(e) => {
              readValue("description", e.target.value);
            }}
          />

          <input
            type="file"
            className="form-control"
            multiple
            onChange={(e) => {
              for (let i = 0; i < e.target.files.length; i++) {
                if(e.target.files.length<=3){
                  readValue("images" + i, e.target.files[i]);
                }else{
                  console.log("Ucan add only 3 images");
                  alert("Ucan add only 3 images");
                }
              }
            }}
          />

          <input
            type="text"
            className="form-control"
            placeholder="Enter Product Tags"
            onChange={(e) => {
              readValue("tags", e.target.value);
            }}
          />

          <select
            onChange={(e) => {
              readValue("category", e.target.value);
            }}
            className="form-control"
          >
            <option value="">Select Category</option>
            {
              categories.map((category,i)=>{
                return(
                  <option key={i} value={category._id}>{category.name}</option>
                )
              })
            }
          </select>

          {/* <label>Approved</label>
          <input
            type="checkbox"
            placeholder="Approved"
            className=" check"
            onChange={(e) => {
              readValue("approved", e.target.checked);
            }}
          /> */}
        </form>
        <button
          className="btn btn-success align-self-start mt-3"
          onClick={create}
        >
          Add Product
        </button>
      </div>
    </>
  );
};

export default CreateProduct;
