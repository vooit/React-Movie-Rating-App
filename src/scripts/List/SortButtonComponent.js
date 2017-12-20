/**
 * Created by Wojtek on 2017-12-05.
 */
import React from 'react';

const SortButton = (props) => {
    return (
        <div>
            <svg
                onClick={props.ascendingSortBy}
                className="rotate180"
                xmlns="http://www.w3.org/2000/svg" width="20"
                height="20"
                viewBox="0 0 20 20">
                <path d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z"
                      fill="white"/>
            </svg>
            <svg
                onClick={props.descendingSortBy}
                xmlns="http://www.w3.org/2000/svg" width="20"
                height="20"
                viewBox="0 0 20 20">
                <path d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z"
                      fill="red"/>
            </svg>
        </div>
    )
};

export default SortButton;

