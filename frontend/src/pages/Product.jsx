import { useContext } from "react";
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

  return (
    <div className="product">
      <Breadcrum product={product} />
      <ProductDisplay product={product} />
      <DescriptionBox product={product}/>
      <RelatedProducts />
    </div>
  )
}

export default Product;