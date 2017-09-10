import React, { Component } from 'react'

export default class Paginator extends Component {
  hasPreviousPage () {
    return this.props.page > 1
  }

  hasNextPage () {
    return this.props.items.length > 0
  }

  renderPaginator () {
    const prevPageBtn = <button className='btn btn-default' onClick={this.props.previousPage} disabled={!this.hasPreviousPage()}>&lt;</button>
    const nextPageBtn = <button className='btn btn-default' onClick={this.props.nextPage} disabled={!this.hasNextPage()}>&gt;</button>

    return (
      <div>
        {this.props.page}
        {prevPageBtn}
        {nextPageBtn}
      </div>
    )
  }

  render () {
    return (
      <div>
        {this.renderPaginator()}
      </div>
    )
  }
}
