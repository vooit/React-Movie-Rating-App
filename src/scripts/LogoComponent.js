/**
 * Created by Wojtek on 2017-10-19.
 */
import React from 'react';
import Logo from '../img/camera.png';

const LogoComponent = () => {
    const style = {
        width: '150px',
        margin: '0 auto',
        display: 'block'
    };
    return (
        <div>
            <caption>RATING MOVIE APP</caption>
            <img src="src/img/camera.png" style={style}/>
            <img src={Logo} style={style}/>
        </div>
    )
};

export default LogoComponent;
