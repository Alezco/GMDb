import React, { Component } from 'react';
import { render } from 'react-dom';
const Redux = require('react-redux');

import styles from '../style/index.css';
import NavBar from '../global/navBar.jsx';
import MovieCell from '../movieCell/movieCell.jsx';
import Footer from '../global/footer.jsx';
import SearchForm from './searchForm.jsx';

class MovieList extends Component {
  constructor(props) {
    super(props);

    this.searchByName = this.searchByName.bind(this);

    this.state = {
      movies : null,
      filteredMovies : null
    };
  }

  componentWillMount() {
    let req = new XMLHttpRequest();
    req.withCredentials = true;
    req.onreadystatechange = () => {
      if (req.readyState == XMLHttpRequest.DONE && req.status == 200) {
        this.setState({
          movies : JSON.parse(req.responseText),
          filteredMovies : JSON.parse(req.responseText)
        });
      }
    }
    req.open('GET', 'http://localhost:4242/api/films', true);
    req.send(null);
  }

  filterByTitle(elt) {
    return (elt.Title.toUpperCase().match(this.toUpperCase()));
  }

  filterByActor(elt) {
    return (elt.Actors.toUpperCase().match(this.toUpperCase()));
  }

  filterByDirector(elt) {
    return (elt.Director.toUpperCase().match(this.toUpperCase()));
  }

  searchByName(name, elt) {
    if (!name || name === '') {
      this.setState({
        movies : this.state.movies,
        filteredMovies : this.state.movies
      });
    } else {
      let movies = this.state.movies;
      let tmp = [];
      if (elt === "Title") {
        tmp = movies.filter(this.filterByTitle, name);
      }
      if (elt === "Actors") {
        tmp = movies.filter(this.filterByActor, name);
      }
      if (elt === "Director") {
        tmp = movies.filter(this.filterByDirector, name);
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
        rows.push(<MovieCell key={row.id} index={index} movieObject={row}/>)
      });
      return(
        <div>
          <NavBar />
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
                <SearchForm movies={rows} onKeyUp={this.searchByName}/>
              </div>
            </div>
            {rows}
          </div>
          <Footer />
        </div>
      );
    }
  }
}

export default MovieList;
