import React, { useState } from "react";
import EditReviewForm from "./EditReviewForm.js";
import ReviewVotingArea from "./ReviewVotingArea.js";

const ReviewTile = ({
  id,
  title,
  rating,
  content,
  deleteReview,
  creatorId,
  curUserId,
  patchReview,
  errors,
  userLoggedIn,
  userVote,
  submitVote,
  votes,
  creator
}) => {
  const [isBeingEdited, setIsBeingEdited] = useState(false);

  const buttons =
    creatorId === curUserId ? (
      <div className="review-edit-delete">
        <input
        className="button"
          type="button"
          value="Edit Review"
          onClick={() => {
            toggleEdit();
          }}
        />
        <input
        className="button"
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

  let totalScore = 0;
  votes.forEach((vote) => (totalScore += vote.score));

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
    <div className="review-tile review-boxes">
      <div className="review-header">
        <div className="review-title-rating">
          <h4>{title}</h4>
          <h5>{rating}</h5>
        </div>
        <ReviewVotingArea
          reviewId={id}
          userLoggedIn={userLoggedIn}
          totalScore={totalScore}
          userVote={userVote}
          submitVote={submitVote}
        />
      </div>
      <div className="">
        <p>{content}</p>
        {buttons}
      </div>
      <hr />
    </div>
  );
};

export default ReviewTile;
