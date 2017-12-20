/**
 * Created by Wojtek on 2017-12-20.
 */

import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Link,
    NavLink
} from 'react-router-dom';

import AppComponent from './AppComponent';
// import Details from './details/Details';
import About from './About/About';

// The Header creates links that can be used to navigate
// between routes.
const Header = () => (
    <header>


        <Router>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/About/About">About</Link>
                    </li>
                </ul>
                <Route path="/details"/>
                <Route path="/About/About" component={About}/>
                <Route path="/" component={AppComponent}/>
            </nav>
        </Router>

    </header>
)

export default Header
