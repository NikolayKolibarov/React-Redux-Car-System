import React, { Component } from 'react'
import { Link } from 'react-router'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { fetchUserCars, removeCar } from '../store/cars'

class Profile extends Component {
  componentDidMount () {
    this.props.fetchUserCars()
  }

  remove (carId) {
    this.props.removeCar(carId)
  }

  renderCars () {
    if (this.props.cars && this.props.cars.length > 0) {
      return this.props.cars.map(car => {
        return (
          <div key={car.id} className='car-list-item'>
            <div className='panel panel-default'>
              <div className='panel-body'>
                <h2>{car.make} {car.model} {car.engine}</h2>
                <img src={car.image} className='img-responsive' />
                <h3>{car.price}lv</h3>
                <p />
                <Link to={`/cars/details/${car.id}`} className='btn btn-default'> View Details
                </Link>
                <button className='btn btn-default' onClick={this.remove.bind(this, car.id)}>
                  Remove
                </button>
              </div>
            </div>
            <hr />
          </div>
        )
      })
    } else {
      return (
        <h3>No cars to be shown.</h3>
      )
    }
  }

  render () {
    return (
      <div>
        <h1>Profile</h1>
        {this.renderCars()}
        <br />
      </div>
    )
  }
}

function mapStateToProps (state) {
  return { cars: state.cars.userCars }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({fetchUserCars, removeCar}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
