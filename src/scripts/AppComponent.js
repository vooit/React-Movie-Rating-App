/**
 * Created by Wojtek on 2017-10-19.
 */

import React from 'react';
import MoviesList from "./List/ListComponent";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';

export default class App extends React.Component {
    render() {
        return (
            <MuiThemeProvider>
                <div className="container">
                    <Paper zDepth={4} className="movies-list">
                        <MoviesList/>
                    </Paper>
                </div>
            </MuiThemeProvider>
        )
    }
}
