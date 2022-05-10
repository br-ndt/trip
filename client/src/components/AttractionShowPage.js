import React, { useState, useEffect } from "react";
import ReviewTile from "./ReviewTile.js";
import NewReviewForm from "./NewReviewForm.js";
import translateServerErrors from "../services/translateServerErrors.js";

const AttractionShowPage = (props) => {
  const [attraction, setAttraction] = useState({
    name: "",
    description: "",
    reviews: [],
  });

  const [errors, setErrors] = useState([]);

  const id = props.match.params.id;

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
    setAttraction({...attraction, reviews: [...attraction.reviews, review]});
  }

  const deleteReview = async (reviewData) => {
    try {
      const response = await fetch(`/api/v1/reviews/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewData)
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
        console.log(body)
        const filteredReviews = attraction.reviews.filter((review) => {
          if(review !== body.review) {
            return review
          }
        })
        setErrors([])
        setAttraction({...attraction, reviews: filteredReviews})
      }
      } catch (error) {
          console.error(`Error in fetch: ${error.message}`)
      }
      }

  useEffect(() => {
    getAttraction();
  }, []);
  
  const reviewTiles = attraction.reviews.map((reviewObject) => {
    return <ReviewTile key={reviewObject.id} {...reviewObject} deleteReview={deleteReview}/>;
  });

  const attractionName = attraction.name || "Launch Academy";
  const attractionDescription = attraction.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

  return (
    <div className="callout">
      <h1>{attractionName}</h1>
      <h2>{attractionDescription}</h2>
      <div>
        <h4>Add a Review</h4>
        <NewReviewForm attractionId={id} addNewReview={addNewReview}/>
      </div>
      <h4>{attractionName} Reviews:</h4>
      {reviewTiles}
    </div>
  );
};

export default AttractionShowPage;
