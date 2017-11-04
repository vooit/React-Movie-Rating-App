/**
 * Created by Wojtek on 2017-11-04.
 */
import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Popover, {PopoverAnimationVertical} from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';


export default class TableHeaderComponent extends React.Component {


    //Material UI - handlers
    handleTouchTap(event) {
        // This prevents ghost click.
        event.preventDefault();

        this.setState({
            open: true,
            anchorEl: event.currentTarget
        });
    };

    handleRequestClose() {
        this.setState({
            open: false
        });
    };


    render() {


        return (
            <thead className="thead-inverse">
            dfgdsgsgs
            </thead>
        )
    }
}
