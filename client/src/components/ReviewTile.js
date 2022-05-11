import React, { useState } from "react";
import EditReviewForm from "./EditReviewForm.js";

const ReviewTile = ({ id, title, rating, content, deleteReview, isOwner, patchReview, errors }) => {
  const [isBeingEdited, setIsBeingEdited] = useState(false);

  const editButton = isOwner ? (
    <input
      type="button"
      value="Edit Review"
      onClick={() => {
        toggleEdit();
      }}
    />
  ) : null;

  const deleteButton = isOwner ? (
    <input
      type="button"
      value="Delete Review"
      onClick={() => {
        deleteReview(id);
      }}
    />
  ) : null;
  
  const toggleEdit = () => {
    setIsBeingEdited(!isBeingEdited)
  }

  if (isBeingEdited) {
    return <EditReviewForm patchReview={patchReview} id={id} title={title} rating={rating} content={content} toggleEdit={toggleEdit} errors={errors}/>;
  }

  return (
    <div>
      <h4>{title}</h4>
      <h5>{rating}</h5>
      <p>{content}</p>
      {editButton}
      {deleteButton}
      <hr />
    </div>
  );
};

export default ReviewTile;
