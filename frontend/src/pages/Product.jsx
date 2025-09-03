import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import Breadcrum from "../components/breadcrums/Breadcrum";
import DescriptionBox from "../components/descriptionBox/DescriptionBox";
import ProductDisplay from "../components/productDisplay/ProductDisplay";
import RelatedProducts from "../components/relatedProducts/RelatedProducts";
import { ShopContext } from '../context/ShopContext';

export const Product = () => {
  const {all_product} = useContext(ShopContext);
  const {productId} = useParams();
  const product = all_product.find((e) => e.id === Number(productId));
  
  const updateVisits = async () => {
    await fetch('http://localhost:4000/updatevisits', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: product.id,
      }),
    }).then((resp) => resp.json()).then((data) => {
      if (data.success) {
        console.log('Product Visits Updated');
      } else {
        console.log('Error Occurred');
      }
    });
  }

  useEffect(() => {
    if (product) {
      updateVisits();
    }
  });
  

  return (
    <div className="product">
      <Breadcrum product={product} />
      <ProductDisplay product={product} />
      <DescriptionBox product={product}/>
      <RelatedProducts product={product}/>
    </div>
  )
}

export default Product;