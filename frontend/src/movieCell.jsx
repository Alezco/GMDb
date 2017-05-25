import React, { Component } from 'react';
import {render} from 'react-dom';
const Redux =require('react-redux');
import styles from './style/index.css';

class MovieCell extends Component {

  constructor(props) {
    super(props);
  }


  render() {
    return(
    <div>
      <div className="col-sm-6 col-md-3">
        <img className="img-responsive thumbnail" src="http://placehold.it/700x350" alt=""/>
        <div className="caption">
          <h4><a href="#">Image title</a></h4>
          <p>Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.</p>
        </div>
      </div>
    </div>

      );
  }
}

export default MovieCell;
