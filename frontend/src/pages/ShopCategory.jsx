import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import './css/ShopCategory.css';

import Item from '../components/item/Item';

import { useState } from 'react';

const ShopCategory = (props) => {
  const {all_product} = useContext(ShopContext);
  const number_of_product_per_page = 8;

  const productCategory = all_product.filter(item => item.category === props.category);
  let number_of_page = Math.ceil(productCategory.length / number_of_product_per_page);

  const [currentPage, setCurrentPage] = useState(1);

  const handleChangePage = (page) => {
    setCurrentPage(page);
  }


  
  

  return (
    <div className="shop-category">
      <img className="shopcategory-banner" src={props.banner} alt="banner" />
      {/* <div className="shopcategory-indexSort">
        <p>
          <span>Page : {currentPage}</span> / {number_of_page}
        </p>
      </div> */}
      <div className="shopcategory-product">
        {productCategory.slice((currentPage - 1) * number_of_product_per_page, currentPage * number_of_product_per_page).map((item, i) => {
          if (props.category===item.category) {
            return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
          } else {
            return null;
          }
        })}
      </div>
      <div className="shopcategory-pagination">
        <div className="shopcategory-pagination-back">
          {currentPage > 1 ? 
          <button onClick={() => handleChangePage(currentPage > 1 ? currentPage - 1 : 1)}>{'<'}</button> : null
          }
          
        </div>
        <p>
          <span>Page : {currentPage}</span> / {number_of_page}
        </p>
        <div className="shopcategory-pagination-forward">
          {currentPage < number_of_page ? 
            <button onClick={() => handleChangePage(currentPage < number_of_page ? currentPage + 1 : number_of_page)}>{'>'}</button>
            : null
          }
        </div>
      </div>
      {/* <div className="shopcategory-loadmore">
        Explore more
      </div> */}
    </div>
  )
}

export default ShopCategory;