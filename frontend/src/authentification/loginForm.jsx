import React, { Component } from 'react';
import { render } from 'react-dom';
const Redux = require('react-redux');
const Router = require('react-router');
import styles from '../style/index.css';
import MyNavItem from './myNavItem.jsx';
import NavBar from '../global/navBar.jsx';
import Footer from '../global/footer.jsx';

const SET_USER_ID = 'SET_USER_ID';

class LoginForm extends Component {
  constructor(props) {
    super(props);
  }

  getUserFavorites(userID) {
    let req = new XMLHttpRequest();
    req.withCredentials = true;
    req.onreadystatechange = () => {
      if (req.status == 403) {
        console.log("Not Authorized");
        this.props.router.push('/login');
      }
      else {
        console.log("Authorized");
        if (req.status == 200 && req.readyState == XMLHttpRequest.DONE) {
          this.props.dispatch({
            type: 'INIT_FAVORITES',
            favorites: JSON.parse(req.responseText)
          });
        }
        this.props.router.push('/profil');
      }
    }
    req.open('GET', 'http://localhost:4242/api/favorites/'+userID, true);
    req.send(null);
  }

  checkSignIn() {
    let login = document.getElementById("login").value;
    let password = document.getElementById("password").value;
    let req = new XMLHttpRequest();
    req.withCredentials = true;
    req.onreadystatechange = () => {
      if (req.readyState == XMLHttpRequest.DONE && req.status == 200) {
        let user = JSON.parse(req.responseText);
        console.log("logIn");
        this.props.dispatch({
          type: SET_USER_ID,
          username: user.id
        });
        this.props.dispatch({
          type: 'SET_USER_OBJECT',
          user: user
        });
        this.props.dispatch({
          type: 'SHOW_STORE'
        });
        this.getUserFavorites(user.id);
      }
    }
    req.open('POST', 'http://localhost:4242/api/logIn', true);
    req.setRequestHeader("Content-Type", "application/json");
    let jsonToSend = JSON.stringify({"login": login, "pwd": password});
    req.send(jsonToSend);
  }

  render() {
    return(
      <div>
        <NavBar />
          <div className="container">
            <div className="col-md-6 col-md-offset-3">
              <div className="well well-sm customCard">
                <div className="card-block">
                  <div className="text-center">
                    <h3>Login</h3>
                    <hr className="mt-2 mb-2"/>
                  </div>
                  <div className="md-form">
                    <i className="fa fa-user prefix"></i>
                    <input type="text" id="form2" className="form-control" placeholder="Login" required/>
                  </div>
                  <div className="md-form">
                    <i className="fa fa-lock prefix"></i>
                    <input type="password" id="form4" className="form-control" placeholder="Password" required/>
                  </div>
                  <div className="text-center">
                    <button className="btn btn-primary" id="submitBtn" type="submit" onClick={this.checkSignIn.bind(this)}>Login</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        <Footer />
      </div>
          );
        }
      }

      const mapStateToProps = (state)  => {
        return {
          state : state
        };
      }

      export default Redux.connect(mapStateToProps)(LoginForm);
