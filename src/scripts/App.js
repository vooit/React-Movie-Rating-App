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
// import Details from './details/Details';


const App = () => {
    return (
        <Router>
            <div>
                <Route path="/" component={AppComponent}/>
            </div>
        </Router>
    )
}
export default App;