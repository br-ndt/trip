import React, { useState } from "react";
import ReviewShowPage from "./ReviewShowPage";
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
   <NewReviewForm handleInputChange={handleInputChange} handleSubmit={handleSubmit} newReview={newReview}/>
  );
};

export default NewReviewForm;
