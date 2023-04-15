import React, { useRef, useState, useEffect } from "react";
import "./ViewProduct.css";
import ProductNavbar from "../ProductNavbar/ProductNavbar";
import path from "../../../../paths.json";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  FaEye,
  FaLeaf,
  FaPenAlt,
  FaRegWindowClose,
  FaRupeeSign,
  FaTrash,
} from "react-icons/fa";

const ViewProduct = () => {
  //
  let [products, setProducts] = useState([]);
  let [productModalVisible, setProductModalVisible] = useState(false);
  let [showUpdateModal, setShowUpdateModal] = useState(false);
  let [categories, setCategories] = useState([]);
  let product = useRef(); //for update , data is in this , coz i need data after re-render too
  useEffect(() => {
    fetch(path.BASE_URL + path.FETCH_CATEGORIES)
      .then((response) => {
        return response.json(); // add return here
      })
      .then((data) => {
        if (data.success === true) {
          setCategories(data.categories);
        }
      })
      .catch((err) => {
        console.log(err, "errorr");
      });
  }, []);
  //
  //
  useEffect(() => {
    fetch(path.BASE_URL + path.FETCH_PRODUCTS)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success === true) {
          setProducts(data.products);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //function to delete single product
  function deleteProduct(prod_id, prod_index) {
    fetch(path.BASE_URL + path.DELETE_PRODUCT + prod_id, {
      method: "DELETE",
    })
      .then((response) => {
        // console.log(response.json());
        return response.json();
      })
      .then((response) => {
        if (response.success === true) {
          let tempProducts = [...products]; // copy of products, reference type - not going to impact on main array
          tempProducts.splice(prod_index, 1); // to delete single dish
          setProducts(tempProducts); // and refresh the products
        }
      })
      .catch((err) => {
        console.log(err, "ERROR IN DELETE at viewproduct.jsx");
      });
  }

  //function to toggle view product modal
  function toggleModal(pro) {
    setProductModalVisible(true);
    product.current = pro;
  }

  function toggleUpdate(pro) {
    setShowUpdateModal(true);
    product.current = pro;
  }

  function readValue(property, value) {
    product.current[property] = value;
    console.log(product.current);
  }

  //function to update data

  function updateProduct() {
    fetch(path.BASE_URL + path.UPDATE_PRODUCT + product.current._id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product.current),
    })
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        //  if(response.success===true){
        //   let category=categories.find((cat,i)=>{
        //     return cat._id=== product.current.category;
        //   })
        //   product.current.category = category
        //   setShowUpdateModal(false);
        //  }
        if(typeof product.current.category !== "object"){
          product.current.category = categories.find((cat,i)=>{
                return cat._id=== product.current.category;
              })
        }
        if (response.success === true) {
          setShowUpdateModal(false);
        }
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      {productModalVisible === true ? (
        <div
          className="viewModal"
          onClick={() => {
            setProductModalVisible(false); // this will hide that modal if we click outside its children
          }}
        >
          <div
            className="viewModalChild"
            onClick={(e) => {
              e.stopPropagation(); //parent events not applying here , to stop modal toggle when click on this white child
            }}
          >
            <div className="viewProductTitle">
              <div className="dishTile">
                <h1>{product.current.name} </h1>
                <FaLeaf className="m-3 text-success" />
                <p className="mt-3">100% Pure Veg</p>
              </div>
              <FaRegWindowClose
                className="xx"
                onClick={() => {
                  setProductModalVisible(false);
                }}
              />
            </div>
            <div className="modelContentContainer d-flex justify-content-between align-items-start">
              <div className="dishImage ModelLeft">
                {product.current.images.map((ele, index) => {
                  return <img src={ele} className="modalImage" key={index} />;
                })}
              </div>

              <div className="modalRight ">
                <div className="dishPrice d-flex justify-content-start align-items-center g-2">
                  <h3>Price :-</h3>
                  <p className="ms-3 price">
                    {product.current.price}
                    <FaRupeeSign />{" "}
                  </p>
                </div>
                {/* / */}
                <div className="dishDescription">
                  <h3>Description :-</h3>
                  <p>{product.current.description}</p>
                </div>

                <div className="modalCategory d-flex gap-2 align-items-center ">
                  <h3>Category :-</h3>
                  <p className="mt-2">{product.current.category.name}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {/* view model end */}
      {/* update model  */}
      {showUpdateModal === true ? (
        <div
          className="updateModal"
          onClick={() => {
            setShowUpdateModal(false);
          }}
        >
          <div
            className="updateModalChild"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {/* updateform */}
            <div className="mainContainer">
              <div className="title">
                <h2>Update Product</h2>
              </div>
              <div className="formContainer">
                <input
                  type="text"
                  defaultValue={product.current.name}
                  className="form-control"
                  placeholder="Enter Product Name"
                  onChange={(e) => {
                    readValue("name", e.target.value);
                  }}
                />

                <input
                  type="number"
                  defaultValue={product.current.price}
                  className="form-control"
                  placeholder="Enter Product Price"
                  onChange={(e) => {
                    readValue("price", e.target.value);
                  }}
                />

                <input
                  type="text"
                  defaultValue={product.current.description}
                  className="form-control"
                  placeholder="Enter Product Description"
                  onChange={(e) => {
                    readValue("description", e.target.value);
                  }}
                />

                {/* <input
                  type="file"
                  
                  className="form-control"
                  multiple
                  onChange={(e) => {
                    for (let i = 0; i < e.target.files.length; i++) {
                      if (e.target.files.length <= 3) {
                        readValue("images" + i, e.target.files[i]);
                      } else {
                        console.log("Ucan add only 3 images");
                        alert("Ucan add only 3 images");
                      }
                    }
                  }}
                /> */}

                <input
                  type="text"
                  defaultValue={product.current.tags?.toString()}
                  className="form-control"
                  placeholder="Enter Product Tags"
                  onChange={(e) => {
                    readValue("tags", e.target.value);
                  }}
                />
                {/* <input
                  type="text"
                  defaultValue={product.current.discount}
                  className="form-control"
                  placeholder="Enter Product Discount %"
                  onChange={(e) => {
                    readValue("discount", e.target.value);
                  }}
                /> */}

                <select
                  onChange={(e) => {
                    readValue("category", e.target.value);
                  }}
                  className="form-control"
                >
                  <option value="" defaultValue={product.current.category?._id}>
                    Select Category
                  </option>
                  {categories.map((category, i) => {
                    return (
                      <option key={i} value={category._id}>
                        {category.name}
                      </option>
                    );
                  })}
                </select>

                {/* <label>Approved</label>
                <input
                  type="checkbox"
                  checked={product.current.approved}
                  placeholder="Approved"
                  className=" check"
                  onChange={(e) => {
                    readValue("approved", e.target.checked);
                  }}
                /> */}
              </div>
              <button
                className="btn btn-success align-self-start mt-3"
                onClick={() => {
                  updateProduct();
                }}
              >
                Update Product
              </button>
            </div>
            {/* updateformEnd */}
          </div>
        </div>
      ) : null}

      {/* update model end */}
      <ProductNavbar />
      <div className="mainContainer">
        <div className="title">
          <h2>View Product</h2>
        </div>
        <table className="table table-bordered text-center table-striped table-hover">
          <thead>
            <tr>
              <th className="th">#</th>
              <th className="th">Name</th>
              <th className="th">Price</th>
              <th className="th">Category</th>
              <th className="th">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category.name}</td>
                  <td className="actions">
                    <FaEye
                      className="text-primary view"
                      onClick={() => {
                        toggleModal(product); // passing product object
                      }}
                    />
                    <FaPenAlt
                      className="text-success mx-3 edit"
                      onClick={() => {
                        toggleUpdate(product);
                      }}
                    />
                    <FaTrash
                      className="text-danger delete"
                      onClick={() => {
                        confirm("Do you really want to delete this product ?");

                        deleteProduct(product._id, index);
                      }}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ViewProduct;
