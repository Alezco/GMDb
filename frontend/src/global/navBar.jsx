import React, { Component } from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router';
const Redux =require('react-redux');
import styles from '../style/index.css';
const api = require('../api/authentification.js');

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.LogOutResponse = this.LogOutResponse.bind(this);
  }

  deleteAllCookies() {
    let cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i];
      let eqPos = cookie.indexOf("=");
      let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
  }

  LogOutResponse(err, res) {
    if (err) {
      console.log(err);
    } else {
      this.props.dispatch({
        type: 'SET_USER_ID',
        username: res
      });
    }
  }

  handleClick() {
    this.deleteAllCookies();
    api.LogOut(this.LogOutResponse);
  }

  render() {
    if (this.props.username && this.props.username >= 0) {
      return(
        <div>
          <nav className="navbar navbar-fixed-top navbar-toggleable-md navbar-dark bg-primary blue" role="navigation">
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
                  <li className="nav-item"><Link className="blue" to="/discover">Discover</Link></li>
                  <li className="nav-item"><Link className="blue" to="/profil">My Movies</Link></li>
                  <li className="nav-item"><Link className="blue" to="/edit">My Profile</Link></li>
                </ul>
                <ul className="nav navbar-nav navbar-right">
                  <li className="nav-item"><Link className="blue" href="" onClick={() => this.handleClick()}>Log out<i className="fa fa-sign-out favPadding"></i></Link></li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      );
    } else {
      return (
        <div>
            <nav className="navbar navbar-fixed-top navbar-toggleable-md navbar-dark bg-primary blue" role="navigation">
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
                  <li className="nav-item"><Link className="blue" to="/discover">Discover</Link></li>
                </ul>
                <ul className="nav navbar-nav navbar-right">
                  <li className="nav-item"><Link className="blue" to="/login">Log In</Link></li>
                  <li className="nav-item"><Link className="blue" to="/register">Register</Link></li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      );
    }
  }
}

const mapStateToProps = (state, router)  => {
  return {
    username: state.username
  };
}

export default Redux.connect(mapStateToProps)(NavBar);
