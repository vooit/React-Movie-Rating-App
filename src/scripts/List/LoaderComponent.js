/**
 * Created by Wojtek on 2017-12-04.
 */

import React from 'react';


const LoaderWars = () => {
    return (
        <div>
            <div className="starwars-loader">
                <img src="src/img/star.svg" className="star"/>
                <img src="src/img/wars.svg" className="wars"/>
                <h2 className="byline" id="byline">The Force Awakens</h2>
            </div>
        </div>
    )
};

export default LoaderWars;
