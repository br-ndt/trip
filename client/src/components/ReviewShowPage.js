import React from 'react'

const ReviewShowPage = (props) => {
  return (
    <div>
      <form onSubmit={props.handleSubmit}>
        <label>
          Title:
          <input type="text" name="title" onChange={props.handleInputChange} value={props.newReview.title} />
        </label>
        <label>
          Content:
          <textarea
            name="content"
            onChange={props.handleInputChange}
            value={props.newReview.content}
          />
        </label>
        <label>
          Rating:
          <input
            type="number"
            name="rating"
            onChange={props.handleInputChange}
            value={props.newReview.rating}
          />
        </label>
        <input type="submit" value="Add Review" />
      </form>
    </div>
  )
}

export default ReviewShowPage