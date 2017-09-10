import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { searchCars, resetSearch } from '../../store/cars'

class CarSearchBar extends Component {
  constructor (props) {
    super(props)

    this.state = { searchInput: '' }

    this.onSearchInputChange = this.onSearchInputChange.bind(this)
  }

  componentWillUpdate (nextProps, nextState) {
    if (this.props.page !== nextProps.page) {
      if (this.state.searchInput.trim() !== '') {
        this.props.searchCars(this.state.searchInput, nextProps.page)
      }
    }
  }

  componentWillUnmount () {
    this.props.resetSearch()
    this.setState({ searchInput: '' })
  }

  onSearchInputChange (e) {
    this.setState({ searchInput: e.target.value })
    this.props.onSearch(e.target.value)

    if (e.target.value.trim() !== '') {
      this.props.searchCars(e.target.value.trim(), this.props.page)
    } else {
      this.props.resetSearch()
    }
  }

  render () {
    return (
      <div className='panel panel-default'>
        <div className='panel-body'>
          <h2>Car Search</h2>
          <form>
            <div className='form-group'>
              <input
                type='text'
                className='form-control'
                value={this.state.searchInput}
                onChange={this.onSearchInputChange}
                placeholder='Search for a car...' />
            </div>
          </form>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({searchCars, resetSearch}, dispatch)
}

export default connect(null, mapDispatchToProps)(CarSearchBar)
