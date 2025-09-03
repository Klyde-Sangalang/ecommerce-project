
import star_dull_icon from '../assets/star_dull_icon.png';
import star_icon from '../assets/star_icon.png';
import user_icon from '../assets/user.png';
import './ReviewBox.css';

const ReviewBox = (props) => {
  return (
    <div className="reviewbox">
            

            <div className="reviewbox-main-container">
                <div className="reviewbox-main-left">
                    <img src={props.image} alt="" />
                </div>
                <div className="reviewbox-main-right">
                    <div className="reviewbox-header">
                        <img src={user_icon} alt="" />
                        <h2>{props.username}</h2>
                    </div>
                    <div className="descriptionbox-review-rating">
                        
                        {Array.from({ length: props.rating }, (_, i) => (
                            <img key={i} src={star_icon} alt="star" />
                        ))}

                        {Array.from({ length: 5 - props.rating}, (_, i) => (
                            <img key={i} src={star_dull_icon} alt="star_dull" />
                        ))}
                        
                    </div>
                    <div className="descriptionbox-review-comment">
                        <p>{props.comment}</p>
                    </div>
                </div>
            </div>
        <hr />
    </div>
  );
};

export default ReviewBox;
