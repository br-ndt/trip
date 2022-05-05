import React from "react";
import { Link } from "react-router-dom";
const AttractionTile = ({ id, name }) => {
  return (
    <div className="callout">
      <Link to={`/attractions/${id}`}> {name} </Link>
    </div>
  );
};
export default AttractionTile;
