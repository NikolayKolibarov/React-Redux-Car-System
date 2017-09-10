import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

import { createCar } from '../../store/cars'
import { resetError } from '../../store/messages'

import Error from '../../shared/components/Error'

class CreateCar extends Component {
  constructor (props) {
    super(props)

    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  componentWillUnmount () {
    if (this.props.error) {
      this.props.resetError()
    }
  }

  handleFormSubmit ({make, model, year, engine, price, image, mileage}) {
    this.props.createCar({make, model, year, engine, price, image, mileage})
  }

  renderAlert () {
    if (this.props.error) {
      return (
        <Error error={this.props.error} />
      )
    }
  }

  render () {
    const {fields: {make, model, year, engine, price, image, mileage}, handleSubmit} = this.props

    return (
      <div>
        <h1>Create Car</h1>
        <div className='panel panel-default'>
          <div className='panel-body'>
            <form onSubmit={handleSubmit(this.handleFormSubmit)}>
              {this.renderAlert()}
              <div className='form-group'>
                <label>Make</label>
                <input type='text' className='form-control' placeholder='Make' {...make} />
                {make.touched && make.error && <div className='error'>{make.error} </div>}
              </div>

              <div className='form-group'>
                <label>Model</label>
                <input type='text' className='form-control' placeholder='Model' {...model} />
                {model.touched && model.error && <div className='error'>{model.error}</div>}
              </div>

              <div className='form-group'>
                <label>Year</label>
                <input type='text' className='form-control' placeholder='Year' {...year} />
                {year.touched && year.error && <div className='error'>{year.error}</div>}
              </div>

              <div className='form-group'>
                <label>Engine</label>
                <input type='text' className='form-control' placeholder='Engine' {...engine} />
                {engine.touched && engine.error && <div className='error'>{engine.error} </div>}
              </div>

              <div className='form-group'>
                <label>Price</label>
                <input type='text' className='form-control' placeholder='Price' {...price} />
                {price.touched && price.error && <div className='error'>{price.error} </div>}
              </div>

              <div className='form-group'>
                <label>Image</label>
                <input type='text' className='form-control' placeholder='Image' {...image} />
                {image.touched && image.error && <div className='error'>{image.error} </div>}
              </div>

              <div className='form-group'>
                <label>Mileage</label>
                <input type='text' className='form-control' placeholder='Mileage' {...mileage} />
              </div>

              <button type='submit' className='btn btn-default'>Create Car</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

function validate (values) {
  const errors = {}

  if (!values.make) {
    errors.make = 'Make is required'
  }

  if (!values.model) {
    errors.model = 'Model is required'
  }

  if (!values.year) {
    errors.year = 'Year is required'
  }

  if (!values.engine) {
    errors.engine = 'Engine is required'
  }

  if (!values.price) {
    errors.price = 'Price is required'
  }

  if (!values.image) {
    errors.image = 'Image is required'
  }

  return errors
}

const mapStateToProps = state => {
  return {
    error: state.messages.error
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({createCar, resetError}, dispatch)
}

export default reduxForm({
  form: 'CreateCar',
  fields: ['make', 'model', 'year', 'engine', 'price', 'image', 'mileage'],
  validate
})(connect(mapStateToProps, mapDispatchToProps)(CreateCar))
