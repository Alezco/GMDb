import React, { Component } from 'react';
import {render} from 'react-dom';
const Redux = require('react-redux');
import { Switch, Route, Router, hashHistory } from 'react-router'
import styles from '../style/index.css';
import NavBar from '../global/navBar.jsx';
import MovieList from './movieList.jsx';
import Authentification from '../authentification/authentification.jsx';
import NotFound from '../global/notFound.jsx';
import Profil from '../user/profil.jsx';
import Search from './search.jsx';
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

  componentWillReceiveProps(Newprops) {
    console.log("update home");
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

  componentWillMount() {
    let req = new XMLHttpRequest();
    req.withCredentials = true;
    req.onreadystatechange = () => {
        if (req.readyState == XMLHttpRequest.DONE && req.status == 200) {
          console.log(req.responseText);
          let user = JSON.parse(req.responseText);
          console.log(user.id);
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
        console.log("User is authenticated session is active");
        } else {
          if (req.readyState == XMLHttpRequest.DONE && req.status == 403) {
            console.log("User not authenticated session is not active");
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
    console.log("UPDATED HOME PAGE");
    if (!this.props.username) {
        return (<Loader />);
    } else {
        return (
            <Router history={hashHistory}>
                <Route>
                    <Route exact path='/' component={MovieList} />
                    <Route component={Authentification} router={this.props.router.router} path="/login" />
                    <Route component={Profil} router={this.props.router.router} path="/profil" />
                    <Route component={Search} router={this.props.router.router} path="/search" />
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
