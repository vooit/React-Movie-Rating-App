/**
 * Created by Wojtek on 2017-12-06.
 */
import React from 'react';

// const SearchField = (props) => {
//     return (
//         <div>
//             <button onClick={props.handleLoopButton}>toggle</button>
//             <div style={{display: (props.showForm ? 'block' : 'none')}}>This is visible</div>
//         </div>
//     )
// };
//
//
// export default SearchField;


export default class SearchField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showing: true
        }
    }

    render() {
        const {showing} = this.state;
        return (
            <div>
                <button onClick={() => this.setState({showing: !showing})}>toggle</button>
                <div style={{display: (showing ? 'block' : 'none')}}>This is visible</div>

            </div>
        )
    }
}