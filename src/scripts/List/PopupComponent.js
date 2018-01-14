/**
 * Created by Wojtek on 2017-11-18.
 */
import React from  'react';
import PropTypes from 'prop-types';

import Paper from 'material-ui/Paper';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/remove';


class Popup extends React.Component {
    render() {
        const styles = {
            textCenter: {
                fontSize: '1.4rem',
                textAlign: 'center',
                fontWeight: '200',
                color: 'white'
            },
            buttonPos: {
                position: 'absolute',
                top: '-8px',
                right: '-8px'
            }
        };

        return (
            <Paper zDepth={4}>
                <div className='popup'>
                    <div className='popup__inner'>
                        <h1 style={styles.textCenter}>You 've rated &nbsp;{this.props.textTitle}
                            &nbsp;on&nbsp; {this.props.textRate}</h1>
                        <FloatingActionButton style={styles.buttonPos}
                                              secondary={true}
                                              mini={true}
                                              onClick={this.props.closePopup}><ContentAdd />
                        </FloatingActionButton>
                    </div>
                </div>
            </Paper>
        );
    }
}


Popup.propTypes = {
    textTitle: PropTypes.string,
    textRate: PropTypes.number,
    closePopup: PropTypes.func
};


export default Popup;