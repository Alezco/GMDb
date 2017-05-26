import React, { Component } from 'react';
import {render} from 'react-dom';
const Redux =require('react-redux');
import { Switch, Route } from 'react-router-dom'
import styles from './style/index.css';
import NavBar from './navBar.jsx';
import MovieRow from './movieRow.jsx';
import MovieList from './movieList.jsx';
import Authentification from './authentification.jsx';
import NotFound from './notFound.jsx';

class HomePage extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return(
    <div>MovieList
          <NavBar/>
          <Switch>
            <Route exact component={MovieList} path="/" />
            <Route component={Authentification} path="/login" />
            <Route component={Authentification} path="/register" />
            <Route component={NotFound} />
          </Switch>
    </div>
      );
  }
}

export default HomePage;
