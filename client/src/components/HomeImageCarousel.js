import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HomeImageCarousel = (props) => {
  const [imageIndex, setImageIndex] = useState(0);

  let slideIndex = 0;
  const getIndex = async () => {
    slideIndex++;
    if (slideIndex >= props.topAttractions.length) {
      slideIndex = 0;
    }
    setTimeout(getIndex, 6000);
    setImageIndex(slideIndex);
  };

  useEffect(() => {
    getIndex();
  }, []);

  const slideContent = props.topAttractions.length ? (
    <div className="hero-section text-center">
      <Link to={`/attractions/${props.topAttractions[imageIndex].id}`}>
        <h2>{props.topAttractions[imageIndex].name}</h2>
        <img
          src={props.topAttractions[imageIndex].image}
          alt={props.topAttractions[imageIndex].name}
        />
      </Link>
    </div>
  ) : null;
  return <div>{slideContent}</div>;
};

export default HomeImageCarousel;
