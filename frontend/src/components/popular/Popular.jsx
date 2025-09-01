// import data_product from '../assets/data';
import Item from '../item/Item';
import './Popular.css';

import { useContext } from 'react';
import { ShopContext } from '../../context/ShopContext';

export const Popular = () => {
  
  const {all_product} = useContext(ShopContext);
  const data_product_women = all_product
    .filter((item) => item.category?.toLowerCase() === "women")
    .slice(0, 4);

  const data_product_men = all_product
    .filter((item) => item.category?.toLowerCase() === "men")
    .slice(0, 4);

  const data_product_kids = all_product
    .filter((item) => item.category?.toLowerCase() === "kids")
    .slice(0, 4);

  return (
    <div className="popular">
        <h1>POPULAR IN MEN</h1>
        <hr />
        <div className="popular-item">
             {data_product_men.map((item, i)=>{
                return <Item key={i} category={item.category} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />             
                })}
        </div>

        <h1>POPULAR IN WOMEN</h1>
        <hr />
        <div className="popular-item">
             {data_product_women.map((item, i)=>{
                return <Item key={i} category={item.category} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />             
                })}
        </div>
        
        <h1>POPULAR IN KIDS</h1>
        <hr />
        <div className="popular-item">
             {data_product_kids.map((item, i)=>{
                return <Item key={i} category={item.category} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />             
                })}
        </div>
    </div>
  )
}

export default Popular