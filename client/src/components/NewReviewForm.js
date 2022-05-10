import React, { useState } from "react";
import ErrorList from "./layout/ErrorList";
import translateServerErrors from "../services/translateServerErrors.js";

const NewReviewForm = (props) => {
  const [newReview, setNewReview] = useState({
    title: "",
    rating: "",
    content: "",
  });

  const [errors, setErrors] = useState({});

  const postReview = async () => {
    const { attractionId } = props;
    try {
      const response = await fetch(`/api/v1/attractions/${attractionId}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newReview),
      });
      if (!response.ok) {
        if (response.status === 422) {
          const body = await response.json();
          const newErrors = translateServerErrors(body.errors.data);
          return setErrors(newErrors);
        }
        throw new Error(`${response.status} (${response.statusText})`);
      } else {
        const body = await response.json();
        clearForm();
        props.addNewReview(body.review);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

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
  };

  const clearForm = () => {
    setNewReview({
      title: "",
      rating: "",
      content: "",
    });
  };

  return (
    <div className="review-form form">
      <h4>Add a Review:</h4>
      <ErrorList errors={errors} />
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" name="title" onChange={handleInputChange} value={newReview.title} />
        </label>
        <label>
          Content:
          <textarea name="content" onChange={handleInputChange} value={newReview.content} />
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
