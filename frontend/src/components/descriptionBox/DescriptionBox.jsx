import { useState } from 'react';
import ReviewBox from '../reviewBox/ReviewBox';
import ReviewComment from '../reviewComment/ReviewComment';
import './DescriptionBox.css';

const DescriptionBox = ({ product }) => {

  const [reviewDesc, setReviewDesc] = useState(true);

  return (
    <div className="descriptionbox">
      <div className="desciptionbox-navigator">
        <div className={`descriptionbox-nav-box ${reviewDesc ? "" : "fade"}`} onClick={() => setReviewDesc(true)}>Description</div>
        <div className={`descriptionbox-nav-box ${reviewDesc ? "fade" : ""}`} onClick={() => setReviewDesc(false)}>Reviews</div>
      </div>
      {reviewDesc ? 
      <div className="descriptionbox-description">
        <h1>Product Description</h1>
        <p>{product.description}</p>
      </div>
      :     

      <div className="descriptionbox-reviews">
        <h1>Customer Reviews</h1>
        {product.reviews.length === 0 ? (
          <div>
            <p>No Reviews Yet</p>
            <br />
            <hr />
          </div>
        ) : (
          product.reviews.map((e, index) => (
            <ReviewBox key={index} image={e.image} username={e.user.username} rating={e.rating} comment={e.comment} />
          ))
        )}
        <hr />
        <ReviewComment />
      </div>
      }
    </div>
  );
};

export default DescriptionBox;
