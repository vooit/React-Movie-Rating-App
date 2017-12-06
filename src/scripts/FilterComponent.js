/**
 * Created by Wojtek on 2017-12-03.
 */
import React from "react";
import PropTypes from 'prop-types';
const EventFilter = (props) => {


    return (
        <form>
            <input type="text" placeholder="filter list..." value={props.filter} onChange={props.onFilterChange}/>
        </form>
    )
};


EventFilter.propTypes = {
    filter: PropTypes.string.isRequired,
    onFilterChange: PropTypes.func.isRequired
}

export default EventFilter;