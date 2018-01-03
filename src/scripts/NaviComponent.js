/**
 * Created by Wojtek on 2017-12-18.
 */
import React from 'react';

import {
    BrowserRouter as Router,
    Route,
    NavLink
} from 'react-router-dom';

import AppComponent from './AppComponent';
import About from './About/About';

const NavHeader = () => {
    return (
        <Router>
            <div>
                <div className="navi">
                    <div className="container">


                        <div className="navi__logo">
                            <img src="src/img/Star_Wars_Logo.png"/>

                        </div>
                        <ul className="navi__list">
                            <li>
                                <NavLink activeClassName="active" to="/">Home</NavLink>
                            </li>
                            <li>
                                <NavLink
                                    activeClassName="active"
                                    to="/About/About">About</NavLink>
                            </li>
                        </ul>
                    </div>

                </div>
                <Route exact path="/" component={AppComponent}/>
                <Route path="/About/About" component={About}/>

            </div>
        </Router>
    )
}
export default NavHeader;