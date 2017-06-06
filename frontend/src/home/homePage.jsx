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

class HomePage extends Component {
  constructor(props) {
    super(props);
  }

  getUserFavorites(userID) {
    let req = new XMLHttpRequest();
    req.withCredentials = true;
    req.onreadystatechange = () => {
      if (req.status == 403) {
        console.log("Not Authorized");
        this.props.router.push('/login');
      }
      else {
        console.log("Authorized");
        if (req.status == 200 && req.readyState == XMLHttpRequest.DONE) {
          this.setState({
            movies : JSON.parse(req.responseText)
          });
          this.props.dispatch({
            type: 'INIT_FAVORITES',
            favorites: JSON.parse(req.responseText)
          });
        }
      }
    }
    req.open('GET', 'http://localhost:4242/api/favorites/'+userID, true);
    req.send(null);
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

  componentWillMount() {
    this.initJSJoke();
    let req = new XMLHttpRequest();
    req.withCredentials = true;
    req.onreadystatechange = () => {
      if (req.readyState == XMLHttpRequest.DONE && req.status == 200) {
        let user = JSON.parse(req.responseText);
        this.props.dispatch({
          type: 'SET_USER_ID',
          username: user.id
        });
        this.props.dispatch({
          type: 'SET_USER_OBJECT',
          user: user
        });
        this.props.dispatch({
          type: 'SHOW_STORE'
        });
        this.getUserFavorites(user.id);
      } else {
        if (req.readyState == XMLHttpRequest.DONE && req.status == 403) {
          this.props.dispatch({
            type: 'SET_USER_ID',
            username: -1
          });
          this.props.dispatch({
            type: 'SHOW_STORE'
          });
        }
      }
    }
    req.open('GET', 'http://localhost:4242/api/session', true);
    req.setRequestHeader("Content-Type", "application/json");
    req.send(null);
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
