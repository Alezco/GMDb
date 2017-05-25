import React, { Component } from 'react';
import {render} from 'react-dom';
import { Link } from 'react-router-dom';
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
          <Link className="navbar-brand" to="/">GMDb</Link>
        </div>

        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul className="nav navbar-nav">
            <li><Link to="/home" >Home</Link></li>
            <li><Link to="/profile">Search</Link></li>
          </ul>
          <ul className="nav navbar-nav navbar-right">
              <li><Link to="/login">Log In</Link></li>
              <li><Link to="/register">Register</Link></li>
          </ul>
        </div>
      </div>
    </nav>
    </div>

      );
  }
}

export default NavBar;
