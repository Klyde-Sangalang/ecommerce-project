import './DescriptionBox.css';

const DescriptionBox = (props) => {
  const {product} = props;

  return (
    <div className="descriptionbox">
        <div className="desciptionbox-navigator">
            <div className="descriptionbox-nav-box">Description</div>
            <div className="descriptionbox-nav-box fade">Reviews (122)</div>
        </div>
        <div className="descriptionbox-description">
            <h1>Product Description</h1>
            <p>{product.description}</p>
        </div>
    </div>
  )
}

export default DescriptionBox