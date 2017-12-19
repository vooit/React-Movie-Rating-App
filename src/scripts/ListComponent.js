/**
 * Created by Wojtek on 2017-10-19.
 */
import React from 'react';
import LoaderWars from './LoaderComponent';
import AddMovieComponent from './AddMovieComponent';
import Stars from './StarsComponent';
import RatingButtonComponent from './RatingButtonComponent';
import SortButton from './SortButtonComponent';
import SearchField from './SearchComponent';
import PlayButton from './MusicPlayerComponent';
// import entryMusic from '../audio/star-wars-theme.mp3';

//Material UI Buttons
import FlatButton from 'material-ui/FlatButton';
import ActionAndroid from 'material-ui/svg-icons/action/delete';

export default class MoviesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            ratings: [],
            newTitle: '',
            newPoster: '',
            filter: '',
            showing: true,
            imagePreviewUrl: '',
            playing:false
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
            .then((movies, playing) => {
                console.log(movies);
                console.log(playing);
                this.setState({
                    movies
                });

            })
            .catch(function (err) {
                console.log(err);
            })
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
                <td>
                    <figure><img src={el.poster} style={styles.poster}/></figure>
                </td>
                <td><Stars movieId={el.id} movieTitle={el.title}/></td>
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
            </tr>
        )
    }

    //------------------------------------------------------

    //DELETE
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


    onFilterChange(event) {
        const value = event.currentTarget.value;
        console.log(value);
        this.setState({
            filter: value
        })
    }

    onTitleChange(event) {
        this.setState({
            newTitle: event.currentTarget.value
        })

    }

    //LOAD IMAGE
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
        reader.readAsDataURL(file);
    }

    //ADD NEW MOVIE TO THE LIST
    onFormSubmit(event) {
        event.preventDefault();
        const {
            movies,
            newTitle,
            imagePreviewUrl
        } = this.state;
        const maxId = Math.max(...movies.map(el => el.id));

        const newMovie = {
            id: maxId + 1,
            title: newTitle,
            poster: imagePreviewUrl
        };
        const updateMovies = [...movies, newMovie];
        this.setState({
            movies: updateMovies,
            imagePreviewUrl: '',
            newTitle: ''
        });
    };

    handlePlay(e) {
        e.preventDefault();
        console.log(this.state.playing);
        if (this.state.playing) {
            this.audio.pause();
            // this.audio.play();
           }
        else {
            this.audio.play();
        }
        this.setState(prevState => {
            return {
                playing: !prevState.playing
            }
        })
    }

    render() {


        const {movies} = this.state;
        //LOADER//
        if (!movies.length) {
            return <LoaderWars />
        }
        //IMAGE PREVIEW//
        let {imagePreviewUrl} = this.state;
        let imagePreview = null;
        if (imagePreviewUrl) {
            imagePreview = (<img src={imagePreviewUrl}/>);
        } else {
            imagePreview = (<div className="form-center">Please select an Image for Preview</div>);
        }
        //SEARCHFIELD//
        return (
            <div className="list-wrapper">
                <PlayButton onClick={this.handlePlay.bind(this)} playing = {this.state.playing}/>
                <audio id="audio" src="src/audio/star-wars-theme.mp3" ref={(audioTag) => {this.audio = audioTag}}/>
                <SearchField
                    filter={this.state.filter}
                    onFilterChange={this.onFilterChange.bind(this)}/>
                {/*<EventFilter/>*/}
                <AddMovieComponent
                    title={this.state.newTitle}
                    onTitleChange={this.onTitleChange.bind(this)}
                    onFormSubmit={this.onFormSubmit.bind(this)}
                    onImageChange={this.onImageChange.bind(this)}/>
                <div className="img-preview">
                    {imagePreview}
                </div>

                <table className="table table-responsive table-hover table-sm">
                    <thead className="thead-inverse">
                    <tr>
                        <th>ID
                            <SortButton
                                descendingSortBy={this.descendingSortBy.bind(this, 'id')}
                                ascendingSortBy={this.ascendingSortBy.bind(this, 'id')}/>
                        </th>
                        <th>TITLE</th>
                        <th>POSTER</th>
                        <th>RATE MOVIE</th>
                        <th>ACTION</th>
                        <th>GET RATING</th>
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