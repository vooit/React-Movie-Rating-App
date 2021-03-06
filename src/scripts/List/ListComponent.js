import React from 'react';
import LoaderWars from './LoaderComponent';
import AddMovieComponent from './AddMovieComponent';
import Stars from './StarsComponent';
import RatingButtonComponent from './RatingButtonComponent';
import SortButton from './SortButtonComponent';
import SearchField from './SearchComponent';
import PlayButton from './PlayerComponent';
import FavoriteList from './FavoriteListComponent';

//Material UI Buttons
import ActionAndroid from 'material-ui/svg-icons/action/delete';
import FloatingActionButton from 'material-ui/FloatingActionButton';

export default class MoviesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            ratings: [],
            favorites: [],
            newTitle: '',
            newTitleError: '',
            newPoster: '',
            filter: '',
            imagePreviewUrl: '',
            playing: false,
            showingPanel: false
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
                this.setState({
                    movies
                });

            })
            .catch(function (err) {
                console.log(err);
            })
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

    validate() {
        let isError = false;
        const errors = {};

        if (this.state.newTitle.length < 5) {
            isError = true;
            errors.titleErrorMessage = "Title needs to be at least 5 characters long";
        }

        return isError;
    };


    //ADD NEW MOVIE TO THE LIST
    onFormSubmit(event) {
        event.preventDefault();
        const err = this.validate();

        if (!err) {
            const {
                movies,
                newTitle,
                imagePreviewUrl
            } = this.state;
            // generate new unique id
            const maxId = Math.max(...movies.map(el => el.id));
            const newMovie = {
                id: maxId + 1,
                title: newTitle,
                poster: imagePreviewUrl
            };
            const updateMovies = [...movies, newMovie];

            //clear inputs
            this.setState({
                movies: updateMovies,
                imagePreviewUrl: '',
                newTitle: ''
            });
        }


    };

    handlePlay(e) {
        e.preventDefault();
        if (this.state.playing) {
            this.audio.pause();
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


    //FILTERING LIST
    onFilterChange(event) {
        const value = event.currentTarget.value;
        this.setState({
            filter: value
        });
    };

    addToFav(el) {
        console.log(el)
        const newArr = [...this.state.favorites, el]
        this.setState((prevState) => ({
                favorites: newArr
            })
        )
        console.log(this.state.favorites)
    }

    favItemremover() {
        console.log('on remove item from fav lists')
    }


    handleTogglePanel() {
        this.setState((prevState) => ({
            showingPanel: !(prevState.showingPanel)
        }))
    }


    //TABLE RENDER
    renderMoviesList() {

        return this.state.movies.map((el, index) =>
            <div key={index} className='item'>
                <div className="item__header">
                    <FloatingActionButton
                        className="item__header--btn-delete"
                        mini={true}
                        style={styles.btnButton}
                        backgroundColor="rgb(0, 188, 212)"
                        onClick={this.onDeleteClick.bind(this, el.id)}>
                        <ActionAndroid />
                    </FloatingActionButton>
                    <span className='item__header--idBadge'>{el.id}</span>
                    <h2>{el.title}</h2>
                </div>
                <div className="item__body">
                    <div className="item__body--poster"><img src={el.poster}/>
                    </div>
                    <RatingButtonComponent movieId={el.id}/>
                </div>
                <div className="item__footer">
                    <Stars movieId={el.id} movieTitle={el.title}/>
                </div>
            </div>
        )
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
            <div>
                <span className="button"
                      onClick={this.handleTogglePanel.bind(this)}>
                    {this.state.showingPanel ? 'Show' : 'Hide'} panel
                </span>
                <div className={ this.state.showingPanel ? "panel vissible" : "panel hidden" }>
                    <div className="panel--wrapper">
                        <PlayButton onClick={this.handlePlay.bind(this)}
                                    playing={this.state.playing}/>
                        <audio id="audio"
                               src="src/audio/star-wars-theme.mp3"
                               ref={(audioTag) => {
                                   this.audio = audioTag}}/>

                        <SortButton
                            descendingSortBy={this.descendingSortBy.bind(this, 'id')}
                            ascendingSortBy={this.ascendingSortBy.bind(this, 'id')}/>

                        <AddMovieComponent
                            title={this.state.newTitle}
                            newTitleError={this.state.newTitleError}
                            onTitleChange={this.onTitleChange.bind(this)}
                            onFormSubmit={this.onFormSubmit.bind(this)}
                            onImageChange={this.onImageChange.bind(this)}/>
                        <div className="img-preview">
                            {imagePreview}
                        </div>
                        <SearchField filter={this.state.filter}
                                     onFilterChange={this.onFilterChange.bind(this)}/>
                    </div>
                </div>
                <div className="items-wrapper container">
                    {movies.map((el, index) => {
                        if (el.title.toLowerCase().includes(this.state.filter.toLowerCase())) {
                            return (
                                <div key={index} className='item'>
                                    <div className="item__header">
                                        <FloatingActionButton
                                            className="item__header--btn-delete"
                                            mini={true}
                                            backgroundColor="rgb(0, 188, 212)"
                                            onClick={this.onDeleteClick.bind(this, el.id)}>
                                            <ActionAndroid />
                                        </FloatingActionButton>


                                        <span className='item__header--idBadge'>{el.id}</span>
                                        <h2>{el.title}</h2>
                                    </div>
                                    <div className="item__body">
                                        <div className="item__body--poster">
                                            <img src={el.poster}/>
                                        </div>
                                        <RatingButtonComponent movieId={el.id}/>
                                    </div>

                                    <div className="item__footer">
                                        <Stars movieId={el.id}
                                               movieTitle={el.title}/>
                                        <br/>
                                        <span onClick={this.addToFav.bind(this, el)}
                                              className="text-white"> add to favorites +</span>
                                    </div>
                                </div>
                            )
                        }
                    })}
                </div>
                <FavoriteList favorites={this.state.favorites}
                              favItemremover = {this.favItemremover.bind(this)}/>
            </div>
        )
    }
}