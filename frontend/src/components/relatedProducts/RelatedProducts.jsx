import Item from '../item/Item';
import './RelatedProducts.css';

import { useContext } from 'react';
import { ShopContext } from '../../context/ShopContext';

const RelatedProducts = (props) => {
  const {product} = props;
  const {all_product} = useContext(ShopContext);
  const related_product = all_product.filter((item) => item.category === product.category);
  return (
    <div className="relatedproducts">
        <h1>Related Products</h1>
        <hr />
        <div className="relatedproducts-item">
            {related_product.slice(-5).map((item, i) => {
                return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
            })}
        </div>
    </div>
  )
}

export default RelatedProducts