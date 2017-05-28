import React, { Component } from 'react';
import {render} from 'react-dom';
const Redux =require('react-redux');

import styles from './style/index.css';
import NavBar from './navBar.jsx';
import MovieCell from './movieCell.jsx';

class MovieList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      movies : null
    };
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
      console.log(this.state.movies);
      let rows = [];
      let count = 0;
      this.state.movies.map((row, index) => {
          rows.push(<MovieCell key={index} index={index} movieObject={row}/>)
      });
      return(
      <div>
        <NavBar />
        <title>GMDb Homepage</title>
        <div className="container-fluid">
            <div className="row">
              <div className="col-sm-12">
                <div className="page-header">
                  <h1>Best movies of all time</h1>
                  </div>
              </div>
            </div>
            {rows}
            <footer className="margin-tb-3">
              <div className="row">
                <div className="col-lg-12">
                  <p>EPITA MTI 2018 GREAT MOVIE DATABASE</p>
                </div>
              </div>
            </footer>
        </div>
      </div>
      );
    }
  }
}

export default MovieList;
