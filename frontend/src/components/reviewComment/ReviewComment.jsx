import { useContext, useState } from 'react';
import { ShopContext } from '../../context/ShopContext';
import './ReviewComment.css';

const ReviewComment = () => {
  const [image, setImage] = useState(false);
  const { user } = useContext(ShopContext);

  const [reviewDetails, setReviewDetails] = useState({
    username: user??"",
    image: "",
    comment: "",
    rating: 0,
  });

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const changeHandler = (e) => {
    setReviewDetails({ ...reviewDetails,  
      [e.target.name]: e.target.value
    });
  };

  const addReview = async () => {
    console.log(reviewDetails);
    let responseData;
    let review = reviewDetails;

    let formData = new FormData();
    formData.append("reviewImage", image);

    await fetch("http://localhost:4000/uploads", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    }).then((resp) =>
      resp.json().then((data) => {
        responseData = data;
      })
    );

    if (responseData.success) {
      review.image = responseData.image_url;
      console.log(review);
      await fetch("http://localhost:4000/addreview", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(review),
      }).then((resp) => resp.json())
      .then((data) => {
        if (data.success) {
          alert("Product Added Successfully");
          setReviewDetails({
            username: user??"",
            image: "",
            comment: "",
            rating: 0,
          })
        }
      })
    }
  }




  return (
    <div className="reviewcomment">
        HII
    </div>
  )
}

export default ReviewComment