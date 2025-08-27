import arrow_icon from '../assets/breadcrum_arrow.png';
import './Breadcrum.css';

const Breadcrum = (props) => {
    const {product} = props;
  return (
    <div className="breadcrum">
        HOME <img src={arrow_icon} alt="arrow" /> SHOP <img src={arrow_icon} alt="arrow" /> {product.category} <img src={arrow_icon} alt="" /> {product.name}
    </div>
  )
}

export default Breadcrum