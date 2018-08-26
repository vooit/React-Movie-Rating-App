import React from "react";

const FavoriteList = (props) => {

    return (
        <div className="text-white">
            <ul>
                {props.favorites.map((item, index) => {
                    return (
                        <li key={index}
                            className="text-white"
                            onClick={() => {
                                props.favItemremover()
                            }}>
                            {item.title} (
                            <span className="text-white">
                                - </span>)
                        </li>
                    )
                })}
            </ul>
        </div>
    )
};

export default FavoriteList;