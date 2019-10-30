import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import * as api from '../../api';
import './beerDetail.css';


import { connect } from "react-redux";

class BeerDetail extends Component {

    state = { beer: {} };

    async componentDidMount() {
        try {
            const resp = await api.getAll(`https://api.punkapi.com/v2/beers/${this.props.match.params.id}`);
            console.log("Inside com did mont");

            const items = resp;
            const copy = resp[0];

            console.log("Inside com did mont no exception");
            this.setState({
                beer: copy
            });
            console.log("Inside com did mont no exception last");
            // }

        } catch (e) {
            console.log(e);
        }
    };

    render() {
        let display = <p>No beer details</p>;
        let beer = this.state.beer;
        let id = this.props.match.params.id;

        let bookmarked = this.props.bookmarks.includes(Number(id));
        let foodParing = '';
        if (beer.id) {
            foodParing = beer.food_pairing.map(
                (food, index) => <i>{food},&nbsp;</i>
            );
        }
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-10">
                        <div>
                            <div className="beer-images">
                                <img src={beer.image_url}
                                    alt={beer.name} className="beer" />
                            </div>
                            <h1>{beer.name}</h1>
                            <p>{beer.description}</p>
                            {bookmarked ?
                                <button type="button" class="btn btn-primary" onClick={() => this.props.unBookmark(Number(id))}>&#8594;bookmarked</button> :
                                <button type="button" class="btn btn-outline-primary" onClick={() => this.props.bookmark(Number(id))}>&#8594;Click here to bookmark</button>
                            }

                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-10">
                        <br />
                        <h4>Specifications:</h4>
                        <ul>
                            <li>First Brewed:<br />&nbsp; <i>{beer.first_brewed}</i></li>
                            <li>PH value:<br />&nbsp; <i>{beer.ph}</i></li>
                            <li>Attenuation level:<br />&nbsp; <i>{beer.attenuation_level}</i></li>

                            <li>Food Paring:<br />&nbsp; {foodParing}</li>
                            <li>Contributer:<br />&nbsp; <i>{beer.contributed_by}</i></li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        bookmarks: state.bookmarks
    };
};

const mapDispachToProps = dispatch => {
    return {
        bookmark: (id) => dispatch({ type: "BOOKMARK", value: id }),
        checkBookmarked: (id) => dispatch({ type: "CHECK", value: id }),
        unBookmark: (id) => dispatch({ type: "REMOVE", value: id })
    };
};

export default connect(
    mapStateToProps,
    mapDispachToProps
)(withRouter(BeerDetail));