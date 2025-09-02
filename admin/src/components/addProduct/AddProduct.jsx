import { useState } from 'react';
import upload_icon from '../../assets/upload_area.svg';
import './AddProduct.css';

const AddProduct = () => {
  const [image, setImage] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    old_price: "0",
    new_price: "",
    category: "men",
    description: "",
    category_desc: "",
    tags: "",
    stock: 0,
    reviews: [],
    size: [],
    visits: 0,
  });

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const Add_Product = async () => {
    console.log(productDetails);
    let responseData;
    let product = productDetails;

    let formData = new FormData();
    formData.append("product", image);

    await fetch("http://localhost:4000/uploads", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    }).then((resp) =>
      resp.json().then((data) => {
        responseData = data;
      })
    );

    if (responseData.success) {
      product.image = responseData.image_url;
      console.log(product);
      await fetch("http://localhost:4000/addproduct", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      })
        .then((resp) => resp.json())
        .then((data) => {
          if (data.success) {
            alert("Product Added Successfully");
            setProductDetails({
              name: "",
              image: "",
              old_price: "0",
              new_price: "",
              category: "men",
              description: "",
              category_desc: "",
              tags: "",
              stock: 0,
              reviews: [],
              size: [],
              visits: 0,
            });
            setImage(false);
          } else {
            alert("Error Occurred");
          }
        });
    }
  };

  const sizeOption = [
    { value: "XS", label: "XS" },
    { value: "S", label: "S" },
    { value: "M", label: "M" },
    { value: "L", label: "L" },
    { value: "XL", label: "XL" },
    { value: "XXL", label: "XXL" },
  ];

  return (
    <div className="addproduct">
      <div className="addproduct-itemfield">
        <p>Product Title</p>
        <input
          value={productDetails.name}
          onChange={changeHandler}
          type="text"
          name="name"
          placeholder="Type Here"
        />
      </div>

      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input
            value={productDetails.new_price}
            onChange={changeHandler}
            type="text"
            name="new_price"
            placeholder="Type Here"
          />
        </div>
        <div className="addproduct-itemfield">
          <p>Old Price (optional)</p>
          <input
            value={productDetails.old_price}
            onChange={changeHandler}
            type="text"
            name="old_price"
            placeholder="Type Here"
          />
        </div>
      </div>
      
      <div className="addproduct-sizes-category">
        <div className="addproduct-itemfield">
          <div>
            <p>Product Category</p>
            <select
              value={productDetails.category}
              onChange={changeHandler}
              name="category"
              className="add-product-selector"
            >
              <option value="men">Men</option>
              <option value="women">Women</option>
              <option value="kids">Kids</option>
            </select>
          </div>
        </div>
      
        <div className="addproduct-itemfield">
            <p>Product Sizes</p>
            <div className="addproduct-sizes">
              {sizeOption.map((option) => (
                <label key={option.value} className="checkbox-label">
                  <input
                    type="checkbox"
                    value={option.value}
                    checked={productDetails.size.includes(option.value)}
                    onChange={(e) => {
                      let newSizes = [...productDetails.size];
                      if (e.target.checked) {
                        newSizes.push(option.value);
                      } else {
                        newSizes = newSizes.filter((s) => s !== option.value);
                      }
                      setProductDetails({ ...productDetails, size: newSizes });
                    }}
                  />
                  <span className="checkbox-custom"></span>
                  {option.label}
                </label>
              ))}
            </div>
          </div>
        </div>

      <div className="addproduct-imagestock">
        <div className="addproduct-itemfield">
          <label htmlFor="file-input">
            <img
              src={image ? URL.createObjectURL(image) : upload_icon}
              alt=""
              className="upload-icon"
            />
          </label>
          <input
            onChange={imageHandler}
            type="file"
            id="file-input"
            name="image"
            hidden
          />
        </div>
        <div className="addproduct-itemfield">
          <p>Stock</p>
          <input
            value={productDetails.stock}
            onChange={changeHandler}
            type="text"
            name="stock"
            placeholder="Type Here"
          />
        </div>
        
      </div>

      <div className="addproduct-itemfield">
        <p>Product Description (optional)</p>
        <textarea
          value={productDetails.description}
          onChange={changeHandler}
          name="description"
          placeholder="Type Here"
        />
      </div>

      <div className="addproduct-tags">
        <div className="addproduct-itemfield">
          <p>Product Category Description (optional)</p>
          <input
            value={productDetails.category_desc}
            onChange={changeHandler}
            type="text"
            name="category_desc"
            placeholder="Type Here"
          />
        </div>
        <div className="addproduct-itemfield">
          <p>Product Tags (optional)</p>
          <input
            value={productDetails.tags}
            onChange={changeHandler}
            type="text"
            name="tags"
            placeholder="Type Here"
          />
        </div>
      </div>

      
      <button onClick={() => Add_Product()} className="addproduct-btn">
        ADD
      </button>
    </div>
  );
};

export default AddProduct;
