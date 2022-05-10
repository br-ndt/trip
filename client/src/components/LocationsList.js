import React, { useState, useEffect } from "react";
import LocationTile from "./LocationTile";

const LocationsList = () => {
  const [locations, setLocations] = useState([]);

  const getLocations = async () => {
    try {
      const response = await fetch("/api/v1/locations");
      if (!response.ok) {
        throw new Error(`${response.status} (${response.statusText})`);
      }
      const parsedResponse = await response.json();
      setLocations(parsedResponse.locations);
    } catch (err) {
      console.log(`Error in fetch: ${err.message}`);
    }
  };
  useEffect(() => {
    getLocations();
  }, []);

  const locationTileComponents = locations.map((locationObject) => (
    <LocationTile key={locationObject.id} {...locationObject} />
  ));
  return (
    <div>
      Locations
      {locationTileComponents}
    </div>
  );
};

export default LocationsList;
