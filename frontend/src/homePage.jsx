import React, { Component } from 'react';
import {render} from 'react-dom';
const Redux =require('react-redux');
import { Switch, Route, Router, browserHistory } from 'react-router'
import styles from './style/index.css';
import NavBar from './navBar.jsx';
import MovieList from './movieList.jsx';
import Authentification from './authentification.jsx';
import NotFound from './notFound.jsx';
import Profil from './profil.jsx';


class HomePage extends Component {

  constructor(props) {
    super(props);

  }

  render() {
    return(
                    <Router history={browserHistory}>
                        <Route>
                          <Route exact path='/' component={MovieList} />
                          <Route component={Authentification} router={this.props.router.router} path="/login" />
                          <Route component={Profil} router={this.props.router.router} path="/profil" />
                          <Route component={NotFound} />
                        </Route>
                    </Router>
      );
  }
}

const mapStateToProps = (store, router) => {
  return {
    router: router
  }
};

export default Redux.connect(mapStateToProps)(HomePage);
