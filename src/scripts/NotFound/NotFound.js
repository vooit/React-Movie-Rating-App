/**
 * Created by Wojtek on 2018-03-11.
 */
import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';



const NotFound = () => {
    const styles = {
        notFound: {
            padding: '10%'
        },
        center: {
          textAlign:'center'
        }
        
    }

    return (
        <MuiThemeProvider>
            <div className="container" style={styles.notFound}>
                <Paper zDepth={4}>
                    <h1 style={styles.center}>NOT FOUND</h1>
                    <h2 style={styles.center}>404</h2>
                </Paper>
            </div>
        </MuiThemeProvider>
    )
}
export default NotFound;