import React, { Component } from 'react';
import { render } from 'react-dom';
const Redux = require('react-redux');
const Router = require('react-router');
import styles from './style/index.css';
import MyNavItem from './myNavItem.jsx';
import NavBar from './navBar.jsx';

const SET_USER_ID = 'SET_USER_ID';

class Authentification extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeIndex: 0,
      loginOk : false
    };
  }

  checkSign() {
    if (this.state.activeIndex === 0) {
      this.checkSignUp();
    }
    else {
      this.checkSignIn();
    }
  }

  getUserFavorites(userID) {
      let req = new XMLHttpRequest();
      req.withCredentials = true;
      let self = this;
      req.onreadystatechange = function() {
          if (req.status == 403) {
            console.log("Not Authorized");
            self.props.router.push('/login');
          }
          else {
                console.log("Authorized");
                if (req.status == 200 && req.readyState == XMLHttpRequest.DONE) {
                  self.props.dispatch({
                     type: 'INIT_FAVORITES',
                     favorites: JSON.parse(req.responseText)
                 });
              }
              self.props.router.push('/profil');
         }
      }
      req.open('GET', 'http://localhost:4242/api/favorites/'+userID, true);
      req.send(null);
  }

  checkSignIn() {
    let login = document.getElementById("login").value;
    let password = document.getElementById("password").value;
    console.log(login);
    console.log(password);
    let self = this;
    let req = new XMLHttpRequest();
    req.withCredentials = true;
    req.onreadystatechange = function() {
        if (req.readyState == XMLHttpRequest.DONE && req.status == 200) {
          let user = JSON.parse(req.responseText);
          console.log("logIn");
          console.log(user);
          self.props.dispatch({
             type: SET_USER_ID,
             username: user.id
         });
         self.props.dispatch({
            type: 'SET_USER_OBJECT',
            user: user
        });
         self.props.dispatch({
            type: 'SHOW_STORE'
        });
        self.getUserFavorites(user.id);
        }
    }
    req.open('POST', 'http://localhost:4242/api/logIn', true);
      req.setRequestHeader("Content-Type", "application/json");
      let jsonToSend = JSON.stringify({"login": login, "pwd": password});
      req.send(jsonToSend);
  }

  checkSignUp() {
    let login = document.getElementById("login").value;
    let password = document.getElementById("password").value;
    let rePassword = document.getElementById("rePassword").value;
    console.log(login);
    console.log(password);
    console.log(rePassword);
    if (password == rePassword) {
      let req = new XMLHttpRequest();
      req.withCredentials = true;
      req.open('POST', 'http://localhost:4242/api/signIn', true);
      req.setRequestHeader("Content-Type", "application/json");
      let jsonToSend = JSON.stringify({"login": login, "pwd": password});
      req.send(jsonToSend);
    }
    else {
      let errorLabel = document.createElement("label");
      errorLabel.innerHTML = "Password not matching!";
      document.getElementById("root").appendChild(errorLabel);
    }
  }

  handleClick(index) {
    let title = document.getElementById('title');
    let rePassDiv = document.getElementById('rePassDiv');
    let submitBtn = document.getElementById('submitBtn');

    if (this.state.activeIndex === 0) {
      title.innerHTML = "Enter Your Login Now";
      rePassDiv.style.visibility = "hidden";
    }
    else {
      title.innerHTML = "Sign Up For Free";
      rePassDiv.style.visibility = "visible";
    }
    this.setState({activeIndex: index});
  }

  render() {
    return(
      <div>
        <NavBar />
        <div className="form">
            <ul className="tab-group">
              <MyNavItem content="Sign up" index={0} isActive={this.state.activeIndex===0} onClick={this.handleClick.bind(this)}/>
              <MyNavItem content="Log In" index={1} isActive={this.state.activeIndex===1} onClick={this.handleClick.bind(this)}/>
            </ul>
            <div className="tab-content">
              <div id="signup">
                <h1 id="title">Sign Up</h1>
                <div className="field-wrap">
                  <input type="text"required placeholder="Login *" id="login"/>
                </div>
                <div className="field-wrap">
                  <input type="password"required placeholder="Password *" id="password"/>
                </div>
                <div className="field-wrap" id="rePassDiv">
                  <input type="password"required placeholder="Repeat Password *" id="rePassword"/>
                </div>
                <button id="submitBtn" type="submit" className="button button-block" onClick={this.checkSign.bind(this)}>Get Started</button>
            </div>
            <div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state)  => {
  return {
    state : state
  };
}

export default Redux.connect(mapStateToProps)(Authentification);
