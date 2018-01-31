/**
 * Created by Wojtek on 2017-12-20.
 */
import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';

const About = () => {
    const styles = {
        about: {
            padding: '30px'
        },
        logo: {
            width: '150px',
            margin: '0 auto',
            display: 'block'
        },
        caption: {
            paddingTop: '0.75rem',
            paddingBottom: '0.75rem',
            color: '#636c72',
            width: '100%',
            textAlign: 'center',
            display: 'block',
            captionSide: 'bottom'
        }
    };
    return (
        <MuiThemeProvider>
            <div className="container">
                <Paper zDepth={4} className="About"
                       style={styles.about}>
                    <h1 style={styles.caption}>RATING MOVIE APP</h1>
                    <img src="../src/img/camera.png" style={styles.logo}/>
                    <h2>It's a simple CRUD app build on React and React-Router 4,
                        with using:
                    </h2>
                    <ul>
                        <li>FETCH api</li>
                        <li>Material UI</li>
                        <li>Classnames</li>
                        <li> Features : <br/>
                            add new item with attach / filter / sort asc/desc / delete / rate / get
                            avarage rate
                        </li>
                    </ul>
                </Paper>
            </div>
        </MuiThemeProvider>
    )
};

export default About;
