/**
 * Created by Wojtek on 2017-10-26.
 */
import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import classNames from 'classnames';

export default class RatingButtonComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ratings: []
        };
    }

    getRatingUrl(id) {
        return `https://movie-ranking.herokuapp.com/movies/${id}/ratings`;
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
            })
            .catch(function (err) {
                console.log(err, 'rating not defined');
            })
    }

    renderAvarage() {
        let ratings = this.state.ratings;
        let avarageRating = ratings.reduce((prev, next) => {
            return prev + next.rating
        }, 0);
        let digitRating = (avarageRating / ratings.length).toFixed(0);
        //     className={i <= this.state.tmpRating ? 'rating-on' : null}
        if (isNaN(digitRating)) {
            return '';
        }

        return <span className={classNames({
            'red': false,
            'avarage--field': true,
            'green': true,
        })}>{digitRating} </span>
    }

    render() {
        const styles = {
            buttonRating: {
                cursor: 'pointer',
                color: 'white',
                fontWeight: '400',
                fontSize: '10px'
            }
        };
        return (
            <div className="item__body--avarage">
                <FlatButton
                    onClick={this.getMovieRating.bind(this, this.props.movieId)}
                    label="get rating"
                    backgroundColor="rgb(0, 188, 212)"
                    primary={true}
                    style={styles.buttonRating}
                />
               { this.renderAvarage() }
            </div>
        )
    }
}