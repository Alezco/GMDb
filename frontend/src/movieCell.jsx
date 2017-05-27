import React, { Component } from 'react';
import {render} from 'react-dom';
const Redux =require('react-redux');
import styles from './style/index.css';

class MovieCell extends Component {

  constructor(props) {
    super(props);
  }


  render() {
    const divStyle = {
      height : '600px',
    };
    if (this.props.movieObject == null) {
      return(<div></div>);
    } else {
    return(
    <div>
      <div className="col-sm-6 col-md-3" style={divStyle}>
        <img className="img-responsive thumbnail" src={this.props.movieObject.Poster} alt=""/>
        <div className="caption">
          <h4>{this.props.movieObject.Title}</h4>
          <p>{this.props.movieObject.Plot}</p>

        </div>
      </div>
    </div>
      );
  }
}
}

export default MovieCell;
