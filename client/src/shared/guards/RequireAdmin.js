import React, { Component } from 'react'
import { connect } from 'react-redux'

export default function (ComposedComponent) {
    class Authentication extends Component {
        static contextTypes = {
            router: React.PropTypes.object
        }

        componentWillMount() {
            if (!this.props.authenticated || !this.props.currentUser.roles.includes('Admin')) {
                this.context.router.push('/')
            }
        }

        componentWillUpdate(nextProps) {
            if (!nextProps.authenticated || nextProps.currentUser.roles.includes('Admin')) {
                this.context.router.push('/')
            }
        }

        render() {
            return <ComposedComponent {...this.props} />
        }
    }

    function mapStateToProps(state) {
        return { authenticated: state.authentication.authenticated, currentUser: state.authentication.currentUser }
    }

    return connect(mapStateToProps)(Authentication)

}





