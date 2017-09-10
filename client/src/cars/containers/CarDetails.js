import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { fetchCar, fetchCarReviews, likeCar } from '../../store/cars'
import { resetError } from '../../store/messages'

import CreateReviewForm from './CreateReviewForm'
import ReviewsList from '../components/ReviewsList'
import Error from '../../shared/components/Error'

class CarDetails extends Component {
  constructor (props) {
    super(props)

    this.state = {
      carId: this.props.params.id
    }
  }

  componentWillUnmount () {
    if (this.props.error) {
      this.props.resetError()
    }
  }

  componentDidMount () {
    this.props.fetchCar(this.state.carId)
    this.props.fetchCarReviews(this.state.carId)
  }

  back () {
    window.location.href = window.history.back(1)
  }

  like () {
    this.props.likeCar(this.state.carId)
  }

  renderCar () {
    if (this.props.car) {
      const car = this.props.car

      return (
        <div>
          <h1>{car.make} {car.model} {car.engine}</h1>
          <div className='panel panel-default'>
            <div className='panel-body'>
              <img src={car.image} className='img-responsive' />
              <h3>{car.price}lv</h3>
              <p>Make - {car.make}</p>
              <p>Model - {car.model}</p>
              <p>Engine - {car.engine}</p>
              <p>Year - {car.year}</p>
              <button className='btn btn-default' onClick={this.like.bind(this)}>Like</button>
              {car.likes}
              <p />
              {this.renderAlert()}
            </div>
          </div>
        </div>
      )
    }
  }

  renderAlert () {
    if (this.props.error) {
      return (
        <Error error={this.props.error} />
      )
    }
  }

  render () {
    return (
      <div>
        {this.renderCar()}
        <button className='btn btn-default' onClick={this.back.bind(this)}>Back</button>
        <p />
        <h2>Add Review</h2>
        <CreateReviewForm carId={this.state.carId} />
        <h2>Reviews</h2>
        <ReviewsList reviews={this.props.reviews} />
      </div>
    )
  }
}

function mapStateToProps (state) {
  return { car: state.cars.selected, reviews: state.cars.selectedCarReviews, error: state.messages.error }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({fetchCar, fetchCarReviews, likeCar, resetError}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CarDetails)
