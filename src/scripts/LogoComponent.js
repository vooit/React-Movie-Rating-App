/**
 * Created by Wojtek on 2017-10-17.
 */
import React from 'react';
import logo from '../img/camera.png'

export default class LogoComponent extends React.Component {

    render() {
        const style = {
            width: '150px',
            margin: '0 auto',
            display: 'block'
        }
        return (
            <div>
                <img src="src/img/camera.png"  style={style}/>
            </div>
        )
    }
}