/**
 * Created by Wojtek on 2017-10-19.
 */
import React from 'react';
import Stars from './StarsComponent';
import AddMovieComponent from './AddMovieComponent';
// import EventFilter from './FilterComponent';
import RatingButtonComponent from './RatingButtonComponent';

//Material UI Buttons
import FlatButton from 'material-ui/FlatButton';
//Material UI Dropdown
import RaisedButton from 'material-ui/RaisedButton';
import Popover, {PopoverAnimationVertical} from 'material-ui/Popover';
import ActionAndroid from 'material-ui/svg-icons/action/delete';
//Loader
import MDSpinner from 'react-md-spinner';


export default class MoviesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            ratings: [],
            open: false,
            newTitle: '',
            newPoster: '',
            imagePreviewUrl: ''
        };
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

    descendingSortBy(index) {
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
                <td><Stars movieId={el.id} movieTitle={el.title}/></td>
                <td>
                    <figure><img src={el.poster} style={styles.poster}/></figure>
                </td>
            </tr>
        )
    }

    // onFilterChange(event) {
    //     const value = event.currentTarget.value;
    //
    //     this.setState({
    //         filter:value
    //     })
    // }

    onTitleChange(event) {
        this.setState({
            newTitle: event.currentTarget.value
        })
    }

    onIdChange(event) {
        this.setState({
            newId: event.currentTarget.value
        })
    }

    onFormSubmit(event) {
        event.preventDefault();
        const {
            movies,
            newTitle
        } = this.state;
        const maxId = Math.max(...movies.map(el => el.id));

        movies.push({
            id: maxId + 1,
            title: newTitle,
            poster: ''
        });
        // const newMovie = {
        //     id: maxId + 1,
        //     title: newTitle,
        //     poster: ''
        // };
        // const updateMovies = [this.state.movies, ...newMovie];
        this.setState({
            movies
        })
    }

    onImageChange(event) {
        event.preventDefault();

        let reader = new FileReader();
        let file = event.target.files[0];

        reader.onloadend = () => {
            this.setState({
                newPoster: file,
                imagePreviewUrl: reader.result
            });
        };

        reader.readAsDataURL(file)
    }




    render() {
        const {movies} = this.state;



        //LOADER
        if (!this.state.movies.length) {
            return <MDSpinner className="spinner" size={100}/>
        }
        // if (!this.state.movies.length) {
        //     return  <CircularProgress className="spinner" size={100} thickness={15} />
        // }


        //IMAGE PREVIEW
        let {imagePreviewUrl} = this.state;
        let imagePreview = null;
        if (imagePreviewUrl) {
            imagePreview = (<img src={imagePreviewUrl} />);
        } else {
            imagePreview = (<div className="form-center">Please select an Image for Preview</div>);
        }


        return (
            <div className="list-wrapper">

                {/*<EventFilter*/}
                {/*filter={this.state.filter}*/}
                {/*onFilterChange={this.onFilterChange.bind(this)}/>*/}

                <AddMovieComponent
                    title={this.state.newTitle}
                     onTitleChange={this.onTitleChange.bind(this)}
                    onFormSubmit={this.onFormSubmit.bind(this)}
                    onImageChange={this.onImageChange.bind(this)}
                />
                <div className="img-preview">
                    {imagePreview}
                </div>

                <table className="table table-responsive table-hover table-sm">

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

                                    <svg onClick={() => this.descendingSortBy('id')}
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

                                    <svg onClick={() => this.descendingSortBy('title')}
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