import React, { Component } from 'react';
import BeerList from './components/beerList';
import SelectControls from './components/selectControls';
// import _ from 'lodash';
import * as api from './api';

class App extends Component {

  state = { search: '', sort: 'name', beerList: [{}] };

  handleChange = async (type, value) => {
    try {
      const resp = await api.getAllBeers('https://api.punkapi.com/v2/beers?page=1&per_page=' + value);
      this.setState({
        beerList: resp
      });

    } catch (e) {
      console.log(e);
    }
  };

  async componentDidMount() {
    try {
      const resp = await api.getAllBeers('https://api.punkapi.com/v2/beers?page=1&per_page=10');
      this.setState({
        beerList: resp
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