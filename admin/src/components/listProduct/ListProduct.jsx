import { useEffect, useState } from 'react';

import cross_icon from '../../assets/cross_icon.png';

import './ListProduct.css';

const ListProduct = () => {

  const [allProduct, setAllProduct] = useState([]);

  const fetchInfo = async () => {
    await fetch("http://localhost:4000/allproducts")
      .then((resp) => resp.json())
      .then((data) => {setAllProduct(data)});
  }

  const removeProduct = async (id) => {
    await fetch("http://localhost:4000/removeproduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    })
      .then((resp) => resp.json())
      .then((data)=>{data.success?alert("Product Removed Successfully"):alert("Error Occured");});
      await fetchInfo();
  }

  useEffect(()=> {
    fetchInfo();
  },[])

  return (
    <div className="list-product">
        <h1>All Products List</h1>
        <div className="listproduct-format-main">
          <p>Products</p>
          <p>Title</p>
          <p>Old Price</p>
          <p>New Price</p>
          <p>Category</p>
          <p>Remove</p>
        </div>
        <div className="listproduct-allproduct">
          <hr />
          {allProduct.map((product,index)=>{
            return <><div key={index} className="listproduct-format-main listproduct-format">
              <img src={product.image} alt="" className="listproduct-product-icon" />
              <p>{product.name}</p>
              <p>P{product.old_price}</p>
              <p>P{product.new_price}</p>
              <p>{product.category}</p>
              <img onClick={()=>{removeProduct(product.id)}} src={cross_icon} alt="" className="listproduct-remove-icon" />
            </div>
            <hr />
            </>
          })}
        </div>
    </div>
  )
}

export default ListProduct