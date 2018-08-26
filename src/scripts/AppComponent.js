import React from 'react';
import MoviesList from "./List/ListComponent";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Glitch from './GlitchComponent/Glitch';

export default class App extends React.Component {
    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <Glitch/>
                    <div className="movies-list ">
                        <MoviesList/>
                    </div>
                </div>
            </MuiThemeProvider>
        )
    }
}
