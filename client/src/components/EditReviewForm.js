import React, { useState } from "react";
import ErrorList from "./layout/ErrorList.js";

const EditReviewForm = (props) => {
  const [editReview, setEditReview] = useState({
    title: props.title,
    content: props.content,
    rating: props.rating,
  });

  const handleInputChange = (event) => {
    setEditReview({
      ...editReview,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.patchReview(editReview, props.id, props.toggleEdit);
  };
  
  const errorList = props.errors ? (
    <ErrorList errors={props.errors}/>
  ) : null

  return (
    <div>
      <h1>Update Your Review</h1>
      {errorList}
      <form onSubmit={(event) => {
        handleSubmit(event)
      }}>
        <label>
          Title:
          <input type="text" name="title" onChange={handleInputChange} value={editReview.title} />
        </label>
        <label>
          Content:
          <textarea name="content" onChange={handleInputChange} value={editReview.content} />
        </label>
        <label>
          Rating:
          <input
            type="number"
            name="rating"
            onChange={handleInputChange}
            value={editReview.rating}
          />
        </label>
        <input type="submit" value="Update Review" />
      </form>
    </div>
  );
};

export default EditReviewForm;
