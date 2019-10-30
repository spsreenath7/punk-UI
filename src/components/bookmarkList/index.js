import React, { Component } from 'react';
import BeerList from '../../components/beerList'
import * as api from '../../api';
import { connect } from "react-redux";

class Bookmarks extends Component {

    state = { bookmaredList: [{}] };

    async componentDidMount() {
        try {
            const baseURL = 'https://api.punkapi.com/v2/beers?ids=';
            let ids = '';

            this.props.bookmarkItems.forEach(element => {
                ids += element.toString() + '|'
            });
            const resp = await api.getAllBeers(baseURL + ids);

            this.setState({
                bookmaredList: resp
            });

        } catch (e) {
            console.log(e);
        }
    };

    handleDelete = async (id) => {
        let newIdList = this.props.bookmarkItems;
        newIdList = newIdList.filter((element) => element !== id);
        let ids = '';
        newIdList.forEach(element => {
            ids += element.toString() + '|'
        });

        try {
            const baseURL = 'https://api.punkapi.com/v2/beers?ids=';
            const resp = await api.getAllBeers(baseURL + ids);

            this.setState({
                bookmaredList: resp
            });

        } catch (e) {
            console.log(e);
        }

    }


    render() {

        const beers = this.state.bookmaredList;

        return (

            <div className="row">
                <div className="col-md-10" >
                    <BeerList beers={beers} deleteBookmark={this.handleDelete} />
                </div>
            </div>

        );
    }
}
const mapStateToProps = state => {
    return {
        bookmarkItems: state.bookmarks
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
)(Bookmarks);