import React, { Component } from 'react';
import {render} from 'react-dom';
const Redux = require('react-redux');
import { Switch, Route, Router, hashHistory } from 'react-router'
import styles from '../style/index.css';
import NavBar from '../global/navBar.jsx';
import MovieList from './movieList.jsx';
import LoginForm from '../authentification/loginForm.jsx';
import RegisterForm from '../authentification/registerForm.jsx';
import NotFound from '../global/notFound.jsx';
import Profil from '../user/profil.jsx';
import Footer from '../global/footer.jsx';
import Loader from '../global/loader.jsx';
import MovieDetail from '../movieDetail/movieDetail.jsx';
import Edit from '../user/edit.jsx';
import Discover from '../user/discover.jsx';
import User from '../user/user.jsx';
const api = require('../api/authentification');

class HomePage extends Component {
  constructor(props) {
    super(props);


    this.getUserFavoritesResponse = this.getUserFavoritesResponse.bind(this);
    this.GetSessionResponse = this.GetSessionResponse.bind(this);
  }

  getUserFavoritesResponse(err, favorites) {
    console.log('getUserFavoritesResponse');
    if (err) {
      this.props.router.push(err);
    } else {
      this.props.dispatch({
        type: 'INIT_FAVORITES',
        favorites: favorites
      });
      this.setState({
        movies : favorites
      });
    }
  }

  getUserFavorites(userID) {
    api.UserFavorites(userID, this.getUserFavoritesResponse);
  }

  initJSJoke() {
    let jokes = [];
    jokes.push("Javascript makes me want to flip the table and say 'F*** this s***', but i can never be sure what 'this' refers to");
    jokes.push("Only thing you can't install is brain, for everything else there's npm.");
    jokes.push("How do you comfort a JavaScript bug? You console it");
    jokes.push("When a JavaScript date has gone bad, “Don’t call me, I’ll callback you. I promise!”");
    jokes.push("Javascript is number 1.00000000000003");
    this.props.dispatch({
      type: 'SET_JS_JOKES',
      jokes: jokes
    });
  }

  GetSessionResponse(err, res) {
    console.log('GetSessionResponse');
    if (err) {
      this.props.dispatch({
        type: 'SET_USER_ID',
        username: err
      });
    } else {
      this.props.dispatch({
        type: 'SET_USER_ID',
        username: res.id
      });
      this.props.dispatch({
        type: 'SET_USER_OBJECT',
        user: res
      });
      this.getUserFavorites(res.id);
    }
  }

  componentWillMount() {
    this.initJSJoke();
    api.GetSession(this.GetSessionResponse)
  }

  render() {
    if (!this.props.username) {
      return (<Loader />);
    } else {
      return (
        <Router history={hashHistory}>
          <Route>
            <Route exact path='/' component={MovieList} />
            <Route component={LoginForm} router={this.props.router.router} path="/login" />
            <Route component={RegisterForm} router={this.props.router.router} path="/register" />
            <Route component={Profil} router={this.props.router.router} path="/profil" />
            <Route component={Edit} router={this.props.router.router} path="/edit" />
            <Route component={Discover} router={this.props.router.router} path="/discover" />
            <Route component={MovieDetail} router={this.props.router.router} path="/detail/:id" />
            <Route component={User} router={this.props.router.router} path="/user/:id" />
            <Route component={() => (<Profil username={this.props.username} />)} router={this.props.router.router} path="/profil" />
            <Route component={NotFound} />
          </Route>
        </Router>
      );
    }
  }
}

const mapStateToProps = (state, router) => {
  return {
    router: router,
    username: state.username,
    favorites : state.favorites
  }
};

export default Redux.connect(mapStateToProps)(HomePage);
