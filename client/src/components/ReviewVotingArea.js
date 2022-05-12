import React, { useState } from "react"

const ReviewVotingArea = (props) => {
  
  const upVote = props.userLoggedIn ? (
      <input
        type="button"
        value="Up"
        onClick={() => {
          
        }}
      />
      ) : null;

  const downVote = props.userLoggedIn ? (
      <input
        type="button"
        value="Down"
        onClick={() => {
          
        }}
      />
  ) : null;

  return (
    <div className="review-voting-area"> 
      {upVote}
      <p>{props.totalScore}</p>
      {downVote}
    </div>
  )
}

export default ReviewVotingArea
