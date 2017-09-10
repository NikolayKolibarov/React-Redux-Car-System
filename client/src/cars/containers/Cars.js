import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { fetchCars } from '../../store/cars'

import CarSearchBar from './CarSearchBar'
import CarsList from '../components/CarsList'
import Paginator from '../../shared/components/Paginator'

class Cars extends Component {
  constructor (props) {
    super(props)

    this.previousPage = this.previousPage.bind(this)
    this.nextPage = this.nextPage.bind(this)

    this.state = {
      page: 1,
      searchInput: ''
    }
  }

  componentDidMount () {
    this.props.fetchCars(this.state.page)
  }

  componentWillUpdate (nextProps, nextState) {
    if (this.state.page !== nextState.page) {
      if (this.state.searchInput.trim() === '') {
        this.props.fetchCars(nextState.page)
      }
    }
  }

  onSearch (searchStr) {
    this.setState({
      searchInput: searchStr
    })
  }

  previousPage () {
    if (this.state.page > 1) {
      this.setState((prevState, props) => ({
        page: prevState.page - 1
      }))
    }
  }

  nextPage () {
    this.setState((prevState, props) => ({
      page: prevState.page + 1
    }))
  }

  renderCars () {
    if (this.state.searchInput.trim() === '') {
      return (
        <CarsList cars={this.props.cars} />
      )
    } else {
      return (
        <CarsList cars={this.props.searchResults} />
      )
    }
  }

  render () {
    return (
      <div>
        <h1>Cars</h1>
        <CarSearchBar page={this.state.page} onSearch={this.onSearch.bind(this)} />
        {this.renderCars()}
        <Paginator
          page={this.state.page}
          items={this.state.searchInput.trim() === '' ? this.props.cars : this.props.searchResults}
          previousPage={this.previousPage}
          nextPage={this.nextPage} />
        <br />
      </div>
    )
  }
}

function mapStateToProps (state) {
  return { cars: state.cars.all, searchResults: state.cars.searchResults }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({fetchCars}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Cars)
