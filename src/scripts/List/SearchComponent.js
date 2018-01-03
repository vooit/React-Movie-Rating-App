/**
 * Created by Wojtek on 2017-12-06.
 */
import React from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import PropTypes from 'prop-types';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentSearch from 'material-ui/svg-icons/device/location-searching';

export default class SearchField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showing: false
        }
    }

    handleSearchButton() {
        const {showing} = this.state;
        this.setState((prevState) => ({
            showing: !(prevState.showing)
        }))
    }

    render() {
        return (
            <form className="form-inline">
                <FloatingActionButton
                    className="translate-right on-top"
                    backgroundColor="#a4c639"
                    onClick={this.handleSearchButton.bind(this)}
                    mini={true}>
                    <ContentSearch /></FloatingActionButton>
                <input
                    style={{opacity: (this.state.showing ? '1' : '0')}}
                    value={this.props.filter}
                    onChange={this.props.onFilterChange}
                    type="text"
                    placeholder="search list"
                    className={(this.state.showing ? 'test, form-control transition' : '0, form-center transition')}/>
            </form>
        )
    }
}

SearchField.propTypes = {
    onFilterChange: PropTypes.func.isRequired,
    filter: PropTypes.string.isRequired
};