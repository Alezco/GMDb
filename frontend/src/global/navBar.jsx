import React, { Component } from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router';
const Redux =require('react-redux');
import styles from '../style/index.css';

class NavBar extends Component {
  constructor(props) {
    super(props);
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

  handleClick() {
    this.deleteAllCookies();
    let req = new XMLHttpRequest();
    req.withCredentials = true;
    req.onreadystatechange = () => {
      if (req.readyState == XMLHttpRequest.DONE && req.status == 200) {
        this.props.dispatch({
          type: 'SET_USER_ID',
          username: -1
        });
        this.props.dispatch({
          type: 'SHOW_STORE'
        });
      }
    }
    req.open('POST', 'http://localhost:4242/api/logOut', true);
    req.send(null);
  }

  render() {
    if (this.props.username && this.props.username >= 0) {
      return(
        <div>
          <nav className="navbar navbar-fixed-top navbar-toggleable-md navbar-dark bg-primary" role="navigation">
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
                  <li className="nav-item"><Link className="nav-link" to="/discover">Discover</Link></li>
                  <li className="nav-item"><Link to="/profil">My Movies</Link></li>
                  <li className="nav-item"><Link to="/edit">My Profile</Link></li>
                </ul>
                <ul className="nav navbar-nav navbar-right">
                  <li className="nav-item"><Link href="" onClick={() => this.handleClick()}>Log out</Link></li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      );
    } else {
      return (
        <div>
            <nav className="navbar navbar-fixed-top navbar-toggleable-md navbar-dark bg-primary" role="navigation">
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
                  <li className="nav-item"><Link to="/discover">Discover</Link></li>
                </ul>
                <ul className="nav navbar-nav navbar-right">
                  <li className="nav-item"><Link to="/login">Log In</Link></li>
                  <li className="nav-item"><Link to="/register">Register</Link></li>
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
