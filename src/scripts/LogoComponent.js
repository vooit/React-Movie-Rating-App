/**
 * Created by Wojtek on 2017-10-17.
 */
import React from 'react';
import logo from '../img/video-player.svg'

export default class LogoComponent extends React.Component {

    render() {
        const style = {
            width:'150px',
            margin: '0 auto',
            display: 'block'
        }
        return (
            <img src={logo} alt={"logo"} style={style}/>
        )
    }
}