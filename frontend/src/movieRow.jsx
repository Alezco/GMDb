import React, { Component } from 'react';
import {render} from 'react-dom';
const Redux =require('react-redux');
import styles from './style/index.css';

import MovieCell from './movieCell.jsx';

class MovieRow extends Component {

  constructor(props) {
    super(props);
    this.state = {
      moviesByRow: []
    }
  }

  componentWillMount()
  {
    console.log("Enter in movieRow.jsx");
    let nbRow = this.props.nbRow;
    let movies = this.props.moviesInRow;
    switch (nbRow) {
      case 1:
        this.setState({moviesInRow : movies.slice(0,4)});
        break;
      case 2:
        this.setState({moviesInRow : movies.slice(4,8)});
        break;
      case 3:
        this.setState({moviesInRow : movies.slice(8,12)});
        break;
      default:
    }
  }


  render() {
    if (this.state.moviesInRow != null)
    {
      return(
      <div>
        <div className="row margin-b-2">
          <MovieCell movie={this.state.moviesInRow[0]}/>
          <MovieCell movie={this.state.moviesInRow[1]}/>
          <MovieCell movie={this.state.moviesInRow[2]}/>
          <MovieCell movie={this.state.moviesInRow[3]}/>
        </div>
      </div>
      );
    }
    else {
      return(<div></div>);
    }
  }
}

export default MovieRow;
