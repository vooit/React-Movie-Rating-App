/**
 * Created by Wojtek on 2017-12-10.
 */
import React from 'react';

const PlayButton = (props) => {
    const styles = props.playing ? 'play active' : 'play';
    return <a onClick={props.onClick} href="#" title="Play video" className={styles}/>;
};

export default PlayButton;