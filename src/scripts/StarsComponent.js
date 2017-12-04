/**
 * Created by Wojtek on 2017-10-22.
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Popup from './PopupComponent';


export default class Stars extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rating: props.defaultValue,
            tmpRating: props.defaultValue,
            showPopup: false
        }
    }

    getRatingUrl(id) {
        return `https://movie-ranking.herokuapp.com/movies/${id}/ratings`;
    }

    //  hover effect
    setTmpRating(rating) {
        this.setState({tmpRating: rating});
    }

    togglePopup(movieTitle, rating) {
        console.log(this.props.movieTitle);
        this.setState({
            showPopup: !this.state.showPopup
        });
    }

    setRating(rating, movieId) {
        this.setState({
            tmpRating: rating,
            rating: rating
        });
        const newRatingObject = {
            movie_id: this.props.movieId,
            rating: this.state.rating
        };
        // console.log(newRatingObject);
        return fetch(this.getRatingUrl(movieId, rating), {
            method: 'post',
            dataType: 'json',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache'
            },
            body: JSON.stringify({
                rating
            })
        }).then((response) => {
            return response.json();
        })
            .then((result) => {
                console.log(result);
                this.setState({
                    showPopup: !this.state.showPopup
                });
            })
            .catch((error) => {
                console.log('Request failed', error);
            });
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
                <span className={i <= this.state.tmpRating ? 'rating-on' : null}
                      key={i}
                      onClick={!this.props.readonly && this.setRating.bind(this, i, this.props.movieId) }
                      onMouseOver={!this.props.readonly && this.setTmpRating.bind(this, i)}>
                    &#9734;
                </span>
            );
        }

        return (
            <div>
                <div className={classNames({
                    'rating': true,
                    'rating-readonly': this.props.readonly,
                })} onMouseOut={this.reset.bind(this)}>{stars}
                    {this.props.readonly || !this.props.id ? null : <input
                        type="hidden"
                        id={this.props.id}
                        value={this.state.rating}/>
                    }
                </div>

                <br/>
                {this.state.showPopup ?
                    <Popup textTitle={this.props.movieTitle} textRate={this.state.rating}
                           closePopup={this.togglePopup.bind(this)}/> : null}
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
    max: 5,
};