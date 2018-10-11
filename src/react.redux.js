import React from 'react'
import Types from 'prop-types'


export class Provider extends React.Component {

    static childContextTypes = {
        store: Types.object
    }

    getChildContext() {
        return {
            store: this.props.store
        }
    }

    render() {
        return this.props.children
    }
}


export function connect(mapStateToProps) {
    return function (Component) {
        return class extends React.Component {
            static contextTypes = {
                store: Types.object
            }

            render() {
                return (
                    <Component />
                )
            }
        }
    }
}