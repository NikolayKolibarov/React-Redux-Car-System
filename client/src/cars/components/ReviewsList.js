import React, { Component } from 'react'

export default class ReviewsList extends Component {
  renderReviews () {
    if (this.props.reviews && this.props.reviews.length > 0) {
      return this.props.reviews.map(review => {
        return (
          <div key={review.createdOn} className='review-list-item'>
            <div className='panel panel-default'>
              <div className='panel-body'>
                <p>
                  Rating: <strong>{review.rating}</strong>
                </p>
                <p>
                  Comment: <strong>{review.comment.comment}</strong>
                </p>
                <p>
                  User: <strong>{review.user}</strong>
                </p>
                <p>
                  Date: <strong>{review.createdOn}</strong>
                </p>
              </div>
            </div>
            <hr />
            <br />
          </div>
        )
      })
    } else {
      return (
        <p>No reviews to be shown.</p>
      )
    }
  }

  render () {
    return (
      <div>
        {this.renderReviews()}
      </div>
    )
  }
}
