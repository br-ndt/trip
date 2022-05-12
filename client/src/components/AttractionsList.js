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

  const addNewAttraction = (attraction) => {
    setAttractions([...attractions, attraction]);
  };

  useEffect(() => {
    getAttractions();
  }, []);

  const attractionTileComponents = attractions.map((attractionObject) => {
    return <AttractionTile key={`attractionTile-${attractionObject.id}`} {...attractionObject} />;
  });

  const attractionForm = props.user ? (
    <NewAttractionForm addNewAttraction={addNewAttraction} />
  ) : null;

  return (
      <div className="callout success">
        {attractionForm}
        <p>Attractions:</p>
     {attractionTileComponents}
        </div>
  );
};
export default AttractionsList;
