import React from "react";
import PropTypes from 'prop-types';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FileAdd from 'material-ui/svg-icons/image/add-a-photo';

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
            height: '100%',
            opacity: 0,
            zIndex: '100'
        },
        addField: {
            width: '100%',
            flexWrap: 'nowrap',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
        }
    };

    return (
        <div>

            <h4>Add new movie!</h4>
            <form className="form-inline"
                  onSubmit={props.onFormSubmit}>
                <FloatingActionButton
                    className="translate-right"
                    backgroundColor="#a4c639"
                    onChange={props.onImageChange}
                    mini={true}>
                    <input type="file"
                           style={styles.uploadInput}/>
                    <FileAdd/>
                </FloatingActionButton>
                <label htmlFor="newItemInput">{props.newTitleError}</label>
                <input type="text"
                       className="form-control"
                       id="newItemInput"
                       value={props.title}
                       placeholder="title"
                       onChange={props.onTitleChange}/>
                <FloatingActionButton
                    type="submit"
                    className="translate-left"
                    mini={true}>
                    <ContentAdd />
                </FloatingActionButton>
            </form>

        </div>

    )
};

AddMovieComponent.propTypes = {
    title: PropTypes.string.isRequired,
    onTitleChange: PropTypes.func.isRequired,
    onFormSubmit: PropTypes.func.isRequired
};

export default AddMovieComponent;