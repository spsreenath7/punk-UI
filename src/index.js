import * as serviceWorker from './serviceWorker';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Redirect, Switch, Link } from 'react-router-dom';
import App from './App';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import BeerDetail from './components/beerDetail';
import Bookmarks from './components/bookmarkList';
// import * as serviceWorker from './serviceWorker';

import reducer from './store/reducer';

import { Provider } from 'react-redux';
import { createStore } from 'redux';

const store = createStore(reducer);

export class Router extends Component {    //}= (props) => 
    render() {
        return (
            <BrowserRouter>
                <div className="jumbotron">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-10" >
                                <h1>Beer Catalogue App</h1>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-10" >
                                <div id="navbar" >
                                    <ul class="nav navbar-nav">
                                        <li><Link to='/'> Home</Link></li>
                                        <li><Link to='/bookmarks'> Bookmarks</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Switch>
                        <Route path='/beers/:id' component={BeerDetail} />
                        <Route path='/bookmarks' component={Bookmarks} />
                        <Route exact path='/' component={App} />
                        <Redirect from='*' to='/' />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
} 

ReactDOM.render(<Provider store={store}><Router /></Provider>, document.getElementById('root'));
// serviceWorker.unregister();
