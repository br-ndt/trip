import React, { useState, useEffect } from "react";
import AttractionTile from "./AttractionTile";
import NewAttractionForm from "./NewAttractionForm";

const AttractionsList = (props) => {
  const [attractions, setAttractions] = useState([]);

  const getAttractions = async () => {
    try {
      const response = await fetch("/api/v1/attractions");
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const parsedResponse = await response.json();
      setAttractions(parsedResponse.attractions);
    } catch (err) {
      console.err(`Error in fetch: ${err.message}`);
    }
  };

  useEffect(() => {
    getAttractions();
  }, []);

  const attractionTileComponents = attractions.map((attractionObject) => {
    return <AttractionTile key={attractionObject.id} {...attractionObject} />;
  });

  return (
    <div className="callout">
      
      <h3>Add a New Attraction:</h3>
      <div>
        <NewAttractionForm />
      </div>
      <h3>Attractions:</h3>
      {attractionTileComponents}
    </div>
  );
};
export default AttractionsList;
