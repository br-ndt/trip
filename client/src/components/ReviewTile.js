import React from "react";

const ReviewTile = ({ title, rating, content }) => {
  return (
    <div>
      <h4>{title}</h4>
      <h5>{rating}</h5>
      <p>{content}</p>
    </div>
  );
};

export default ReviewTile;
