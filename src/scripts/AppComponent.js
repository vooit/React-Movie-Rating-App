import React from 'react';
import MoviesList from "./ListComponent";
import LogoComponent from "./LogoComponent";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';


export default class App extends React.Component {
    render() {
        return (
            <MuiThemeProvider>
                <div className="container">
                    <caption>RATING MOVIE APP</caption>
                    <LogoComponent/>
                    <Paper zDepth={4}>
                        <MoviesList/>
                    </Paper>
                
                </div>
            </MuiThemeProvider>
        )
    }
}
