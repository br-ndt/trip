import React, { useState } from "react";

const NewReviewForm = (props) => {
  const [newReview, setNewReview] = useState({
    title: "",
    rating: "",
    content: "",
    userId: 1,// Placeholder value
  });

  const addNewReview = async () => {
    const { attractionId } = props;
    try {
      const response = await fetch(`/api/v1/attractions/${attractionId}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newReview),
      });
      
      const body = await response.json();
      if (!response.ok) {
        if (response.status === 422) {
          const newErrors = translateServerErrors(body.errors);
          return setErrors(newErrors);
        }
        throw new Error(`${response.status} (${response.statusText})`);
      } else {
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
    addNewReview(newReview);
  };

  const clearForm = () => {
    setNewReview({
      title: "",
      rating: "",
      content: "",
      userId: 1
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
    )
};

export default NewReviewForm;
