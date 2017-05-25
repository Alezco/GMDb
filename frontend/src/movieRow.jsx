import React, { Component } from 'react';
import {render} from 'react-dom';
const Redux =require('react-redux');
import styles from './style/index.css';

import MovieCell from './movieCell.jsx';

class MovieRow extends Component {

  constructor(props) {
    super(props);
  }


  render() {
    return(
    <div>
      <div className="row margin-b-2">
        <MovieCell/>
        <MovieCell/>
        <MovieCell/>
        <MovieCell/>
      </div>
    </div>

      );
  }
}

export default MovieRow;
