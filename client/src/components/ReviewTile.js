import React from "react";
import EditReviewForm from "./EditReviewForm.js";

const ReviewTile = ({ id, title, rating, content, deleteReview, editReview }) => {

  return (
    <div>
      <h4>{title}</h4>
      <h5>{rating}</h5>
      <p>{content}</p>
      <div onClick={() => { deleteReview(id) }}>
        <input type="submit" value="Delete Review"/>
      </div>
      
      <div onClick={() => { editReview(id) }}>
        <input type="submit" value="Edit Review"/>
        <EditReviewForm editReview={editReview} />
      </div>
    </div>
  );
};

export default ReviewTile;
