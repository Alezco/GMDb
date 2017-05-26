import React, { Component } from 'react';
import {render} from 'react-dom';
const Redux =require('react-redux');
import styles from './style/index.css';
import NavBar from './navBar.jsx';
import MovieRow from './movieRow.jsx';
import MovieList from './movieList.jsx';
import Authentification from './authentification.jsx';
import NotFound from './notFound.jsx';

class Profil extends Component {

  constructor(props) {
    super(props);
  }

  getBestMovies()
  {
    let req = new XMLHttpRequest();
    req.withCredentials = true;
    let self = this;
    req.onreadystatechange = function() {
      console.log('call back');
        if (req.status == 403) {
            console.log("Not AUthorized");
            self.props.router.push('/login');
        }
        else {
          console.log("All good your are authorized");
        }
      }
      req.open('GET', 'http://localhost:4242/api/favorites/'+1, true);
      req.send(null);
    }

  render() {
    {this.getBestMovies()}
    return(
    <div>
      <NavBar />
      My Good movie List

    </div>
      );
  }
}
const mapStateToProps = (state)  => {
  return {
    state : state
  };
}

export default Redux.connect(
  mapStateToProps
)(Profil);
