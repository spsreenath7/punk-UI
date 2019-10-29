import React, { Component } from 'react';
import BeerList from './components/beerList';
import SelectControls from './components/selectControls';
// import _ from 'lodash';
import * as api from './api';

class App extends Component {

  state = { search: '', sort: 'name', beerList: [{}] };

  handleChange = async (type, value) => {
    try {
      const resp = await api.getAll('https://api.punkapi.com/v2/beers?page=1&per_page=' + value);

      const items = resp;
      const copy = [];
      console.log("Inside com did mont no exception");
      items.forEach(function (item) {
        copy.push({
          'age': 40,
          'id': item.id.toString(),
          'imageUrl': item.image_url,
          'name': item.name,
          'snippet': item.tagline
        });
      });
      this.setState({
        beerList: copy
      });

    } catch (e) {
      console.log(e);
    }
  };

  async componentDidMount() {
    try {
      const resp = await api.getAll('https://api.punkapi.com/v2/beers?page=1&per_page=10');
      console.log("Inside com did mont");

      const items = resp;
      const copy = [];
      items.forEach(function (item) {
        copy.push({
          'age': 40,
          'id': item.id.toString(),
          'imageUrl': item.image_url,
          'name': item.name,
          'snippet': item.tagline
        });
      });
      this.setState({
        beerList: copy
      });

    } catch (e) {
      console.log(e);
    }
  };

  render() {
    console.log(
      `Criteria: Search=  ${this.state.search} ; Sort= ${this.state.sort}`);
    const beers = this.state.beerList;

    return (

      <div className="row">
        <div className="col-md-10" >
          <SelectControls onUserInput={this.handleChange}
            filterText={this.state.search}
            sort={this.state.sort} />
          <BeerList beers={beers} />
        </div>
      </div>

    );
  }
}
export default App;