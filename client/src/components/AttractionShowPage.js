import React, { useState, useEffect } from "react";

import ReviewTile from "./ReviewTile.js";

import translateServerErrors from "../services/translateServerErrors.js";

const AttractionShowPage = (props) => {
  const [attraction, setAttraction] = useState({
    attractions: [],
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

  useEffect(() => {
    getAttraction();
  }, []);


  const reviewTiles = attraction.reviews.map((reviewObject) => {
    return <ReviewTile key={reviewObject.id} {...reviewObject} />;
  });

  return (
    <div className="callout">
      <h1>{attraction.name}</h1>
      <h2>{attraction.description}</h2>
      <h4>Attraction Reviews:</h4>
      {reviewTiles}
    </div>
  );
};

export default AttractionShowPage;
