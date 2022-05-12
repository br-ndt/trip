import React, { useState } from "react";
import EditReviewForm from "./EditReviewForm.js";
import ReviewVotingArea from "./ReviewVotingArea.js";

const ReviewTile = ({ id, title, rating, content, deleteReview, isOwner, patchReview, errors, userLoggedIn, totalScore }) => {
  const [isBeingEdited, setIsBeingEdited] = useState(false);

  const buttons = isOwner ? (
    <div className="review-edit-delete">
      <input
        type="button"
        value="Edit Review"
        onClick={() => {
          toggleEdit();
        }}
      />
      <input
        type="button"
        value="Delete Review"
        onClick={() => {
          deleteReview(id);
        }}
      />
    </div>
  ) : null;

  const toggleEdit = () => {
    setIsBeingEdited(!isBeingEdited);
  };

  if (isBeingEdited) {
    return (
      <EditReviewForm
        patchReview={patchReview}
        id={id}
        title={title}
        rating={rating}
        content={content}
        toggleEdit={toggleEdit}
        errors={errors}
      />
    );
  }

  return (
    <div className="review-tile">
      <div className="review-header">
        <div className="review-title-rating">
          <h4>{title}</h4>
          <h5>{rating}</h5>
        </div>
        <ReviewVotingArea 
          userLoggedIn={userLoggedIn}
          totalScore={totalScore}
        />
      </div>
      <div>
        <p>{content}</p>
        {buttons}
      </div>
      <hr />
    </div>
  );
};

export default ReviewTile;
