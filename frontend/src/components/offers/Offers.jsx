import './Offers.css';

import exclusive_image from '../assets/exclusive_image.png';

export const Offers = () => {
  return (
    <div className="offers">
        <div className="offers-left">
            <h1>Exclusive</h1>
            <h1>Offers For You</h1>
            <p>ONLY THE BEST SELLERS PRODUCTS</p>
            <button>Check Now!</button>
        </div>
        <div className="offers-right">
            <img src={exclusive_image} alt="exclusive" />   
        </div>
    </div>
  )
}

export default Offers;