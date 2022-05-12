import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReviewTile from "./ReviewTile.js";
import NewReviewForm from "./NewReviewForm.js";
import translateServerErrors from "../services/translateServerErrors.js";
import ErrorList from "./layout/ErrorList.js";

const AttractionShowPage = (props) => {
  const { id } = useParams();
  const [attraction, setAttraction] = useState({
    name: "",
    description: "",
    reviews: [],
  });
  const [errors, setErrors] = useState({});
  console.log('the show page re-rendered');

  useEffect(() => {
    getAttraction();
  }, []);

  const addNewReview = (review) => {
    setAttraction({ ...attraction, reviews: [...attraction.reviews, review] });
  };

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

  const deleteReview = async (reviewId) => {
    try {
      const response = await fetch(`/api/v1/reviews/${reviewId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        if (response.status === 401) {
          const body = await response.json();
          return setErrors(body);
        } else {
          throw new Error(`${response.status} (${response.statusText})`);
        }
      } else {
        const body = await response.json();
        const filteredReviews = attraction.reviews.filter((review) => {
          return review.id !== reviewId;
        });
        setErrors({});
        setAttraction({ ...attraction, reviews: filteredReviews });
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  const patchReview = async (reviewBody, reviewId) => {
    try {
      const response = await fetch(`/api/v1/reviews/${reviewId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewBody),
      });
      if (!response.ok) {
        if (response.status === 422) {
          const body = await response.json();
          const updatedReviewsWithErrors = attraction.reviews.map((review) => {
            if (review.id === reviewId) {
              review.errors = body;
            }
            return review;
          });
          setAttraction({ ...attraction, reviews: updatedReviewsWithErrors });
          return false;
        } else {
          const errorMessage = `${response.status} (${response.statusText})`;
          const error = new Error(errorMessage);
          throw error;
        }
      } else {
        const body = await response.json();
        const updatedReviews = attraction.reviews.map((review) => {
          if (review.id === reviewId) {
            review.title = body.review.title;
            review.rating = body.review.rating;
            review.content = body.review.content;
            if (review.errors) {
              delete review.errors;
            }
          }
          return review;
        });
        setErrors({});
        setAttraction({ ...attraction, reviews: updatedReviews });
        return true;
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
      return false;
    }
  };

  const submitVote = async (reviewId, vote, voteVal) => {
    let voteId;
    if(!vote) {
      voteId = 0;
    } else {
      voteId = vote.id
    }
    try {
      const reviewToUpdate = attraction.reviews.find(review => review.id === reviewId);
      const response = await fetch(`/api/v1/reviews/${reviewId}/votes/${voteId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ voteVal: voteVal })
      })
      if (!response.ok) {
        if (response.status === 400) {
          const body = await response.json();
        } else {
          throw new Error(`${response.status} (${response.statusText})`);
        }
      } else {
        const body = await response.json();
        const voteToUpdate = reviewToUpdate.votes.find(vote => vote.id === voteId);
        let updatedReviews;
        if(voteToUpdate) {
          updatedReviews = attraction.reviews.map((review) => {
            if(review.id === reviewId) {
              review.votes = [...review.votes.filter(vote => vote.id !== voteId), body.vote];
            }
            return review;
          })
        } else {
          updatedReviews = attraction.reviews.map((review) => {
            if(review.id === reviewId) {
              review.votes = [...review.votes, body.vote];
            }
            return review;
          })
        }
        setErrors({});
        setAttraction({ ...attraction, reviews: updatedReviews });
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  }

  const attractionName = attraction.name ? <h1>{attraction.name}</h1> : null;

  const attractionDescription = attraction.description ? <h2>{attraction.description}</h2> : null;

  const reviewTiles = attraction.reviews.map((reviewObject) => {
    console.log(attraction.reviews);
    let curUserId = null;
    let userLoggedIn = false;
    if (props.user) {
      curUserId = props.user.id;
      userLoggedIn = true;
    }
    return (
      <ReviewTile
        {...reviewObject}
        key={reviewObject.id}
        deleteReview={deleteReview}
        curUserId={curUserId}
        patchReview={patchReview}
        userLoggedIn={userLoggedIn}
        userVote={reviewObject.votes.find(vote => vote.userId === curUserId)}
        submitVote={submitVote}
      />
    );
  });

  const reviewSection = reviewTiles.length ? (
    <>
      <h4>{attraction.name} Reviews:</h4>
      {reviewTiles}
    </>
  ) : null;

  const reviewForm = props.user ? (
    <NewReviewForm attractionId={id} addNewReview={addNewReview} />
  ) : null;

  const errorList = Object.keys(errors) ? <ErrorList errors={errors} /> : null;

  return (
    <div className="callout">
      {attractionName}
      {attractionDescription}
      {reviewForm}
      {errorList}
      {reviewSection}
    </div>
  );
};

export default AttractionShowPage;
