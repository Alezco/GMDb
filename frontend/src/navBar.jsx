import React, { Component } from 'react';
import {render} from 'react-dom';
const Redux =require('react-redux');
import styles from './style/index.css';


class NavBar extends Component {

  constructor(props) {
    super(props);
  }


  render() {
    return(
    <div>
      <nav className="navbar navbar-fixed-top navbar-inverse" role="navigation">
      <div className="container-fluid">

        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a className="navbar-brand" href="#">GMDb</a>
        </div>

        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul className="nav navbar-nav">
            <li><a href="#">Home</a></li>
            <li><a href="#">Search</a></li>
            <li><a href="#">About</a></li>
          </ul>
        </div>
      </div>
    </nav>
    </div>

      );
  }
}

export default NavBar;
