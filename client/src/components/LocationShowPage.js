import React, { useState, useEffect } from "react";
import AttractionTile from "./AttractionTile";

const LocationShowPage = (props) => {
  const [location, setLocation] = useState({
    city: "",
    province: "",
    country: "",
    attractions: [],
  });

  useEffect(() => {
    fetchLocation();
  }, []);

  const fetchLocation = async () => {
    try {
      const response = await fetch(`/api/v1/locations/${props.match.params.id}`);
      if (!response.ok) {
        throw new Error(`${response.status}: (${response.statusText})`);
      }
      const json = await response.json();
      setLocation(json.location);
    } catch (error) {
      console.error(`Error in fetch: ${error}`);
    }
  };

  console.log(location.city);

  const locationInfo = location.city ? (
    <>
      <h1>{location.city}</h1>
      <h3>
        {location.province}, {location.country}
      </h3>
      <p>{location.description}</p>
    </>
  ) : (
    <h1>Loading...</h1>
  );

  const attractionsMap = location.attractions.map((attraction) => (
    <AttractionTile key={attraction.id} {...attraction} />
  ));

  return (
    <div className="locationShow card grid-margin-x">
      <div
        className="locationImg-wrapper"
        style={{ margin: "20px auto", width: "800px", height: "400px", backgroundColor: "gray" }}
      >
        <img className="locationImg" src="/favicon.ico" />
      </div>
      <div className="locationShow-title card-section">{locationInfo}</div>
      <div className="locationShow-attractions card-section">{attractionsMap}</div>
    </div>
  );
};

export default LocationShowPage;
