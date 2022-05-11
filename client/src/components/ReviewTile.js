import React from "react";
import EditReviewForm from "./EditReviewForm.js";

const ReviewTile = ({ id, title, rating, content, deleteReview, isOwner, editReview }) => {
  const deleteButton = isOwner ? (
    <input
      type="button"
      value="Delete Review"
      onClick={() => {
        deleteReview(id);
      }}
    />
  ) : null;

  return (
    <div>
      <h4>{title}</h4>
      <h5>{rating}</h5>
      <p>{content}</p>
      <div onClick={() => { editReview(id) }}>
        <input type="submit" value="Edit Review"/>
        <EditReviewForm editReview={editReview} />
      </div>
      {deleteButton}
      <hr/>
    </div>
  );
};

export default ReviewTile;
