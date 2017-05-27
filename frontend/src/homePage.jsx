import React, { Component } from 'react';
import {render} from 'react-dom';
const Redux =require('react-redux');
import { Switch, Route, Router, hashHistory } from 'react-router'
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
    console.log('store in homePage')
    console.log(this.props.username)
    return(
                    <Router history={hashHistory}>
                        <Route>
                          <Route exact path='/' component={MovieList} />
                          <Route component={Authentification} router={this.props.router.router} path="/login" />
                          <Route component={Profil} router={this.props.router.router} username={this.props.username} path="/profil" />
                          <Route component={NotFound} />
                        </Route>
                    </Router>
      );
  }
}

const mapStateToProps = (state, router) => {
  return {
    router: router,
    username: state.username
  }
};

export default Redux.connect(mapStateToProps)(HomePage);
