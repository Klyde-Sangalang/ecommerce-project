import Item from '../item/Item';
import './NewCollections.css';

import { useContext } from 'react';
import { ShopContext } from '../../context/ShopContext';

const NewCollections = () => {
  const {all_product} = useContext(ShopContext);
  const new_collection = all_product.slice(-12).reverse();
  return (
    <div className="new-collections">
        <h1>NEW COLLECTIONS</h1>
        <hr />
        <div className="collections">
            {new_collection.map((item, i) => {
                return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
            })}
        </div>
    </div>
  )
}

export default NewCollections