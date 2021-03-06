import React from 'react'
import { Progress, Button } from 'antd'



// redux
import { combineReducers } from '../combineReducers'
import { createStore } from '../redux'
import { connect, Provider } from '../react.redux'



// fetch
const fetch = function (action) {
    return dispatch => {
        clearTimeout(window.timeId) || (window.timeId = setTimeout(() => dispatch(action), 1000))
    }
}



// stroe
const store = createStore(combineReducers({
    f: (state, action) => {
        switch (action.type) {
            case 'f_decrement':
                return { count: state.count - 10 < 0 ? 0 : state.count - 10 }
            
            case 'f_increment':
                return { count: state.count + 10 > 100 ? 100 : state.count + 10 }
            
            default:
                return state || { count: 50 }
        }
    },
    g: (state, action) => {
        switch (action.type) {
            case 'g_decrement':
                return { count: state.count - 10 < 0 ? 0 : state.count - 10 }
            
            case 'g_increment':
                return { count: state.count + 10 > 100 ? 100 : state.count + 10 }
            
            default:
                return state || { count: 50 }
        }
    },
}),



// middlewares
[
    function thunk() {
        return ({ dispatch, getState }) => {
            return next => {
                return action => {
                    if (typeof action === 'object') next(action)
                    if (typeof action === 'function') action(dispatch, getState)
                }
            }
        }
    },
    function logger() {
        return ({ dispatch, getState }) => {
            return next => {
                return action => {
                    console.log('%c prev state', 'color: #666666; font-weight: 700;', getState())
                    next(action); console.log('%c action    ', 'color: #40a9ff; font-weight: 700;', action)
                    console.log('%c next state', 'color: #009a61; font-weight: 700;', getState())
                }
            }
        }
    },
])



// Sub Component
const UI = connect(state => state.g)(class extends React.Component {
    render() {
        return (
            <div>
                <Progress type="circle" percent={this.props.count} />&nbsp;&nbsp;
                <Button.Group>
                    <Button icon="minus" onClick={this.decrement} />
                    <Button icon="plus" onClick={this.increment} />
                </Button.Group>
            </div>
        )
    }

    decrement = () => {
        this.props.dispatch({ type: 'g_decrement' })
    }

    increment = () => {
        this.props.dispatch(fetch({ type: 'g_increment' }))
    }
})



// Par Component
export default class extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <UI />
            </Provider>
        )
    }
}