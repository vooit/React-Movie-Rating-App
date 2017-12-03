import React from "react";
import PropTypes from 'prop-types';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import {fullWhite} from 'material-ui/styles/colors';
import ContentAdd from 'material-ui/svg-icons/content/add';


const AddMovieComponent = (props) => {
    return (
        <form className="form-inline form-center" onSubmit={props.onFormSubmit}>
            <input type="file"/>
            <label className="sr-only" htmlFor="newItemInput">Add new movie</label>
            <input type="text"
                   className="form-control form-center"
                   id="newItemInput"
                   value={props.title}
                   placeholder="title"
                   onChange={props.onTitleChange}/>
            <FloatingActionButton type="submit" className="translate-left" mini={true}>
                <ContentAdd />
            </FloatingActionButton>
        </form>
    )
}

AddMovieComponent.propTypes = {
    title: PropTypes.string.isRequired,
    onIdChange: PropTypes.func.isRequired,
    onTitleChange: PropTypes.func.isRequired,
    onFormSubmit: PropTypes.func.isRequired
};


export default AddMovieComponent;