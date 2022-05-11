import React from "react";

const ReviewTile = ({ id, title, rating, content, deleteReview, isOwner }) => {
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
      {deleteButton}
      <hr/>
    </div>
  );
};

export default ReviewTile;
