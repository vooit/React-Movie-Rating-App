/**
 * Created by Wojtek on 2017-10-24.
 */
import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

export default class Stars extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rating: props.defaultValue,
            tmpRating: props.defaultValue,
            movie_id: ''
        }
    }

    getRatingUrl(id) {
        return `https://movie-ranking.herokuapp.com/movies/${id}/ratings`;
    }

    // getRating() {
    //     return this.state.rating
    // }

    //  hover effect
    setTmpRating(rating) {
        this.setState({tmpRating: rating});
    }

    setRating(rating, movieId) {
        this.setState({
            tmpRating: rating,
            rating: rating
        });
        const myRating = this.state.rating;
        // console.log(myRating);
        const newRatingObject = {
            // movie_id: this.props.movieId,
            rating: this.state.rating
        };
        // console.log(newRatingObject);
        const dupa = this.state.rating;
        console.log(dupa);
        return fetch(this.getRatingUrl(movieId), {
            method: 'post',
            dataType: 'json',
            data: {
                rating
            },
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache'
            }
        })

    }

    reset() {
        this.setTmpRating(this.state.rating);
    }

    componentWillReceiveProps(nextProps) {
        this.setRating(nextProps.defaultValue);
    }

    render() {
        const stars = [];
        for (let i = 1; i <= this.props.max; i++) {
            stars.push(
                <span
                    className={i <= this.state.tmpRating ? 'rating-on' : null}
                    key={i}
                    onClick={!this.props.readonly && this.setRating.bind(this, i, this.props.movieId)}
                    onMouseOver={!this.props.readonly && this.setTmpRating.bind(this, i)}>
                    &#9734;
                </span>
            );
        }

        return (
            <div className={classNames({'rating': true, 'rating-readonly': this.props.readonly,})}
                 onMouseOut={this.reset.bind(this)}>{stars}
                {this.props.readonly || !this.props.id ? null : <input
                    type="hidden"
                    id={this.props.id}
                    value={this.state.rating}/>
                }
            </div>
        )
    }
}

Stars.propTypes = {
    defaultValue: PropTypes.number,
    readonly: PropTypes.bool,
    max: PropTypes.number,
};
Stars.defaultProps = {
    defaultValue: 0,
    //  stars number
    max: 5,
};
