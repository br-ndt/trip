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
    image: "",
    reviews: [],
  });

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

  useEffect(() => {
    getAttraction();
  }, []);

  const reviewTiles = attraction.reviews.map((reviewObject) => {
    return <ReviewTile key={reviewObject.id} {...reviewObject} />;
  });

  const attractionName = attraction.name ? <h1>{attraction.name}</h1> : null;

  const attractionDescription = attraction.description ? <h2>{attraction.description}</h2> : null;

  const attractionImage = attraction.image ? <img src={attraction.image} /> : null;

  const reviewSection = reviewTiles.length ? (
    <>
      <h4>{attraction.name} Reviews:</h4>
      {reviewTiles}
    </>
  ) : null;

  const reviewForm = props.user ? (
    <NewReviewForm attractionId={id} addNewReview={addNewReview} />
  ) : null;

  return (
    <div className="holy-grail-grid">
      <div className="holy-grail-header text-center">
      <h3>{attractionName}</h3>
      </div>
      <div className="holy-grail-middle">
      <h3>{attractionImage}</h3>
    <h4>{attractionDescription}</h4>
      <ul>{reviewSection}</ul>
      </div>
      <div className="holy-grail-right">
      <h4>{reviewForm}</h4>
      </div>
    </div>
  );
};

export default AttractionShowPage;
