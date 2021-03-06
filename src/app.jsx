import Style from './app.less'
import React from 'react'
import { A, B, C, D, E, F, G, Welcome } from './components'
import { BrowserRouter, NavLink, Switch, Route } from 'react-router-dom'


export default class extends React.Component {
    render() {
        return (
            <BrowserRouter children={
                <div className={Style.container}>
                    <div className={Style.__navbar__}>
                        <NavLink activeClassName={Style.__active__} to="/1">场景 1</NavLink>
                        <NavLink activeClassName={Style.__active__} to="/2">场景 2</NavLink>
                        <NavLink activeClassName={Style.__active__} to="/3">场景 3</NavLink>
                        <NavLink activeClassName={Style.__active__} to="/4">场景 4</NavLink>
                        <NavLink activeClassName={Style.__active__} to="/5">场景 5</NavLink>
                        <NavLink activeClassName={Style.__active__} to="/6">场景 6</NavLink>
                        <NavLink activeClassName={Style.__active__} to="/7">演示 7</NavLink>
                    </div>
                    <div className={Style.__container__}>
                        <Switch>
                            <Route exact path="/1" component={A} />
                            <Route exact path="/2" component={B} />
                            <Route exact path="/3" component={C} />
                            <Route exact path="/4" component={D} />
                            <Route exact path="/5" component={E} />
                            <Route exact path="/6" component={F} />
                            <Route exact path="/7" component={G} />
                            <Route component={Welcome} />
                        </Switch>
                    </div>
                </div>
            } />
        )
    }
}
