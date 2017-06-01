import React, { Component } from 'react';
import { render } from 'react-dom';
const Redux = require('react-redux');

import styles from './style/index.css';
import NavBar from './navBar.jsx';
import MovieCell from './movieCell.jsx';
import Footer from './footer.jsx';
import SearchForm from './searchForm.jsx';

class MovieList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies : null
    };
  }

  componentWillMount() {
    let req = new XMLHttpRequest();
    req.withCredentials = true;
    let self = this;
    req.onreadystatechange = function() {
        if (req.readyState == XMLHttpRequest.DONE && req.status == 200) {
          self.setState({
            movies : JSON.parse(req.responseText),
            filteredMovies : JSON.parse(req.responseText)
          });
        }
      }
      req.open('GET', 'http://localhost:4242/api/films', true);
      req.send(null);
    }

    searchByName(name) {
      console.log(name);
      if (!name || name === '') {
        this.state.filteredMovies = this.state.movies;
      } else {
        let movies = this.state.movies;
        let tmp = [];
        for(let i = 0; i < movies.length; i++) {
          let movieName = movies[i].Title.toUpperCase();
          if (movieName.match(name.toUpperCase())) {
            tmp.push(movies[i]);
          }
        }
        this.setState({
          movies : this.state.movies,
          filteredMovies : tmp
        });
      }
    }

  render() {
    if (this.state.filteredMovies == null) {
      return (<div></div>);
    }
    else {
      let rows = [];
      this.state.filteredMovies.map((row, index) => {
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
                    <h1>Good movies database</h1>
                    </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <SearchForm movies={rows} onKeyUp={this.searchByName.bind(this)}/>
                </div>
              </div>
              {rows}
          </div>
        </div>
      );
    }
  }
}

export default MovieList;
