import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import './beer.css';
import { Link } from 'react-router-dom';

import { connect } from "react-redux";

class Beer extends Component {
  render() {

    const { id, imageUrl, name, snippet } = this.props.beer
    
    const path = `/beers/${id}`
    const bookmarked = this.props.bookmarks.includes(Number(id));
    
    const currentPath = this.props.location.pathname;

    return (
      <li className="thumbnail beer_item">
        <Link to={path} className="thumb">
          <div class="square"> <img src={imageUrl} alt={name} /> </div>
        </Link>
        <Link to={path}> {name}</Link>
        <p>{snippet}</p>
        {currentPath === '/bookmarks' ?
          <button type="button" className="btn btn-alert"
            onClick={() => {
              this.props.unBookmark(Number(id));
              this.props.deleteBookmark(Number(id));
            }
            }>Delete
          </button> :
          <div>
            {bookmarked ?
              <button type="button" className="btn btn-primary" onClick={() => this.props.unBookmark(Number(id))}>bookmarked</button> :
              <button type="button" className="btn btn-outline-primary" onClick={() => this.props.bookmark(Number(id))}>Bookmark</button>
            }
          </div>
        }
      </li>
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
)(withRouter(Beer));