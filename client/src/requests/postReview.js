const postReview = async (reviewData) => {
    try {
      const response = await fetch(`/api/v1/attractions/${id}/reviews`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(reviewData),
      });
      if (!response.ok) {
        if (response.status === 422) {
          const body = await response.json();
          const newErrors = translateServerErrors(body.errors);
          return setErrors(newErrors);
        }
      } else {
        const body = await response.json();
        const updatedReviews = attraction.reviews.concat(body.review);
        setErrors([]);
        setAttraction({ ...attraction, reviews: updatedReviews });
        throw (error);
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }