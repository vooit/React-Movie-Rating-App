import React from "react";
import PropTypes from 'prop-types';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FileAdd from 'material-ui/svg-icons/content/create';
// import FlatButton from 'material-ui/FlatButton';


const AddMovieComponent = (props) => {

    const styles = {
        uploadInput: {
            cursor: 'pointer',
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            width: '100%',
            opacity: 0,
        }
    };

    return (
        <form className="form-inline form-center"
              // ref={input => this.addForm = input}
              onSubmit={props.onFormSubmit}>
            <FloatingActionButton
                className="translate-right"
                backgroundColor="#a4c639"
                // hoverColor="#8AA62F"
                onChange={props.onImageChange}
                mini={true}
            >
                <input type="file" style={styles.uploadInput}/>
                <FileAdd/>
            </FloatingActionButton>


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
};

AddMovieComponent.propTypes = {
    title: PropTypes.string.isRequired,
    onTitleChange: PropTypes.func.isRequired,
    onFormSubmit: PropTypes.func.isRequired
};


export default AddMovieComponent;