import React, { Component } from 'react'

import requester from './shared/requester'

export default class Home extends Component {
  constructor (props) {
    super(props)

    this.state = {
      cars: 0,
      users: 0
    }
  }

  componentDidMount () {
    this.fetchStats()
  }

  fetchStats () {
    requester
      .get('http://localhost:5000/stats', false)
      .then(response => {
        console.log(response)
        this.setState({
          cars: response.data.cars,
          users: response.data.users
        })
      })
  }

  render () {
    return (
      <div>
        <h1>Welcome to Car System!</h1>
        <div className='panel panel-default'>
          <div className='panel-heading'>Stats</div>
          <div className='panel-body'>
            <p>
              Cars: <strong>{this.state.cars}</strong>
            </p>
            <p>
              Users: <strong>{this.state.users}</strong>
            </p>
          </div>
        </div>
      </div>
    )
  }
}
