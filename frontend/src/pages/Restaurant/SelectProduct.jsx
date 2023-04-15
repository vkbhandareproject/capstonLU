import React from 'react'

const SelectProduct = () => {
  return (
    <>
        <ProductNavbar />
      <div className="mainContainer">
        <div className="title">
          <h2>Select Product For Sell</h2>
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

          <label>Approved</label>
          <input
            type="checkbox"
            placeholder="Approved"
            className=" check"
            onChange={(e) => {
              readValue("approved", e.target.checked);
            }}
          />
        </form>
        <button
          className="btn btn-success align-self-start mt-3"
          onClick={create}
        >
          Add Product
        </button>
      </div>
    </>
  )
}

export default SelectProduct