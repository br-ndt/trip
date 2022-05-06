import React, { useState } from "react";

const NewReviewForm = ({ postReview }) => {
  const [newReview, setNewReview] = useState({
    title: "",
    rating: "",
    content: "",
  });

  const handleInputChange = (event) => {
    event.preventDefault();
    setNewReview({
      ...newReview,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    postReview(newReview);
    clearForm();
  };

  const clearForm = () => {
    setNewReview({
      title: "",
      rating: "",
      content: "",
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" name="title" onChange={handleInputChange} value={newReview.title} />
        </label>
        <label>
          Content:
          <textarea
            name="content"
            onChange={handleInputChange}
            value={newReview.content}
          />
        </label>
        <label>
          Rating:
          <input
            type="number"
            name="rating"
            onChange={handleInputChange}
            value={newReview.rating}
          />
        </label>

        <input type="submit" value="Add Review" />
      </form>
    </div>
  );
};

export default NewReviewForm;
