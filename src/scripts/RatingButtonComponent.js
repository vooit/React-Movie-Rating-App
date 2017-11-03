/**
 * Created by Wojtek on 2017-10-29.
 */
import React from 'react';
import PropTypes from 'prop-types';
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
        let avarageRating = ratings.reduce((prev, next)=> {
            console.log(prev);   //   wyswietla kolejne zliczone sumy po iteracji
             return prev +  next.rating
        }, 0);
        // console.log(avarageRating/ratings.length)
        let digitRating = (avarageRating/ratings.length).toFixed(0);
        return <p className={classNames({
            'red': false,
            'green': true,
        })}>{digitRating}</p>
    }


    render() {
        const styles = {
            redText: {
                color: 'rgb(255, 64, 129)'
            }
        };
        return (
            <div className="newField">
                <FlatButton
                onClick={this.getMovieRating.bind(this, this.props.movieId)}
                label="get rating"
                backgroundColor="rgb(0, 188, 212)"
                hoverColor="rgb(33, 150, 243)"
                labelPosition="before"
                primary={true}
                style={styles.redText}
            />
                <span>{ this.renderAvarage() }</span>
            </div>
        )
    }


}