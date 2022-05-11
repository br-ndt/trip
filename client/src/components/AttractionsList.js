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
      <div className="grid-container fluid">
      <div class="grid-x grid-padding-x small-up-2 medium-up-4 large-up-6">
      <div className="callout primary cell">
        {attractionForm}
      </div>
        </div>
        <div class="grid-y medium-grid-frame">
  <div class="cell shrink header medium-cell-block-container">
        <h3>Attractions:</h3>
        <div class="grid-x grid-padding-x">
      <div class="cell medium-4">
     {attractionTileComponents}
     </div>
     </div>
      </div>
      </div>
    </div>
  );
};
export default AttractionsList;
