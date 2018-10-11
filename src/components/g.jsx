import React from 'react'
import { Progress, Button } from 'antd'


import { createStore } from '../redux'
import { Provider, connect } from '../react.redux'


const store = createStore((state, action) => {
    switch (action.type) {
        case 'decrement':
            return { count: state.count - 10 < 0 ? 0 : state.count - 10 }
        
        case 'increment':
            return { count: state.count + 10 > 100 ? 100 : state.count + 10 }

        default:
            return state || {
                count: 50
            }
    }
}, 

// middlewares.reverse().forEach(middleware => store.dispatch = middleware(store)(store.dispatch))
[
    function thunk(store) {
        return next => {
            return action => {
                if (typeof action === 'object') {
                    next(action)
                }
                if (typeof action === 'function') {
                    action(next)
                }
            }
        }
    },
    function logger(store) {
        return next => {
            return action => {
                console.log('prew state', store.getState())
                next(action); console.log(action)
                console.log('next state', store.getState())
            }
        }
    },
])


const UI = connect(state => state)(class extends React.Component {

    state = {
        count: 51
    }

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
        this.props.dispatch({ type: 'decrement' })
    }

    increment = () => {
        this.props.dispatch(function (dispatch) {
            setTimeout(() => {
                dispatch({ type: 'increment' })
            }, 1000)
        })
    }
})


export default class extends React.Component {
    render() {
        return (
            <Provider store={store}> 
                <UI />
            </Provider>
        )
    }
}