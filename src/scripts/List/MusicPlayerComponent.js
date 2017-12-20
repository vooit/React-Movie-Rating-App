/**
 * Created by Wojtek on 2017-12-10.
 */
import React from 'react';

const PlayButton = (props) => {
    const styles = props.playing ? 'play active' : 'play';
    return <div className="player-wrapper">

            <a onClick={props.onClick} href="#" title="Play video" className={styles}/>

        <p className="player-text">{props.playing ? 'stop' : 'play'}&nbsp;theme music</p>
    </div>;

};

export default PlayButton;