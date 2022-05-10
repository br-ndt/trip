import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReviewTile from "./ReviewTile.js";
import NewReviewForm from "./NewReviewForm.js";
import translateServerErrors from "../services/translateServerErrors.js";

const AttractionShowPage = (props) => {
  const { id } = useParams();
  const [attraction, setAttraction] = useState({
    name: "",
    description: "",
    reviews: [],
  });
  const [errors, setErrors] = useState([])

  const getAttraction = async () => {
    try {
      const response = await fetch(`/api/v1/attractions/${id}`);
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const attractionData = await response.json();
      setAttraction(attractionData.attraction);
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  const addNewReview = (review) => {
    setAttraction({ ...attraction, reviews: [...attraction.reviews, review] });
  };

  const deleteReview = async (reviewId) => {
    try {
      const response = await fetch(`/api/v1/reviews/${reviewId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      })
      if (!response.ok) {
        if (response.status === 422) {
          const body = await response.json()
          const newErrors = translateServerErrors(body.errors)
          return setErrors(newErrors)
        } else {
          const errorMessage = `${response.status} (${response.statusText})`
          const error = new Error(errorMessage)
          throw error
        }
      } else {
        const body = await response.json()
        const filteredReviews = attraction.reviews.filter((review) => {
          return review.id !== reviewId
        })
        setErrors([])
        setAttraction({...attraction, reviews: filteredReviews})
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  const editReview = async (reviewId) => {
    try {
      const response = await fetch(`/api/v1/reviews/${reviewId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(attraction)
      })
      if (!response.ok) {
        if (response.status === 422) {
          const body = await response.json()
          const newErrors = translateServerErrors(body.errors)
          return setErrors(newErrors)
        } else {
          const errorMessage = `${response.status} (${response.statusText})`
          const error = new Error(errorMessage)
          throw error
        }
      } else {
        const body = await response.json()
        const updatedReviews = attraction.reviews.findIndex(review => review.id === reviewId)

        setErrors([])
        setAttraction({...attraction, reviews: updatedReviews})
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  useEffect(() => {
    getAttraction();
  }, []);
  
  const reviewTiles = attraction.reviews.map((reviewObject) => {
    return <ReviewTile key={reviewObject.id} {...reviewObject} deleteReview={deleteReview} editReview={editReview} />
  });

  const attractionName = attraction.name ? <h1>{attraction.name}</h1> : null;

  const attractionDescription = attraction.description ? <h2>{attraction.description}</h2> : null;

  const reviewSection = reviewTiles.length ? (
    <>
      <h4>{attraction.name} Reviews:</h4>
      {reviewTiles}
    </>
  ) : (
    null
  );

  const reviewForm = props.user ? (
    <NewReviewForm attractionId={id} addNewReview={addNewReview} />
  ) : (
    null
  );

  return (
    <div className="callout">
      {attractionName}
      {attractionDescription}
      {reviewForm}
      {reviewSection}
    </div>
  );
};

export default AttractionShowPage;