import React, { Component } from 'react';
import {render} from 'react-dom';
const Redux =require('react-redux');

import styles from './style/index.css';
import NavBar from './navBar.jsx';
import MovieRow from './movieRow.jsx';

class MovieList extends Component {

  constructor(props) {
    super(props);
<<<<<<< 728ec3dfdb15a6374092bd5d7500b428e84e00c2
    this.state = {
      movies : null
    };
=======

>>>>>>> Fix routing and authentification verification
  }

  componentWillMount()
  {
    let req = new XMLHttpRequest();
    req.withCredentials = true;
    let self = this;
    req.onreadystatechange = function() {
        if (req.readyState == XMLHttpRequest.DONE && req.status == 200) {
          self.setState({
            movies : JSON.parse(req.responseText)
          });
        }
      }
      req.open('GET', 'http://localhost:4242/api/films', true);
      req.send(null);
    }

  render() {
    if (this.state.movies == null)
    {
      return (<div></div>);
    }
    else {
      return(
      <div>
        <title>GMDb Homepage</title>
        <div className="container-fluid">
            <div className="row">
              <div className="col-sm-12">
                <div className="page-header">
                  <h1>Best movies of the day</h1>
                  <p>Posted by <span className="glyphicon glyphicon-user"></span> <a href="#">Matthijs Jansen</a> on <span className="glyphicon glyphicon-time"></span> 12 January 2015 10:00 am</p>
                </div>
              </div>
            </div>
            <MovieRow moviesInRow={this.state.movies} nbRow={1}/>
            <MovieRow moviesInRow={this.state.movies} nbRow={2}/>
            <MovieRow moviesInRow={this.state.movies} nbRow={3}/>
            <footer className="margin-tb-3">
              <div className="row">
                <div className="col-lg-12">
                  <p>EPITA MTI 2018 GREAT MOVIE DATABASE</p>
                </div>
              </div>
            </footer>
        </div>
      );
    }
  }
}

export default MovieList;
