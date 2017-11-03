import React from 'react';
import Stars from './RatingComponent';
import RatingButtonComponent from './RatingButtonComponent';
// import experimental from './experimental';
import classNames from 'classnames';

//Material UI Buttons
import FlatButton from 'material-ui/FlatButton';
// import TextField from 'material-ui/TextField';


//Material UI Dropdown
import RaisedButton from 'material-ui/RaisedButton';
import Popover, {PopoverAnimationVertical} from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import AddMovieComponent from './AddMovieComponent'
import ActionAndroid from 'material-ui/svg-icons/action/delete'


// TO DO
// get movie id na rating -> POST
// fetch POST
// get avarage onClick


export default class MoviesList extends React.Component {
    constructor() {
        super();
        this.state = {
            movies: [],
            ratings: [],
            open: false
        };
        this.compareBy.bind(this);
        this.ascendingSortBy.bind(this);
    }

    getRatingUrl(id) {
        return `https://movie-ranking.herokuapp.com/movies/${id}/ratings`;
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
            .then((movies, initialMovies) => {
                console.log(movies);
                this.setState({
                    movies
                });

            })
            .catch(function (err) {
                console.log(err);
            })
    }


    getMovieRating(id, rating) {
        fetch(this.getRatingUrl(id), {
            method: 'get',
            dataType: 'json',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache'
            }
        }).then(response => response.json())
            .then(ratings => {
                this.setState({
                    ratings
                })
                // console.log(this.state.ratings)
            })
            .catch(function (err) {
                console.log(err, 'rating not defined');
            })
    }

    //Material UI - handlers
    handleTouchTap(event) {
        // This prevents ghost click.
        event.preventDefault();

        this.setState({
            open: true,
            anchorEl: event.currentTarget
        });
    };

    handleRequestClose (){
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

    //DISPPLAY RATINGS OF CLICKED ID ????????????
    renderAvarage() {
        let ratings = this.state.ratings;
        let avarageRating = ratings.reduce((prev, next) => {
            console.log(prev);   //   wyswietla kolejne zliczone sumy po iteracji
            // console.log(next.rating); //wyswietla kolejne wartosci rating
            return prev + next.rating
        }, 0);
        let digitRating = (avarageRating / ratings.length).toFixed(0);
        return <p className={classNames({
            'red': false,
            'green': true,
        })}>{digitRating}</p>
    }

    renderMoviesList() {
        const styles = {
            button: {
                margin: 12,
            },
            buttonColor: {
                cursor: 'pointer',
                color: 'white'
            },
            poster: {
                width: '200px',
                margin: '10px 5px 0px 5px'
            },
            redText: {
                color: 'rgb(255, 64, 129)'
            },
            textField: {
                margin: '0 0 10px 0'
            },

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
                    <RatingButtonComponent movieId={el.id} />
                </td>
                <td><Stars/></td>
                <td>
                    <figure><img src={el.poster} style={styles.poster}/></figure>
                </td>
            </tr>
        )
    }

    render() {
        return (
            <div className="container">

                <AddMovieComponent movies={this.state.movies} />

                <table className="table table-responsive table-hover table-sm">
                    <thead className="thead-inverse">
                    <tr>
                        <th>ID
                            <svg
                                onClick={() => this.ascendingSortBy('id')}
                                className="rotate180"
                                xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                viewBox="0 0 24 24">
                                <path d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z"
                                      fill="white"/>
                            </svg>
                            <svg onClick={() => this.desendingSortBy('id')}
                                 xmlns="http://www.w3.org/2000/svg" width="24"
                                 height="24"
                                 viewBox="0 0 24 24">
                                <path d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z" fill="red"/>
                            </svg>
                            <div>
                                <RaisedButton
                                    onClick={this.handleTouchTap.bind(this)}
                                    label="SORT BY ID"
                                />
                                <Popover
                                    open={this.state.open}
                                    anchorEl={this.state.anchorEl}
                                    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                                    targetOrigin={{horizontal: 'left', vertical: 'top'}}
                                    onRequestClose={this.handleRequestClose.bind(this)}
                                    animation={PopoverAnimationVertical}
                                >
                                    <Menu>
                                        <MenuItem primaryText="Refresh" />
                                        <MenuItem primaryText="Help &amp; feedback" />

                                    </Menu>
                                </Popover>
                            </div>
                        </th>
                        <th>TITLE
                            <span>
                                <svg onClick={() => this.ascendingSortBy('title')}
                                     className="rotate180"
                                     xmlns="http://www.w3.org/2000/svg"
                                     width="24"
                                     height="24"
                                     viewBox="0 0 24 24">
                                <path d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z"
                                      fill="white"/>
                                </svg>
                            </span>

                            <span>
                                <svg onClick={() => this.desendingSortBy('title')}
                                     xmlns="http://www.w3.org/2000/svg" width="24"
                                     height="24"
                                     viewBox="0 0 24 24">
                                <path
                                    d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z"
                                    fill="red"/></svg></span>
                        </th>
                        <th>ACTION</th>
                        <th>GET RATING</th>
                        <th>GIVE RATING</th>
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

