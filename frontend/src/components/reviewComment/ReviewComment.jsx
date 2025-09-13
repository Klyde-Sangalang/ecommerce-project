import { useEffect, useState } from "react";
import upload_icon from "../assets/upload_area.svg";
import "./ReviewComment.css";

const ReviewComment = () => {
  const [image, setImage] = useState(null);
  const [user, setUser] = useState(null);

  const [reviewDetails, setReviewDetails] = useState({
    username: "",
    image: "",
    comment: "",
    rating: 0,
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    setUser(storedUser);
    setReviewDetails((prev) => ({
      ...prev,
      username: storedUser || "",
    }));
  }, []);

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const changeHandler = (e) => {
    setReviewDetails({
      ...reviewDetails,
      [e.target.name]: e.target.value,
    });
  };

  const addReview = async () => {
    console.log(reviewDetails);
    let responseData;
    let review = { ...reviewDetails };

    let formData = new FormData();
    formData.append("reviewImage", image);

    await fetch("http://localhost:4000/uploads", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    })
      .then((resp) => resp.json())
      .then((data) => {
        responseData = data;
      });

    if (responseData?.success) {
      review.image = responseData.image_url;

      await fetch("http://localhost:4000/addreview", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(review),
      })
        .then((resp) => resp.json())
        .then((data) => {
          if (data.success) {
            alert("Review Added Successfully");
            setReviewDetails({
              username: user || "",
              image: "",
              comment: "",
              rating: 0,
            });
            setImage(null);
          }
        });
    }
  };

  return (
    <>
      {user === null ? (
        <div>
          <h2>Please Login to add a comment</h2>
        </div>
      ) : (
        <div className="reviewcomment">
          <h2>Leave a Comment</h2>
          <h4>Using your username:  {user}</h4>

          {/* Upload Image */}
          <div className="reviewcomment-itemfield">
            <label htmlFor="file-input">
              <img
                src={image ? URL.createObjectURL(image) : upload_icon}
                alt="upload"
                className="upload-icon"
              />
            </label>
            <input
              onChange={imageHandler}
              type="file"
              id="file-input"
              name="image"
              hidden
            />
          </div>

          {/* Comment */}
          <div className="reviewcomment-itemfield">
            <textarea
              name="comment"
              placeholder="Write your review..."
              value={reviewDetails.comment}
              onChange={changeHandler}
            />
          </div>

          {/* Rating */}
          <div className="reviewcomment-itemfield">
            <input
              type="number"
              name="rating"
              min="0"
              max="5"
              value={reviewDetails.rating}
              onChange={changeHandler}
              placeholder="Rating (0-5)"
            />
          </div>

          {/* Submit */}
          <button onClick={addReview}>Submit Review</button>
        </div>
      )}
    </>
  );
};

export default ReviewComment;
