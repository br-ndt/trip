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
    image: "",
    reviews: [],
  });
  const [errors, setErrors] = useState({});

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
    if (!vote) {
      voteId = 0;
    } else {
      voteId = vote.id;
    }
    try {
      const reviewToUpdate = attraction.reviews.find((review) => review.id === reviewId);
      const response = await fetch(`/api/v1/reviews/${reviewId}/votes/${voteId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ voteVal: voteVal }),
      });
      if (!response.ok) {
        if (response.status === 400) {
          const body = await response.json();
          setErrors({ body });
        } else {
          throw new Error(`${response.status} (${response.statusText})`);
        }
      } else {
        const body = await response.json();
        const voteToUpdate = reviewToUpdate.votes.find((vote) => vote.id === voteId);
        let updatedReviews;
        if (voteToUpdate) {
          updatedReviews = attraction.reviews.map((review) => {
            if (review.id === reviewId) {
              review.votes = [...review.votes.filter((vote) => vote.id !== voteId), body.vote];
            }
            return review;
          });
        } else {
          updatedReviews = attraction.reviews.map((review) => {
            if (review.id === reviewId) {
              review.votes = [...review.votes, body.vote];
            }
            return review;
          });
        }
        setErrors({});
        setAttraction({ ...attraction, reviews: updatedReviews });
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  const reviewTiles = attraction.reviews
    .map((reviewObject) => {
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
          creatorId={reviewObject.userId}
          creator={reviewObject.user}
          deleteReview={deleteReview}
          curUserId={curUserId}
          patchReview={patchReview}
          userLoggedIn={userLoggedIn}
          userVote={reviewObject.votes.find((vote) => vote.userId === curUserId)}
          submitVote={submitVote}
        />
      );
    })
    .sort((reviewA, reviewB) => {
      return reviewB.props.totalScore - reviewA.props.totalScore;
    });

  const attractionName = attraction.name ? (
    <div className="holy-grail-header">{attraction.name}</div>
  ) : null;

  const attractionDescription = attraction.description ? (
    <div className="holy-grail-middle">{attraction.description}</div>
  ) : null;

  const attractionImage = attraction.image ? (
    <div className="holy-grail-left">
      <img src={attraction.image}></img>
    </div>
  ) : null;

  const reviewSection = reviewTiles.length ? (
    <>
      <div className="holy-grail-footer">
        <h3>{attraction.name} Reviews:</h3>
      </div>
      {reviewTiles}
    </>
  ) : null;

  const reviewForm = props.user ? (
    <NewReviewForm attractionId={id} addNewReview={addNewReview} />
  ) : null;

  const errorList = Object.keys(errors) ? <ErrorList errors={errors} /> : null;

  return (
    <div className="holy-grail-grid">
      <div className="holy-grail-header text-center">
        <h1>{attractionName}</h1>
      </div>

      <div className="holy-grail-left">
        <h3>{attractionImage}</h3>
      </div>
      <div className="holy-grail-middle">
        <h3>{attractionDescription}</h3>
      </div>

      <div className="holy-grail-right">
        {errorList}
        <h3>{reviewForm}</h3>
      </div>

      <div className="holy-grail-footer">
        <ul>{reviewSection}</ul>
      </div>
    </div>
  );
};

export default AttractionShowPage;
