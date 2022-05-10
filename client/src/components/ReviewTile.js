import React from "react";

const ReviewTile = ({ id, title, rating, content, deleteReview }) => {

  return (
    <div>
      <h4>{title}</h4>
      <h5>{rating}</h5>
      <p>{content}</p>
      <div onClick={() => { deleteReview(id) }}>
        <input type="submit" value="Delete Review"/>
      </div>
    </div>
  );
};

export default ReviewTile;
