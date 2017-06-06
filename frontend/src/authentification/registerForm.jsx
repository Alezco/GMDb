import React, { Component } from 'react';
import { render } from 'react-dom';
const Redux = require('react-redux');
const Router = require('react-router');
import styles from '../style/index.css';
import MyNavItem from './myNavItem.jsx';
import NavBar from '../global/navBar.jsx';
import Footer from '../global/footer.jsx';

const SET_USER_ID = 'SET_USER_ID';

class RegisterForm extends Component {
  constructor(props) {
    super(props);
  }

  checkSignUp() {
    let login = document.getElementById("login").value;
    let password = document.getElementById("password").value;
    let rePassword = document.getElementById("rePassword").value;
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

  render() {
    return(
      <div>
        <NavBar />
        <div className="container">
          <div className="col-md-6 col-md-offset-3">
            <div className="well well-sm customCard">
              <div className="card-block">
                <div className="text-center">
                  <h3>Register</h3>
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
                <div className="md-form">
                  <i className="fa fa-lock prefix"></i>
                  <input type="password" id="form4" className="form-control" placeholder="Repeat password" required/>
                </div>
                <div className="text-center">
                  <button className="btn btn-primary" id="submitBtn" type="submit" onClick={this.checkSignUp.bind(this)}>Login</button>
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

      export default Redux.connect(mapStateToProps)(RegisterForm);
