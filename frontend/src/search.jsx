import React, { Component } from 'react';
import {render} from 'react-dom';
const Redux =require('react-redux');

import styles from './style/index.css';
import NavBar from './navBar.jsx';
import MovieCell from './movieCell.jsx';
import SearchForm from './searchForm.jsx';

class Search extends Component {
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
          movies : JSON.parse(req.responseText)
        });
      }
    }
    req.open('GET', 'http://localhost:4242/api/films', true);
    req.send(null);
  }

  searchByName(name) {
    let movies = this.state.movies;
    let movieName = "";
    let resultIndex = [];
    for(let i = 0; i < movies.length; i++) {
      movieName = movies[i].Title.toUpperCase();
      if (movieName.match(name.toUpperCase())) {
        resultIndex.push(i);
        console.log("----");
        console.log(i);
      }
    }
  }

  render() {
    if (this.state.movies == null) {
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
                    <h1>Search your movie</h1>
                    </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <SearchForm movies={rows} onKeyUp={this.searchByName.bind(this)}/>
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

export default Search;
