import React, { Component } from 'react'
import { Link } from 'react-router'

export default class CarsList extends Component {
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
        {this.renderCars()}
      </div>
    )
  }
}
