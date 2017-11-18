/**
 * Created by Wojtek on 2017-10-19.
 */

import React from 'react';
// import classNames from 'classnames';
import AddMovieComponent from './AddMovieComponent'
import Stars from './StarsComponent';
import RatingButtonComponent from './RatingButtonComponent';

//Material UI Buttons
import FlatButton from 'material-ui/FlatButton';
//Material UI Dropdown
import RaisedButton from 'material-ui/RaisedButton';
import Popover, {PopoverAnimationVertical} from 'material-ui/Popover';
import ActionAndroid from 'material-ui/svg-icons/action/delete';
import MDSpinner from 'react-md-spinner';

// ADD MOVIE COMPONENT
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentRefresh from 'material-ui/svg-icons/content/undo'
import {fullWhite} from 'material-ui/styles/colors'
import ContentAdd from 'material-ui/svg-icons/content/add'

export default class MoviesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            ratings: [],
            open: false,
            message: ''
        };
        this.compareBy.bind(this);
        this.ascendingSortBy.bind(this);
    }

    getMovies() {
        return fetch('https://movie-ranking.herokuapp.com/movies.json', {
            method: 'get',
            dataType: 'json',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache'
            }
        })
    }

    // FETCH API
    componentDidMount() {
        this.getMovies()
            .then((Response) => Response.json())
            .then((movies) => {
                console.log(movies);
                this.setState({
                    movies
                });

            })
            .catch(function (err) {
                console.log(err);
            })
    }

    //Material UI - handlers
    handleTouchTap(event) {
        event.preventDefault();
        this.setState({
            open: true,
            anchorEl: event.currentTarget
        });
    };

    handleRequestClose() {
        this.setState({
            open: false
        });
    };

    //--------------------------//
    onDeleteClick(movieId, e) {
        e.preventDefault();
        const filterMovies = this.state.movies.filter(v => v.id !== movieId);
        this.setState({
            movies: filterMovies
        })
    }

    //SORTING
    compareBy(index) {
        return (a, b) => {
            if (a[index] < b[index]) return -1;
            if (a[index] > b[index]) return 1;
            return 0;
        };
    }

    desendingSortBy(index) {
        let arrayCopy = [...this.state.movies];
        let sortedArray = arrayCopy.sort(this.compareBy(index));
        let reversedCopy = sortedArray.reverse();
        this.setState({movies: reversedCopy});
    }

    ascendingSortBy(index) {
        let arrayCopy = [...this.state.movies];
        arrayCopy.sort(this.compareBy(index));
        this.setState({movies: arrayCopy});
    }

    //TABLE RENDER
    renderMoviesList() {
        const styles = {
            buttonColor: {
                cursor: 'pointer',
                color: 'white',
                fontWeight: '400',
                fontSize: '10px'
            },
            poster: {
                width: '100px',
                margin: '10px 5px 0px 5px'
            }
        };

        return this.state.movies.map((el, index) =>
            <tr key={index} className="table-hover">
                <td>#{el.id}</td>
                <td>{el.title}</td>
                <td>{/*DELETE ACTION*/}
                    <FlatButton
                        label="DELETE"
                        labelPosition="before"
                        icon={<ActionAndroid />}
                        backgroundColor="rgb(0, 188, 212)"
                        hoverColor="rgb(33, 150, 243)"
                        secondary={true}
                        style={styles.buttonColor}
                        onClick={this.onDeleteClick.bind(this, el.id)}
                    />
                </td>
                <td>
                    <RatingButtonComponent movieId={el.id}/>
                </td>
                <td><Stars movieId={el.id}/></td>
                <td>
                    <figure><img src={el.poster} style={styles.poster}/></figure>
                </td>
            </tr>
        )
    }


    //ADD MOVIE COMPONENT
    addMovie(e) {
        e.preventDefault();
        const {movies} = this.state;
        const newMovie = {
            // id: '1',
            title: this.newItem.value
            // poster: ''
        };
        const isOnTheList = movies.includes(newMovie.title);

        if (isOnTheList) {
            console.log('zajete');
        } else if (newMovie !== '') {
            console.log('puste');
        }


        console.log(newMovie.title);
        // console.log(newMovie);
        const updateMovies = [...this.state.movies, newMovie];
        this.addForm.reset();
        this.setState({
            movies: updateMovies
        })
    }


    render() {
        const {movies, message} = this.state;

        if (!this.state.movies.length) {
            return <MDSpinner className="spinner" size={100}/>
        }


        return (
            <div className="list-wrapper">
                {/*<AddMovieComponent />*/}

                <form className="form-inline form-center"
                      onSubmit={(e) => this.addMovie(e)}
                      ref={input => this.addForm = input}>

                    <div className="form-group">
                        <label className="sr-only" htmlFor="newItemInput">Add new movie</label>

                        <input ref={(input) => {
                            this.newItem = input
                        }} type="text" placeholder="enter movie"
                               className="form-control form-center" id="newItemInput"/>
                        <FloatingActionButton type="submit" className="translate-left" mini={true}
                                              icon={<ActionAndroid color={fullWhite}/>}>
                            <ContentAdd />
                        </FloatingActionButton>
                    </div>

                </form>


                <table className="table table-responsive table-hover table-sm">
                    {
                        message !== '' && <p className="message text-danger">{message}</p>
                    }

                    <thead className="thead-inverse">
                    <tr>
                        <th>ID
                            <div>
                                <RaisedButton
                                    onClick={this.handleTouchTap.bind(this)}
                                    label="SORT BY ID"/>
                                <Popover
                                    open={this.state.open}
                                    anchorEl={this.state.anchorEl}
                                    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                                    targetOrigin={{horizontal: 'left', vertical: 'top'}}
                                    onRequestClose={this.handleRequestClose.bind(this)}
                                    animation={PopoverAnimationVertical}>
                                    <svg
                                        onClick={() => this.ascendingSortBy('id')}
                                        className="rotate180"
                                        xmlns="http://www.w3.org/2000/svg" width="20"
                                        height="20"
                                        viewBox="0 0 20 20">
                                        <path d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z"
                                              fill="black"/>
                                    </svg>

                                    <svg onClick={() => this.desendingSortBy('id')}
                                         xmlns="http://www.w3.org/2000/svg" width="20"
                                         height="20"
                                         viewBox="0 0 20 20">
                                        <path d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z"
                                              fill="red"/>
                                    </svg>

                                </Popover>
                            </div>
                        </th>
                        <th>TITLE
                            <div>
                                <RaisedButton
                                    onClick={this.handleTouchTap.bind(this)}
                                    label="SORT BY TITLE"/>
                                <Popover
                                    open={this.state.open}
                                    anchorEl={this.state.anchorEl}
                                    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                                    targetOrigin={{horizontal: 'left', vertical: 'top'}}
                                    onRequestClose={this.handleRequestClose.bind(this)}
                                    animation={PopoverAnimationVertical}>
                                    <svg onClick={() => this.ascendingSortBy('title')}
                                         className="rotate180"
                                         xmlns="http://www.w3.org/2000/svg"
                                         width="20"
                                         height="20"
                                         viewBox="0 0 24 24">
                                        <path d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z"
                                              fill="black"/>
                                    </svg>

                                    <svg onClick={() => this.desendingSortBy('title')}
                                         xmlns="http://www.w3.org/2000/svg" width="20"
                                         height="20"
                                         viewBox="0 0 24 24">
                                        <path
                                            d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z"
                                            fill="red"/>
                                    </svg>
                                </Popover>
                            </div>
                        </th>
                        <th>ACTION</th>
                        <th>GET RATING</th>
                        <th>RATE MOVIE</th>
                        <th>POSTER</th>
                    </tr>
                    </thead>
                    <tbody>
                    { this.renderMoviesList() }
                    </tbody>
                </table>
            </div>
        )
    }
}