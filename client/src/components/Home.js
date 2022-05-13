import React, { useEffect, useState } from "react";
import HomeImageCarousel from "./HomeImageCarousel.js";

const Home = () => {
  const [topAttractions, setTopAttractions] = useState([]);

  const getAttractionImages = async () => {
    try {
      const response = await fetch("/api/v1/attractions");
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const parsedResponse = await response.json();
      setTopAttractions(parsedResponse.attractions);
    } catch (err) {
      console.log(`Error in fetch: ${err.message}`);
    }
  };
  useEffect(() => {
    getAttractionImages();
  }, []);

  const imageElements = topAttractions.length ? (
    <HomeImageCarousel topAttractions={topAttractions} />
  ) : null;


  return (
    <div className="homepage">
      <div className="holy-grail-header text-center">
        <div className="home-page-header">
        <h1> Trip </h1>
        </div>
        <div className="home-page-header">
        <h2> Destination Evaluation </h2>
        </div>
      <div className="icon text-center">
            <img className="logo"src="/logo_shadow.png" alt=""/>
          </div>
      </div>
      <hr />
      <div className="holy-grail-middle">{imageElements}</div>
        <br/>
        <br/>
      <div className="holy-grail-footer text-center">
        Trip Created By: Tyler, Jean, Cam, Fab, Alex
        <br/>
        All Rights Reserved
      </div>
    </div>
  );
};

export default Home;
