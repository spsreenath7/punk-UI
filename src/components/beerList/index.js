import React, { Component } from 'react';
import Beer from '../beer'
import './beerList.css'

export default class BeerList extends Component {
    render() {
      let displayedBeers =  this.props.beers.map( 
          (beer) => <Beer key={beer.id} beer={beer } deleteBookmark={this.props.deleteBookmark} />
       ) ; 
      return (
        <div className="col-md-10">
          <ul className="beers">
              {displayedBeers}
          </ul>
        </div>
      ) ;
  }
}