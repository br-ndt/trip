import React from "react";
import { Link } from "react-router-dom";

const LocationTile = ({ id, city, province, country }) => {
  return(
    <div className="locationTile">
      <Link to={`/locations/${id}`}><h2>{city}</h2></Link>
      <h4>{province}, {country}</h4>
    </div>
  )
}

export default LocationTile;