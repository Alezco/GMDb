import React, { Component } from 'react';
import {render} from 'react-dom';
const Redux =require('react-redux');
import styles from './style/index.css';

class MovieCell extends Component {

  constructor(props) {
    super(props);
  }


//Title Genre Plot
  render() {
    if (this.props.movie != null)
      console.log(this.props.movie.Poster);
    return(
    <div>
      <div className="col-sm-6 col-md-3">
        <img className="img-responsive thumbnail" src={this.props.movie.Poster} alt=""/>
        <div className="caption">
          <h4>{this.props.movie.Title}</h4>
          <p>{this.props.movie.Plot}</p>
        </div>
      </div>
    </div>

      );
  }
}

export default MovieCell;
