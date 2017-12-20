/**
 * Created by Wojtek on 2017-12-18.
 */
import React from 'react';

import {
    BrowserRouter as Router,
    Route,
    Link,
    NavLink
} from 'react-router-dom';

import AppComponent from './AppComponent';
// import Details from './details/Details';
import About from './About/About';

const App = () => {
    return (
        <Router>
            <div>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/About/About">About</Link>
                    </li>
                </ul>

                <Route path="/About/About" component={About}/>
                <Route exact path="/" component={AppComponent}/>
            </div>
        </Router>
    )
}
export default App;