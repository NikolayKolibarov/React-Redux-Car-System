import React, { Component } from 'react'

import Header from './Header'
import Footer from './Footer'

export default class Master extends Component {
  render () {
    return (
      <div>
        <Header />
        <div className='main-content container'>
          <div className='row'>
            <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
              {this.props.routes}
            </div>
          </div>
        </div>
        <Footer />
      </div>

    )
  }
}
