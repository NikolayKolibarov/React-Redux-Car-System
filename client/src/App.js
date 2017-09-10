import React, { Component } from 'react'

import Master from './layouts/master/Master'

export default class App extends Component {
  render () {
    return (
      <div>
        <Master routes={this.props.children} />
      </div>
    )
  }
}
