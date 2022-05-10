import React, { useState } from "react"
import ErrorList from "./layout/ErrorList.js";

const EditReviewForm = ({ postReview }) => {
  const [editReview, setEditReview] = useState({
        title: "",
        content: "",
        rating: "",
    })

    const handleInputChange = (event) => {
        setEditReview({
            ...editReview,
            [event.currentTarget.name]: event.currentTarget.value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        postReview(editReview)
        clearForm()
    }

    const clearForm = () => {
        setEditReview({
        title: "",
        content: "",
        rating: ""
    })
}

return (
    <div>
        <h1>Update Your Review</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" name="title" onChange={handleInputChange} value={editReview.title} />
        </label>
        <label>
          Content:
          <textarea name="content" onChange={handleInputChange} value={editReview.content} />
        </label>
        <label>
          Rating:
          <input
            type="number"
            name="rating"
            onChange={handleInputChange}
            value={editReview.rating}
          />
        </label>
        <input type="submit" value="Update Review" />
      </form>
    </div>
  );
};

export default EditReviewForm


