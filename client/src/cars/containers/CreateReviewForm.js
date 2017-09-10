import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { reduxForm } from 'redux-form'

import { createCarReview, fetchCarReviews } from '../../store/cars'
import { resetError } from '../../store/messages'

import Error from '../../shared/components/Error'

class CreateReviewForm extends Component {
  constructor (props) {
    super(props)

    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.onRatingChange = this.onRatingChange.bind(this)

    this.state = {
      rating: 1
    }
  }

  componentWillUnmount () {
    if (this.props.error) {
      this.props.resetError()
    }
  }

  handleFormSubmit (comment) {
    this.props.createCarReview(this.props.carId, {rating: this.state.rating, comment})
  }

  onRatingChange (e) {
    this.setState({
      rating: e.currentTarget.value
    })
  }

  renderAlert () {
    if (this.props.error) {
      return (
        <Error error={this.props.error} />
      )
    }
  }

  render () {
    const {fields: {comment}, handleSubmit} = this.props

    return (
      <div className='panel panel-default'>
        <div className='panel-heading'>
          <form onSubmit={handleSubmit(this.handleFormSubmit)}>
            {this.renderAlert()}
            <label>
              Rating:
            </label>
            <div className='form-group'>
              <label className='radio-inline'>
                <input
                  type='radio'
                  name='rating'
                  value='1'
                  defaultChecked
                  onChange={this.onRatingChange} />1
              </label>
              <label className='radio-inline'>
                <input
                  type='radio'
                  name='rating'
                  value='2'
                  onChange={this.onRatingChange} />2
              </label>
              <label className='radio-inline'>
                <input
                  type='radio'
                  name='rating'
                  value='3'
                  onChange={this.onRatingChange} />3
              </label>
              <label className='radio-inline'>
                <input
                  type='radio'
                  name='rating'
                  value='4'
                  onChange={this.onRatingChange} />4
              </label>
              <label className='radio-inline'>
                <input
                  type='radio'
                  name='rating'
                  value='5'
                  onChange={this.onRatingChange} />5
              </label>
            </div>
            <div className='form-group'>
              <label>
                Comment:
              </label>
              <textarea
                className='form-control'
                placeholder='Comment'
                name='comment'
                {...comment} />
            </div>
            <button type='submit' className='btn btn-default'>
              Add Review
            </button>
          </form>
        </div>
      </div>
    )
  }
}

function validate (values) {
  const errors = {}

  return errors
}

function mapStateToProps (state) {
  return {
    error: state.messages.error
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({createCarReview, fetchCarReviews, resetError}, dispatch)
}

export default reduxForm({
  form: 'CreateReviewForm',
  fields: ['rating', 'comment'],
validate}, mapStateToProps, mapDispatchToProps)(CreateReviewForm)
