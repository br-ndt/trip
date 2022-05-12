import React, { useState } from "react";

const ReviewVotingArea = (props) => {
  const upVote = props.userLoggedIn ? (
    <input
      type="button"
      value="Up"
      className={props.userVote && props.userVote.score === 1 ? "green" : ""}
      onClick={() => {
        props.submitVote(props.reviewId, props.userVote, 1);
      }}
    />
  ) : null;

  const downVote = props.userLoggedIn ? (
    <input
      type="button"
      value="Down"
      className={props.userVote && props.userVote.score === -1 ? "red" : ""}
      onClick={() => {
        props.submitVote(props.reviewId, props.userVote, -1);
      }}
    />
  ) : null;

  return (
    <div className="review-voting-area">
      {upVote}
      <div className="score-wrapper">
        <p>{props.totalScore || 0}</p>
      </div>
      {downVote}
    </div>
  );
};

export default ReviewVotingArea;
